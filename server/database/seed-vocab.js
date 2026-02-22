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
// Format: [german, phonetic, english, level, category, example_sentence, part_of_speech, gender, plural, conjugation, synonyms, antonyms, related_words, grammar_notes]
const vocab = [
  // ================= A1 LEVEL =================
  // Family
  ['Mutter', '[ˈmʊtɐ]', 'Mother', 'A1', 'Family', 'Meine Mutter heißt Maria.', 'Noun', 'die', 'Mütter', null, 'Mama', 'Vater', 'Eltern, Kind', 'Feminine noun ending in -er, taking an umlaut in plural.'],
  ['Vater', '[ˈfaːtɐ]', 'Father', 'A1', 'Family', 'Mein Vater arbeitet viel.', 'Noun', 'der', 'Väter', null, 'Papa', 'Mutter', 'Eltern, Kind', 'Masculine noun taking an umlaut in plural.'],
  ['Eltern', '[ˈɛltɐn]', 'Parents', 'A1', 'Family', 'Meine Eltern leben in Berlin.', 'Noun', 'die (pl)', 'Eltern', null, null, 'Kind', 'Mutter, Vater', 'Usually only used in the plural.'],
  ['Schwester', '[ˈʃvɛstɐ]', 'Sister', 'A1', 'Family', 'Ich habe eine Schwester.', 'Noun', 'die', 'Schwestern', null, null, 'Bruder', 'Geschwister', 'Feminine noun taking -n in plural.'],
  ['Bruder', '[ˈbʁuːdɐ]', 'Brother', 'A1', 'Family', 'Mein Bruder ist älter als ich.', 'Noun', 'der', 'Brüder', null, null, 'Schwester', 'Geschwister', 'Masculine noun taking an umlaut in plural.'],
  ['Oma', '[ˈoːma]', 'Grandma', 'A1', 'Family', 'Meine Oma backt einen Kuchen.', 'Noun', 'die', 'Omas', null, 'Großmutter', 'Opa', 'Großeltern', 'Informal. Takes -s in plural (foreign/short word).'],
  ['Opa', '[ˈoːpa]', 'Grandpa', 'A1', 'Family', 'Mein Opa liest die Zeitung.', 'Noun', 'der', 'Opas', null, 'Großvater', 'Oma', 'Großeltern', 'Informal. Takes -s in plural.'],
  ['Kind', '[kɪnt]', 'Child', 'A1', 'Family', 'Das Kind spielt im Garten.', 'Noun', 'das', 'Kinder', null, null, 'Erwachsene(r)', 'Eltern, Baby', 'Neuter noun taking -er in plural.'],
  
  // Kitchen & Food
  ['Apfel', '[ˈapfəl]', 'Apple', 'A1', 'Kitchen', 'Der Apfel ist rot und süß.', 'Noun', 'der', 'Äpfel', null, null, null, 'Obst, Birne', 'Masculine noun taking an umlaut in plural.'],
  ['Brot', '[bʁoːt]', 'Bread', 'A1', 'Kitchen', 'Ich esse Brot zum Frühstück.', 'Noun', 'das', 'Brote', null, null, null, 'Brötchen, Bäcker', 'Neuter noun taking -e in plural.'],
  ['Milch', '[mɪlç]', 'Milk', 'A1', 'Kitchen', 'Ich trinke jeden Morgen Milch.', 'Noun', 'die', null, null, null, null, 'Getränk, Kuh', 'Uncountable / mass noun. No plural.'],
  ['Wasser', '[ˈvasɐ]', 'Water', 'A1', 'Kitchen', 'Ich trinke viel Wasser.', 'Noun', 'das', 'Wässer', null, null, null, 'Getränk, trinken', 'Usually uncountable. Plural refers to distinct sources/bottles.'],
  ['Kaffee', '[ˈkafe]', 'Coffee', 'A1', 'Kitchen', 'Morgens trinke ich Kaffee.', 'Noun', 'der', 'Kaffees', null, null, 'Tee', 'Getränk, Koffein', 'Masculine noun.'],
  ['Tisch', '[tɪʃ]', 'Table', 'A1', 'Kitchen', 'Der Teller steht auf dem Tisch.', 'Noun', 'der', 'Tische', null, null, null, 'Stuhl, Möbel', 'Masculine noun expecting Accusative/Dative switch (auf).'],
  ['Löffel', '[ˈlœfl̩]', 'Spoon', 'A1', 'Kitchen', 'Die Suppe isst man mit einem Löffel.', 'Noun', 'der', 'Löffel', null, null, 'Gabel, Messer', 'Besteck', 'Masculine noun, spelling unchanged in plural.'],

  // Verbs (A1)
  ['machen', '[ˈmaxn̩]', 'to make / to do', 'A1', 'Basics', 'Was machst du heute?', 'Verb', null, null, 'er macht, machte, hat gemacht', 'tun', null, 'Machart, Macher', 'Regular weak verb. Often acts as a light/support verb.'],
  ['gehen', '[ˈɡeːən]', 'to go', 'A1', 'Basics', 'Ich gehe nach Hause.', 'Verb', null, null, 'er geht, ging, ist gegangen', 'laufen', 'kommen, bleiben', 'Gehweg', 'Strong irregular verb. Requires "sein" in Perfekt.'],
  ['essen', '[ˈɛsn̩]', 'to eat', 'A1', 'Basics', 'Wir essen Pizza.', 'Verb', null, null, 'er isst, aß, hat gegessen', 'speisen', 'trinken, fasten', 'Essen (noun), Lebensmittel', 'Strong irregular verb with vowel shift (e -> i).'],
  ['trinken', '[ˈtʁɪŋkn̩]', 'to drink', 'A1', 'Basics', 'Trinkst du Tee?', 'Verb', null, null, 'er trinkt, trank, hat getrunken', 'saufen (colloq.)', 'essen', 'Getränk', 'Strong irregular verb.'],
  ['kommen', '[ˈkɔmən]', 'to come', 'A1', 'Basics', 'Kommst du aus Deutschland?', 'Verb', null, null, 'er kommt, kam, ist gekommen', 'erscheinen', 'gehen', 'Ankunft', 'Strong irregular verb. Requires "sein" in Perfekt.'],
  ['schlafen', '[ˈʃlaːfn̩]', 'to sleep', 'A1', 'Basics', 'Ich schlafe nachts sehr gut.', 'Verb', null, null, 'er schläft, schlief, hat geschlafen', 'pennen (colloq.)', 'wachen, aufstehen', 'Schlaf, müde', 'Strong verb with vowel shift (a -> ä).'],
  
  // Adjectives (A1)
  ['rot', '[ʁoːt]', 'red', 'A1', 'Colors', 'Das Auto ist rot.', 'Adjective', null, null, null, null, null, 'Farbe', 'Requires adjective declension when before a noun.'],
  ['schwarz', '[ʃvaʁts]', 'black', 'A1', 'Colors', 'Der Hund ist schwarz.', 'Adjective', null, null, null, 'dunkel', 'weiß', 'Farbe, Nacht', null],

  // ================= A2 LEVEL =================
  ['Speisekarte', '[ˈʃpaɪ̯zəˌkaʁtə]', 'Menu', 'A2', 'Restaurant', 'Könnte ich bitte die Speisekarte haben?', 'Noun', 'die', 'Speisekarten', null, 'Menü', null, 'Essen, Restaurant', 'Compound noun: Speise + Karte.'],
  ['Rechnung', '[ˈʁɛçnʊŋ]', 'Bill / Check', 'A2', 'Restaurant', 'Die Rechnung bitte!', 'Noun', 'die', 'Rechnungen', null, 'Quittung', null, 'bezahlen', 'Nouns ending in -ung are always feminine and take -en plural.'],
  ['bestellen', '[bəˈʃtɛlən]', 'to order', 'A2', 'Restaurant', 'Wir möchten gerne bestellen.', 'Verb', null, null, 'er bestellt, bestellte, hat bestellt', 'ordern', 'stornieren', 'Bestellung', 'Inseparable prefix verb (be-).'],
  ['Bahnhof', '[ˈbaːnˌhoːf]', 'Train Station', 'A2', 'Travel', 'Wo ist der Bahnhof?', 'Noun', 'der', 'Bahnhöfe', null, null, null, 'Zug, Bahn, Gleis', 'Compound noun: Bahn + Hof. Masculine takes umlaut.'],
  ['Zug', '[tsuːk]', 'Train', 'A2', 'Travel', 'Der Zug fährt um 8 Uhr ab.', 'Noun', 'der', 'Züge', null, 'Bahn', 'Auto, Flugzeug', 'Bahnhof, fahren', 'Masculine noun taking umlaut in plural.'],
  ['Wohnung', '[ˈvoːnʊŋ]', 'Apartment', 'A2', 'Housing', 'Meine Wohnung ist groß.', 'Noun', 'die', 'Wohnungen', null, 'Apartment', 'Haus', 'wohnen, Miete', 'Nouns ending in -ung are always feminine.'],

  // ================= B1 LEVEL =================
  ['Bewerbung', '[bəˈvɛʁbʊŋ]', 'Job Application', 'B1', 'Work', 'Ich schreibe eine Bewerbung für die Stelle.', 'Noun', 'die', 'Bewerbungen', null, null, 'Kündigung', 'bewerben, Lebenslauf', 'Nouns ending in -ung are always feminine.'],
  ['Vertrag', '[fɛɐ̯ˈtʁaːk]', 'Contract', 'B1', 'Work', 'Der Vertrag muss unterschrieben werden.', 'Noun', 'der', 'Verträge', null, 'Abkommen', null, 'unterschreiben, Arbeit', 'Masculine noun taking umlaut in plural.'],
  ['enttäuscht', '[ɛntˈtɔʏ̯ʃt]', 'disappointed', 'B1', 'Emotions', 'Ich bin sehr enttäuscht von diesem Film.', 'Adjective', null, null, null, 'desillusioniert', 'begeistert', 'Enttäuschung', 'Acts like an adjective or past participle.'],
  ['Umwelt', '[ˈʊmˌvɛlt]', 'Environment', 'B1', 'Environment', 'Wir müssen die Umwelt schützen.', 'Noun', 'die', null, null, 'Natur', null, 'Klima, verschmutzen', 'Feminine, typically uncountable.'],

  // ================= B2 LEVEL =================
  ['Wirtschaft', '[ˈvɪʁtʃaft]', 'Economy', 'B2', 'Society', 'Die Wirtschaft wächst.', 'Noun', 'die', 'Wirtschaften', null, 'Ökonomie', null, 'Geld, Unternehmen', 'Nouns ending in -schaft are always feminine.'],
  ['entwickeln', '[ɛntˈvɪkln̩]', 'to develop', 'B2', 'Verbs', 'Das Unternehmen entwickelt neue Produkte.', 'Verb', null, null, 'er entwickelt, entwickelte, hat entwickelt', 'entwerfen, ausarbeiten', 'stagnieren', 'Entwicklung', 'Inseparable prefix verb.'],
  ['künstliche Intelligenz', '[diː ˈkʏnstlɪçə ɪntɛliˈɡɛnts]', 'Artificial Intelligence', 'B2', 'Technology', 'Die künstliche Intelligenz wird den Markt verändern.', 'Noun', 'die', null, null, 'KI', null, 'Computer, Daten', 'Compound concept, behaves grammatically as adjective + noun.'],

  // ================= C1 LEVEL =================
  ['Maßnahme', '[ˈmaːsˌnaːmə]', 'Measure / Action', 'C1', 'Formal', 'Die Regierung hat neue Maßnahmen beschlossen.', 'Noun', 'die', 'Maßnahmen', null, 'Schritt, Vorgehen', null, 'ergreifen', 'Feminine noun taking -n in plural.'],
  ['Voraussetzung', '[foˈʁaʊ̯sˌzɛtsʊŋ]', 'Prerequisite', 'C1', 'Formal', 'Ein Abschluss ist die Voraussetzung für den Job.', 'Noun', 'die', 'Voraussetzungen', null, 'Bedingung', null, 'voraussetzen', 'Noun ending in -ung is always feminine.'],
  ['gewährleisten', '[ɡəˈvɛːɐ̯laɪ̯stn̩]', 'to guarantee / ensure', 'C1', 'Verbs', 'Die Sicherheit muss gewährleistet werden.', 'Verb', null, null, 'er gewährleistet, gewährleistete, hat gewährleistet', 'sicherstellen, garantieren', 'verhindern', 'Sicherheit', 'Inseparable prefix verb.']
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
