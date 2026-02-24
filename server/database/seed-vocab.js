import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/deutsch-app.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  console.error("Database directory doesn't exist. Please run the app normally first to initialize.");
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL');

console.log('🗑️  Dropping old vocabulary table...');
db.exec('DROP TABLE IF EXISTS vocabulary');

console.log('🏗️  Recreating vocabulary table with detailed dictionary fields...');
db.exec(`
  CREATE TABLE vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    german TEXT NOT NULL,
    phonetic TEXT,
    english TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT,
    example_sentence TEXT,
    part_of_speech TEXT,
    gender TEXT,
    plural TEXT,
    conjugation TEXT,
    synonyms TEXT,
    antonyms TEXT,
    related_words TEXT,
    grammar_notes TEXT,
    audio_path TEXT,
    image_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const insert = db.prepare(`
  INSERT INTO vocabulary (
    german, phonetic, english, level, category, example_sentence,
    part_of_speech, gender, plural, conjugation,
    synonyms, antonyms, related_words, grammar_notes
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// The Massively Categorized Dictionary (A1 - C1)
const vocab = [
  // ================= A1 LEVEL =================
  ['Mutter', '[ˈmʊtɐ]', 'Mother', 'A1', 'Family', 'Meine Mutter heißt Maria.', 'Noun', 'die', 'Mütter', null, 'Mama', 'Vater', 'Eltern, Kind', 'Feminine noun ending in -er, taking an umlaut in plural.'],
  ['Vater', '[ˈfaːtɐ]', 'Father', 'A1', 'Family', 'Mein Vater arbeitet viel.', 'Noun', 'der', 'Väter', null, 'Papa', 'Mutter', 'Eltern, Kind', 'Masculine noun taking an umlaut in plural.'],
  ['Eltern', '[ˈɛltɐn]', 'Parents', 'A1', 'Family', 'Meine Eltern leben in Berlin.', 'Noun', 'die (pl)', 'Eltern', null, null, 'Kind', 'Mutter, Vater', 'Usually only used in the plural.'],
  ['Schwester', '[ˈʃvɛstɐ]', 'Sister', 'A1', 'Family', 'Ich habe eine Schwester.', 'Noun', 'die', 'Schwestern', null, null, 'Bruder', 'Geschwister', 'Feminine noun taking -n in plural.'],
  ['Bruder', '[ˈbʁuːdɐ]', 'Brother', 'A1', 'Family', 'Mein Bruder ist älter als ich.', 'Noun', 'der', 'Brüder', null, null, 'Schwester', 'Geschwister', 'Masculine noun taking an umlaut in plural.'],
  ['Oma', '[ˈoːma]', 'Grandma', 'A1', 'Family', 'Meine Oma backt einen Kuchen.', 'Noun', 'die', 'Omas', null, 'Großmutter', 'Opa', 'Großeltern', 'Informal.'],
  ['Opa', '[ˈoːpa]', 'Grandpa', 'A1', 'Family', 'Mein Opa liest die Zeitung.', 'Noun', 'der', 'Opas', null, 'Großvater', 'Oma', 'Großeltern', 'Informal.'],
  ['Kind', '[kɪnt]', 'Child', 'A1', 'Family', 'Das Kind spielt im Garten.', 'Noun', 'das', 'Kinder', null, null, 'Erwachsene(r)', 'Eltern, Baby', 'Neuter noun taking -er in plural.'],
  ['Apfel', '[ˈapfəl]', 'Apple', 'A1', 'Kitchen', 'Der Apfel ist rot und süß.', 'Noun', 'der', 'Äpfel', null, null, null, 'Obst, Birne', 'Masculine noun taking an umlaut in plural.'],
  ['Brot', '[bʁoːt]', 'Bread', 'A1', 'Kitchen', 'Ich esse Brot zum Frühstück.', 'Noun', 'das', 'Brote', null, null, null, 'Brötchen, Bäcker', 'Neuter noun taking -e in plural.'],
  ['Milch', '[mɪlç]', 'Milk', 'A1', 'Kitchen', 'Ich trinke jeden Morgen Milch.', 'Noun', 'die', null, null, null, null, 'Getränk, Kuh', 'Uncountable.'],
  ['Wasser', '[ˈvasɐ]', 'Water', 'A1', 'Kitchen', 'Ich trinke viel Wasser.', 'Noun', 'das', 'Wässer', null, null, null, 'Getränk, trinken', 'Usually uncountable.'],
  ['Kaffee', '[ˈkafe]', 'Coffee', 'A1', 'Kitchen', 'Morgens trinke ich Kaffee.', 'Noun', 'der', 'Kaffees', null, null, 'Tee', 'Getränk', 'Masculine noun.'],
  ['Tisch', '[tɪʃ]', 'Table', 'A1', 'Kitchen', 'Der Teller steht auf dem Tisch.', 'Noun', 'der', 'Tische', null, null, null, 'Stuhl, Möbel', 'Masculine noun.'],
  ['Löffel', '[ˈlœfl̩]', 'Spoon', 'A1', 'Kitchen', 'Die Suppe isst man mit einem Löffel.', 'Noun', 'der', 'Löffel', null, null, 'Gabel, Messer', 'Besteck', 'Masculine noun.'],
  ['Hund', '[hʊnt]', 'Dog', 'A1', 'Animals', 'Der Hund bellt laut.', 'Noun', 'der', 'Hunde', null, null, 'Katze', 'Haustier', 'Masculine.'],
  ['Katze', '[ˈkatsə]', 'Cat', 'A1', 'Animals', 'Die Katze schläft auf dem Sofa.', 'Noun', 'die', 'Katzen', null, null, 'Hund', 'Haustier', 'Feminine.'],
  ['Haus', '[haʊ̯s]', 'House', 'A1', 'Places', 'Wir wohnen in einem großen Haus.', 'Noun', 'das', 'Häuser', null, 'Gebäude', null, 'wohnen', 'Neuter noun.'],
  ['Hallo', '[ˈhalo]', 'Hello', 'A1', 'Greetings', 'Hallo, wie geht es dir?', 'Interjection', null, null, null, 'Guten Tag', 'Tschüss', 'begrüßen', 'Universal greeting.'],
  ['Danke', '[ˈdaŋkə]', 'Thank you', 'A1', 'Expressions', 'Danke für deine Hilfe.', 'Interjection', null, null, null, 'Vielen Dank', 'Bitte', 'danken', 'Expression of gratitude.'],
  ['Bitte', '[ˈbɪtə]', 'Please / Welcome', 'A1', 'Expressions', 'Ein Bier, bitte.', 'Interjection', null, null, null, 'Gern geschehen', 'Danke', 'bitten', 'Multi-purpose word.'],
  ['machen', '[ˈmaxn̩]', 'to make', 'A1', 'Basics', 'Was machst du heute?', 'Verb', null, null, 'er macht, machte, hat gemacht', 'tun', null, 'Macher', 'Regular verb.'],
  ['gehen', '[ˈɡeːən]', 'to go', 'A1', 'Basics', 'Ich gehe nach Hause.', 'Verb', null, null, 'er geht, ging, ist gegangen', 'laufen', 'kommen', 'Gehweg', 'Strong irregular verb.'],
  ['essen', '[ˈɛsn̩]', 'to eat', 'A1', 'Basics', 'Wir essen Pizza.', 'Verb', null, null, 'er isst, aß, hat gegessen', 'speisen', 'trinken', 'Lebensmittel', 'Strong irregular verb.'],
  ['trinken', '[ˈtʁɪŋkn̩]', 'to drink', 'A1', 'Basics', 'Trinkst du Tee?', 'Verb', null, null, 'er trinkt, trank, hat getrunken', null, 'essen', 'Getränk', 'Strong irregular verb.'],
  ['kommen', '[ˈkɔmən]', 'to come', 'A1', 'Basics', 'Kommst du aus Deutschland?', 'Verb', null, null, 'er kommt, kam, ist gekommen', 'erscheinen', 'gehen', 'Ankunft', 'Strong irregular verb.'],
  ['schlafen', '[ˈʃlaːfn̩]', 'to sleep', 'A1', 'Basics', 'Ich schlafe sehr gut.', 'Verb', null, null, 'er schläft, schlief, hat geschlafen', 'pennen', 'wachen', 'Schlaf', 'Strong verb.'],
  ['rot', '[ʁoːt]', 'red', 'A1', 'Colors', 'Das Auto ist rot.', 'Adjective', null, null, null, null, null, 'Farbe', 'Requires declension.'],
  ['schwarz', '[ʃvaʁts]', 'black', 'A1', 'Colors', 'Der Hund ist schwarz.', 'Adjective', null, null, null, 'dunkel', 'weiß', 'Farbe', null],
  ['groß', '[ɡʁoːs]', 'big / tall', 'A1', 'Adjectives', 'Das Haus ist sehr groß.', 'Adjective', null, null, null, 'riesig', 'klein', 'Größe', 'Irregular comparative.'],

  // ================= A2 LEVEL =================
  ['Speisekarte', '[ˈʃpaɪ̯zəˌkaʁtə]', 'Menu', 'A2', 'Restaurant', 'Könnte ich bitte die Speisekarte haben?', 'Noun', 'die', 'Speisekarten', null, 'Menü', null, 'Essen', 'Compound noun.'],
  ['Rechnung', '[ˈʁɛçnʊŋ]', 'Bill / Check', 'A2', 'Restaurant', 'Die Rechnung bitte!', 'Noun', 'die', 'Rechnungen', null, 'Quittung', null, 'bezahlen', 'Nouns in -ung.'],
  ['bestellen', '[bəˈʃtɛlən]', 'to order', 'A2', 'Restaurant', 'Wir möchten gerne bestellen.', 'Verb', null, null, 'er bestellt, bestellte, hat bestellt', 'ordern', 'stornieren', 'Bestellung', 'Prefix verb.'],
  ['Bahnhof', '[ˈbaːnˌhoːf]', 'Train Station', 'A2', 'Travel', 'Wo ist der Bahnhof?', 'Noun', 'der', 'Bahnhöfe', null, null, null, 'Zug', 'Masculine takes umlaut.'],
  ['Zug', '[tsuːk]', 'Train', 'A2', 'Travel', 'Der Zug fährt um 8 Uhr ab.', 'Noun', 'der', 'Züge', null, 'Bahn', 'Auto', 'Bahnhof', 'Masculine noun taking umlaut.'],
  ['Wohnung', '[ˈvoːnʊŋ]', 'Apartment', 'A2', 'Housing', 'Meine Wohnung ist groß.', 'Noun', 'die', 'Wohnungen', null, 'Apartment', 'Haus', 'wohnen', 'Feminine.'],
  ['Flugzeug', '[ˈfluːktsɔʏ̯k]', 'Airplane', 'A2', 'Travel', 'Wir fliegen mit dem Flugzeug.', 'Noun', 'das', 'Flugzeuge', null, 'Flieger', 'Zug', 'fliegen', 'Neuter.'],
  ['Urlaub', '[ˈuːɐ̯laʊ̯p]', 'Vacation', 'A2', 'Travel', 'Ich mache im Sommer Urlaub.', 'Noun', 'der', 'Urlaube', null, 'Ferien', 'Arbeit', 'reisen', 'Masculine noun.'],
  ['Krankenhaus', '[ˈkʁaŋkn̩ˌhaʊ̯s]', 'Hospital', 'A2', 'Health', 'Er liegt im Krankenhaus.', 'Noun', 'das', 'Krankenhäuser', null, 'Klinik', null, 'Arzt', 'Compound noun.'],
  ['kaufen', '[ˈkaʊ̯fn̩]', 'to buy', 'A2', 'Shopping', 'Ich kaufe Brot.', 'Verb', null, null, 'er kauft, kaufte, hat gekauft', 'erwerben', 'verkaufen', 'Käufer', 'Regular verb.'],
  ['verkaufen', '[fɛɐ̯ˈkaʊ̯fn̩]', 'to sell', 'A2', 'Shopping', 'Sie verkauft ihr Auto.', 'Verb', null, null, 'er verkauft, verkaufte, hat verkauft', 'veräußern', 'kaufen', 'Verkäufer', 'Inseparable prefix verb.'],
  ['teuer', '[ˈtɔʏ̯ɐ]', 'expensive', 'A2', 'Shopping', 'Das Auto ist zu teuer.', 'Adjective', null, null, null, 'kostspielig', 'billig', 'Geld', 'Drops -e- when declined.'],

  // ================= B1 LEVEL =================
  ['Bewerbung', '[bəˈvɛʁbʊŋ]', 'Job Application', 'B1', 'Work', 'Ich schreibe eine Bewerbung.', 'Noun', 'die', 'Bewerbungen', null, null, 'Kündigung', 'bewerben', 'Feminine.'],
  ['Vertrag', '[fɛɐ̯ˈtʁaːk]', 'Contract', 'B1', 'Work', 'Der Vertrag muss unterschrieben werden.', 'Noun', 'der', 'Verträge', null, 'Abkommen', null, 'Arbeit', 'Masculine noun.'],
  ['enttäuscht', '[ɛntˈtɔʏ̯ʃt]', 'disappointed', 'B1', 'Emotions', 'Ich bin sehr enttäuscht.', 'Adjective', null, null, null, 'desillusioniert', 'begeistert', 'Enttäuschung', 'Like an adjective.'],
  ['Umwelt', '[ˈʊmˌvɛlt]', 'Environment', 'B1', 'Environment', 'Wir müssen die Umwelt schützen.', 'Noun', 'die', null, null, 'Natur', null, 'Klima', 'Feminine, typically uncountable.'],
  ['Erfahrung', '[ɛɐ̯ˈfaːʁʊŋ]', 'Experience', 'B1', 'Work', 'Er hat viel Erfahrung.', 'Noun', 'die', 'Erfahrungen', null, 'Praxis', 'Unerfahrenheit', 'erfahren', 'Feminine.'],
  ['Erfolg', '[ɛɐ̯ˈfɔlk]', 'Success', 'B1', 'Work', 'Gratulieren wir zum Erfolg.', 'Noun', 'der', 'Erfolge', null, 'Triumph', 'Misserfolg', 'erfolgreich', 'Masculine.'],
  ['Meinung', '[ˈmaɪ̯nʊŋ]', 'Opinion', 'B1', 'Communication', 'Meiner Meinung nach ist das falsch.', 'Noun', 'die', 'Meinungen', null, 'Ansicht', null, 'meinen', 'Feminine.'],
  ['entscheiden', '[ɛntˈʃaɪ̯dn̩]', 'to decide', 'B1', 'Verbs', 'Du musst dich entscheiden.', 'Verb', null, null, 'er entscheidet, entschied, hat entschieden', 'beschließen', null, 'Entscheidung', 'Reflexive.'],
  ['erinnern', '[ɛɐ̯ˈʔɪnɐn]', 'to remember', 'B1', 'Verbs', 'Ich erinnere mich daran.', 'Verb', null, null, 'er erinnert, erinnerte, hat erinnert', 'gedenken', 'vergessen', 'Erinnerung', 'Reflexive verb.'],

  // ================= B2 LEVEL =================
  ['Wirtschaft', '[ˈvɪʁtʃaft]', 'Economy', 'B2', 'Society', 'Die Wirtschaft wächst.', 'Noun', 'die', 'Wirtschaften', null, 'Ökonomie', null, 'Unternehmen', 'Feminine.'],
  ['entwickeln', '[ɛntˈvɪkln̩]', 'to develop', 'B2', 'Verbs', 'Wir entwickeln neue Produkte.', 'Verb', null, null, 'er entwickelt, entwickelte, hat entwickelt', 'entwerfen', 'stagnieren', 'Entwicklung', 'Prefix verb.'],
  ['künstliche Intelligenz', '[diː ˈkʏnstlɪçə ɪntɛliˈɡɛnts]', 'AI', 'B2', 'Technology', 'KI wird den Markt verändern.', 'Noun', 'die', null, null, 'KI', null, 'Computer', 'Compound noun.'],
  ['Herausforderung', '[hɛˈʁaʊ̯sfɔʁdəʁʊŋ]', 'Challenge', 'B2', 'Abstract', 'Das ist eine große Herausforderung.', 'Noun', 'die', 'Herausforderungen', null, 'Problem', 'Lösung', 'herausfordern', 'Feminine noun.'],
  ['Verantwortung', '[fɛɐ̯ˈʔantvɔʁtʊŋ]', 'Responsibility', 'B2', 'Abstract', 'Er trägt die Verantwortung.', 'Noun', 'die', 'Verantwortungen', null, 'Pflicht', null, 'verantwortlich', 'Feminine.'],
  ['unterstützen', '[ʊntɐˈʃtʏtsn̩]', 'to support', 'B2', 'Verbs', 'Wir unterstützen das Projekt.', 'Verb', null, null, 'er unterstützt, unterstützte, hat unterstützt', 'helfen', 'behindern', 'Unterstützung', 'Verb.'],
  ['wesentlich', '[ˈveːzntlɪç]', 'essential', 'B2', 'Adjectives', 'Ein wesentlicher Unterschied.', 'Adjective', null, null, null, 'bedeutend', 'unwichtig', 'Wesen', 'Adjective.'],

  // ================= C1 LEVEL =================
  ['Maßnahme', '[ˈmaːsˌnaːmə]', 'Measure', 'C1', 'Formal', 'Neue Maßnahmen wurden beschlossen.', 'Noun', 'die', 'Maßnahmen', null, 'Schritt', null, 'ergreifen', 'Feminine.'],
  ['Voraussetzung', '[foˈʁaʊ̯sˌzɛtsʊŋ]', 'Prerequisite', 'C1', 'Formal', 'Ein Abschluss ist Voraussetzung.', 'Noun', 'die', 'Voraussetzungen', null, 'Bedingung', null, 'voraussetzen', 'Feminine.'],
  ['gewährleisten', '[ɡəˈvɛːɐ̯laɪ̯stn̩]', 'to ensure', 'C1', 'Verbs', 'Sicherheit gewährleisten.', 'Verb', null, null, 'er gewährleistet, hat gewährleistet', 'garantieren', 'verhindern', 'Sicherheit', 'Verb.'],
  ['Diskurs', '[dɪsˈkʊʁs]', 'Discourse', 'C1', 'Academic', 'Der politische Diskurs.', 'Noun', 'der', 'Diskurse', null, 'Debatte', null, 'diskursiv', 'Masculine.'],
  ['Paradigmenwechsel', '[paʁaˈdɪɡmənˌvɛksl̩]', 'Paradigm Shift', 'C1', 'Academic', 'Ein Paradigmenwechsel.', 'Noun', 'der', 'Paradigmenwechsel', null, 'Wandel', null, 'Paradigma', 'Masculine.'],
  ['implizieren', '[ɪmpliˈt͡siːʁən]', 'to imply', 'C1', 'Verbs', 'Das impliziert, dass sie unzufrieden ist.', 'Verb', null, null, 'er impliziert', 'andeuten', 'explizieren', 'Implikation', 'Verb.'],
  ['obsolet', '[ɔbzoˈleːt]', 'obsolete', 'C1', 'Adjectives', 'Diese Technologie ist obsolet.', 'Adjective', null, null, null, 'veraltet', 'aktuell', null, 'Adjective.']
];

console.log('🌱  Seeding detailed vocabulary into the database...');
db.exec('BEGIN');
let count = 0;
for (const item of vocab) {
  insert.run(...item);
  count++;
}
db.exec('COMMIT');

console.log(`✅ Successfully seeded ${count} highly detailed dictionary words into the database!`);
process.exit(0);
