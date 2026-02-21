import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/deutsch-app.db');
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL');

export function initDatabase() {
  console.log('🗄️  Initializing database...');

  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      display_name TEXT NOT NULL,
      current_level TEXT DEFAULT 'A1',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    )
  `);

  // Learning progress table
  db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content_type TEXT NOT NULL,
      content_id TEXT NOT NULL,
      level TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      completed BOOLEAN DEFAULT 0,
      last_practiced DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, content_type, content_id)
    )
  `);

  // Vocabulary table
  db.exec(`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      german TEXT NOT NULL,
      english TEXT NOT NULL,
      level TEXT NOT NULL,
      category TEXT,
      example_sentence TEXT,
      audio_path TEXT,
      image_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Grammar topics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS grammar_topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      description TEXT,
      content TEXT,
      examples TEXT,
      exercises TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Prepositions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS prepositions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      case_type TEXT NOT NULL,
      meaning TEXT NOT NULL,
      example TEXT NOT NULL,
      level TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Lessons table
  db.exec(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      level TEXT NOT NULL,
      category TEXT,
      description TEXT,
      content TEXT,
      audio_path TEXT,
      pdf_path TEXT,
      order_index INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // User achievements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_type TEXT NOT NULL,
      achievement_name TEXT NOT NULL,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Learning sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS learning_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      session_type TEXT NOT NULL,
      duration INTEGER,
      score INTEGER,
      items_practiced INTEGER,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ended_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Insert sample vocabulary data
  const vocabCount = db.prepare('SELECT COUNT(*) as count FROM vocabulary').get();
  if (vocabCount.count === 0) {
    console.log('📝 Inserting sample vocabulary...');
    insertSampleVocabulary();
  }

  // Insert sample grammar topics
  const grammarCount = db.prepare('SELECT COUNT(*) as count FROM grammar_topics').get();
  if (grammarCount.count === 0) {
    console.log('📖 Inserting sample grammar topics...');
    insertSampleGrammar();
  }

  // Insert sample prepositions
  const prepCount = db.prepare('SELECT COUNT(*) as count FROM prepositions').get();
  if (prepCount.count === 0) {
    console.log('📍 Inserting sample prepositions...');
    insertSamplePrepositions();
  }

  console.log('✅ Database initialized successfully');
}

function insertSampleVocabulary() {
  const insert = db.prepare(`
    INSERT INTO vocabulary (german, english, level, category, example_sentence)
    VALUES (?, ?, ?, ?, ?)
  `);

  const vocab = [
    // A1 Level - Basics
    ['Hallo', 'Hello', 'A1', 'Greetings', 'Hallo, wie geht es dir?'],
    ['Tschüss', 'Goodbye', 'A1', 'Greetings', 'Tschüss, bis morgen!'],
    ['Danke', 'Thank you', 'A1', 'Greetings', 'Danke schön!'],
    ['Bitte', 'Please/You\'re welcome', 'A1', 'Greetings', 'Bitte sehr!'],
    ['Ja', 'Yes', 'A1', 'Basic', 'Ja, das stimmt.'],
    ['Nein', 'No', 'A1', 'Basic', 'Nein, das ist falsch.'],

    // A1 Level - Numbers
    ['eins', 'one', 'A1', 'Numbers', 'Ich habe eins.'],
    ['zwei', 'two', 'A1', 'Numbers', 'Das sind zwei Äpfel.'],
    ['drei', 'three', 'A1', 'Numbers', 'Ich bin drei Jahre alt.'],

    // A1 Level - Family
    ['Mutter', 'Mother', 'A1', 'Family', 'Meine Mutter ist nett.'],
    ['Vater', 'Father', 'A1', 'Family', 'Mein Vater arbeitet.'],
    ['Bruder', 'Brother', 'A1', 'Family', 'Ich habe einen Bruder.'],
    ['Schwester', 'Sister', 'A1', 'Family', 'Meine Schwester ist klein.'],

    // A1 Level - Common Objects
    ['Haus', 'House', 'A1', 'Objects', 'Das ist mein Haus.'],
    ['Auto', 'Car', 'A1', 'Objects', 'Ich fahre Auto.'],
    ['Buch', 'Book', 'A1', 'Objects', 'Ich lese ein Buch.'],
    ['Tisch', 'Table', 'A1', 'Objects', 'Der Tisch ist groß.'],
    ['Stuhl', 'Chair', 'A1', 'Objects', 'Der Stuhl ist bequem.'],

    // A1 Level - Colors
    ['rot', 'red', 'A1', 'Colors', 'Die Rose ist rot.'],
    ['blau', 'blue', 'A1', 'Colors', 'Der Himmel ist blau.'],
    ['grün', 'green', 'A1', 'Colors', 'Das Gras ist grün.'],
    ['gelb', 'yellow', 'A1', 'Colors', 'Die Sonne ist gelb.'],

    // A2 Level
    ['arbeiten', 'to work', 'A2', 'Verbs', 'Ich arbeite jeden Tag.'],
    ['lernen', 'to learn', 'A2', 'Verbs', 'Ich lerne Deutsch.'],
    ['sprechen', 'to speak', 'A2', 'Verbs', 'Ich spreche Deutsch.'],
    ['verstehen', 'to understand', 'A2', 'Verbs', 'Ich verstehe das nicht.'],
    ['wohnen', 'to live', 'A2', 'Verbs', 'Ich wohne in Berlin.'],

    // B1 Level
    ['Gesellschaft', 'Society', 'B1', 'Abstract', 'Die Gesellschaft verändert sich.'],
    ['Umwelt', 'Environment', 'B1', 'Abstract', 'Wir müssen die Umwelt schützen.'],
    ['Entwicklung', 'Development', 'B1', 'Abstract', 'Die Entwicklung ist wichtig.'],
    ['Erfahrung', 'Experience', 'B1', 'Abstract', 'Ich habe viel Erfahrung.'],
  ];

  db.exec('BEGIN');
  for (const item of vocab) {
    insert.run(...item);
  }
  db.exec('COMMIT');
}

function insertSampleGrammar() {
  const insert = db.prepare(`
    INSERT INTO grammar_topics (title, level, description, content, examples)
    VALUES (?, ?, ?, ?, ?)
  `);

  const grammar = [
    // ==================== A1 LEVEL ====================
    [
      'Artikel (Articles)',
      'A1',
      'German articles: der, die, das',
      'German nouns have three genders: masculine (der), feminine (die), and neuter (das). The gender must be memorized with each noun. Articles also change based on case (nominative, accusative, dative, genitive).\n\nTips for learning gender:\n- Masculine: -er words (der Lehrer), days, months, seasons\n- Feminine: -e words (die Blume), -ung/-heit/-keit/-schaft endings\n- Neuter: -chen/-lein diminutives, -um words, infinitives as nouns',
      JSON.stringify([
        'der Mann (the man - masculine)',
        'die Frau (the woman - feminine)',
        'das Kind (the child - neuter)',
        'der Tisch (the table - masculine)',
        'die Tür (the door - feminine)',
        'das Fenster (the window - neuter)',
        'ein Mann (a man)',
        'eine Frau (a woman)',
        'ein Kind (a child)'
      ])
    ],
    [
      'Personalpronomen (Personal Pronouns)',
      'A1',
      'German personal pronouns in nominative case',
      'Personal pronouns replace nouns. In German nominative case:\n- ich (I) - 1st person singular\n- du (you) - 2nd person singular informal\n- er/sie/es (he/she/it) - 3rd person singular\n- wir (we) - 1st person plural\n- ihr (you all) - 2nd person plural informal\n- sie (they) - 3rd person plural\n- Sie (you) - 2nd person formal (singular and plural)\n\nNote: "Sie" (formal you) is always capitalized!',
      JSON.stringify([
        'Ich bin Student. (I am a student.)',
        'Du bist nett. (You are nice.)',
        'Er ist groß. (He is tall.)',
        'Sie kommt aus Berlin. (She comes from Berlin.)',
        'Es regnet. (It is raining.)',
        'Wir lernen Deutsch. (We learn German.)',
        'Ihr seid Freunde. (You all are friends.)',
        'Sie sind Lehrer. (They/You formal are teachers.)'
      ])
    ],
    [
      'Präsens (Present Tense)',
      'A1',
      'Conjugation of regular verbs in present tense',
      'Regular verbs in German follow a pattern: remove -en from the infinitive and add endings:\n- ich: -e\n- du: -st\n- er/sie/es: -t\n- wir: -en\n- ihr: -t\n- sie/Sie: -en\n\nStem-changing verbs (e→i, e→ie, a→ä) change in du and er/sie/es forms only.\n\nRefer to: Menschen A1 Lektion 1-3, Schritte International Neu A1, Grammatik Aktiv A1-B1',
      JSON.stringify([
        'lernen: ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen',
        'wohnen: ich wohne, du wohnst, sie wohnt',
        'kommen: ich komme, du kommst, er kommt',
        'sprechen (e→i): ich spreche, du sprichst, er spricht',
        'sehen (e→ie): ich sehe, du siehst, sie sieht',
        'fahren (a→ä): ich fahre, du fährst, er fährt'
      ])
    ],
    [
      'Trennbare Verben (Separable Verbs)',
      'A1',
      'Verbs with separable prefixes',
      'Many German verbs have separable prefixes (an-, auf-, aus-, ein-, mit-, zu-, etc.). In present tense and imperative, the prefix separates and goes to the end of the sentence.\n\nCommon separable verbs: aufstehen (get up), einkaufen (shop), anrufen (call), fernsehen (watch TV), mitkommen (come along).\n\nRefer to: Schritte International Neu A1 Lektion 3, Menschen A1 Modul 4',
      JSON.stringify([
        'aufstehen: Ich stehe um 7 Uhr auf. (I get up at 7.)',
        'einkaufen: Wir kaufen im Supermarkt ein. (We shop at the supermarket.)',
        'anrufen: Er ruft mich an. (He calls me.)',
        'fernsehen: Sie sieht jeden Abend fern. (She watches TV every evening.)',
        'mitkommen: Kommst du mit? (Are you coming along?)',
        'zurückkommen: Wann kommt er zurück? (When is he coming back?)'
      ])
    ],
    [
      'Modalverben (Modal Verbs)',
      'A1',
      'können, müssen, wollen, möchten, dürfen, sollen',
      'Modal verbs express ability, necessity, permission, or desire. They are conjugated and paired with an infinitive at the end of the sentence.\n\n- können (can, able to)\n- müssen (must, have to)\n- wollen (want to)\n- möchten (would like to)\n- dürfen (may, allowed to)\n- sollen (should)\n\nRefer to: Menschen A1 Lektion 8, Schritte International Neu A1 Lektion 5, Grammatik Aktiv A1-B1',
      JSON.stringify([
        'können: Ich kann Deutsch sprechen. (I can speak German.)',
        'müssen: Du musst lernen. (You must learn.)',
        'wollen: Er will nach Hause gehen. (He wants to go home.)',
        'möchten: Ich möchte Kaffee trinken. (I would like to drink coffee.)',
        'dürfen: Darf ich rauchen? (May I smoke?)',
        'sollen: Sie sollen pünktlich sein. (You should be punctual.)'
      ])
    ],
    [
      'Negation (Negation)',
      'A1',
      'Using nicht and kein',
      'German has two negation words:\n\n1. "nicht" negates verbs, adjectives, and definite nouns:\n   - Position: after the verb or at the end\n\n2. "kein" negates indefinite nouns (ein/eine/ein):\n   - kein/keine/kein (no, not a/an)\n\nRefer to: Menschen A1 Lektion 6, Studio 21 A1 Einheit 4',
      JSON.stringify([
        'nicht: Ich verstehe nicht. (I don\'t understand.)',
        'nicht: Das ist nicht gut. (That is not good.)',
        'nicht: Ich komme heute nicht. (I\'m not coming today.)',
        'kein: Ich habe keine Zeit. (I have no time.)',
        'kein: Das ist kein Problem. (That\'s not a problem.)',
        'kein: Er hat keinen Bruder. (He doesn\'t have a brother.)'
      ])
    ],

    // ==================== A2 LEVEL ====================
    [
      'Akkusativ (Accusative Case)',
      'A2',
      'The accusative case for direct objects',
      'The accusative case is used for direct objects (what/whom the verb acts upon). Only masculine articles change:\n- der → den\n- ein → einen\n\nAccusative is also used after certain prepositions: durch, für, gegen, ohne, um.\n\nRefer to: Menschen A2 Lektion 1, Begegnungen A2 Kapitel 1, Schritte International Neu A2',
      JSON.stringify([
        'Ich sehe den Mann. (I see the man.)',
        'Ich habe einen Bruder. (I have a brother.)',
        'Ich esse das Brot. (I eat the bread.) - no change',
        'Ich kaufe die Zeitung. (I buy the newspaper.) - no change',
        'für: Das Geschenk ist für den Vater. (The gift is for the father.)',
        'ohne: Ich gehe ohne meinen Freund. (I go without my friend.)'
      ])
    ],
    [
      'Dativ (Dative Case)',
      'A2',
      'The dative case for indirect objects',
      'The dative case is used for indirect objects (to whom/for whom). Articles change:\n- der → dem (masculine)\n- das → dem (neuter)\n- die → der (feminine)\n- die → den (plural, +n on noun)\n\nCommon dative verbs: helfen, danken, gefallen, gehören, schmecken.\nDative prepositions: aus, bei, mit, nach, seit, von, zu.\n\nRefer to: Menschen A2 Lektion 5, Begegnungen A2 Kapitel 3, DaF Kompakt Neu A2',
      JSON.stringify([
        'Ich helfe dem Mann. (I help the man.)',
        'Das Buch gehört der Frau. (The book belongs to the woman.)',
        'Ich danke dir. (I thank you.)',
        'Das Essen schmeckt den Kindern. (The food tastes good to the children.)',
        'Ich gehe mit meinem Freund. (I go with my friend.)',
        'nach: Ich fahre nach dem Unterricht. (I drive after the class.)'
      ])
    ],
    [
      'Perfekt (Present Perfect)',
      'A2',
      'Past tense using haben/sein + past participle',
      'The perfect tense is the most common past tense in spoken German. Formation:\n\nhaben/sein (conjugated) + past participle (ge-...-(e)t for regular, ge-...en for irregular)\n\nUse "sein" with:\n- Motion verbs (gehen, fahren, kommen)\n- State change (werden, sterben, aufwachen)\n- sein, bleiben\n\nAll others use "haben".\n\nRegular verbs: ge- + stem + -t (gemacht, gelernt)\nIrregular verbs: ge- + changed stem + -en (gegessen, getrunken)\nVerbs ending in -ieren: no ge- (studiert, telefoniert)\nSeparable verbs: prefix + ge + stem (eingekauft, aufgestanden)\n\nRefer to: Menschen A2 Lektion 7, Schritte International Neu A2, Studio 21 A2, DaF Kompakt Neu A2',
      JSON.stringify([
        'haben: Ich habe gelernt. (I have learned.)',
        'haben: Er hat gegessen. (He has eaten.)',
        'haben: Wir haben gearbeitet. (We have worked.)',
        'sein: Wir sind gegangen. (We have gone.)',
        'sein: Sie ist gekommen. (She has come.)',
        'sein: Ich bin nach Berlin gefahren. (I have driven to Berlin.)',
        'separable: aufstehen → Ich bin aufgestanden. (I got up.)',
        'machen → gemacht: Ich habe meine Hausaufgaben gemacht.',
        'essen → gegessen: Wir haben Pizza gegessen.',
        'studieren → studiert: Ich habe in München studiert.',
      ])
    ],
    [
      'Wechselpräpositionen (Two-way Prepositions)',
      'A2',
      'Prepositions that take either Dative or Accusative',
      'Nine prepositions can take either dative or accusative:\nan, auf, hinter, in, neben, über, unter, vor, zwischen\n\nUse DATIVE for location (wo? where?):\n- Static position, no movement\n\nUse ACCUSATIVE for direction (wohin? where to?):\n- Movement towards a destination\n\nRefer to: Menschen A2 Lektion 10, Begegnungen A2 Kapitel 6, Grammatik Aktiv A1-B1',
      JSON.stringify([
        'DATIVE (wo?): Das Buch liegt auf dem Tisch. (The book is lying on the table.)',
        'ACCUSATIVE (wohin?): Ich lege das Buch auf den Tisch. (I put the book on the table.)',
        'DATIVE: Ich bin in der Küche. (I am in the kitchen.)',
        'ACCUSATIVE: Ich gehe in die Küche. (I go into the kitchen.)',
        'DATIVE: Das Bild hängt an der Wand. (The picture hangs on the wall.)',
        'ACCUSATIVE: Ich hänge das Bild an die Wand. (I hang the picture on the wall.)'
      ])
    ],
    [
      'Komparativ und Superlativ (Comparative and Superlative)',
      'A2',
      'Comparing things in German',
      'Comparative: adjective + -er (schneller, schöner)\nSuperlative: am + adjective + -(e)sten (am schnellsten, am schönsten)\n\nIrregular forms:\n- gut → besser → am besten\n- viel → mehr → am meisten\n- gern → lieber → am liebsten\n\nUmlaut changes: groß→größer, alt→älter, jung→jünger\n\nRefer to: Menschen A2 Lektion 12, Studio 21 A2 Einheit 9',
      JSON.stringify([
        'schnell → schneller → am schnellsten (fast)',
        'Das Auto ist schneller als das Fahrrad. (The car is faster than the bike.)',
        'Der ICE ist am schnellsten. (The ICE is the fastest.)',
        'gut → besser → am besten: Dieses Buch ist besser. (This book is better.)',
        'groß → größer → am größten: München ist größer als Nürnberg.',
        'Ich lerne lieber Deutsch als Englisch. (I prefer learning German to English.)'
      ])
    ],

    // ==================== B1 LEVEL ====================
    [
      'Nebensätze mit weil/dass (Subordinate Clauses)',
      'B1',
      'Subordinate clauses with weil and dass',
      'Subordinate clauses are dependent clauses introduced by conjunctions. The verb goes to the END of the clause.\n\nweil = because\ndass = that\n\nWord order: Main clause + conjunction + Subject + ... + VERB\n\nRefer to: Menschen B1 Lektion 2, Begegnungen B1 Kapitel 1, Schritte International Neu B1',
      JSON.stringify([
        'Ich lerne Deutsch, weil ich in Deutschland arbeiten will. (I learn German because I want to work in Germany.)',
        'Er bleibt zu Hause, weil er krank ist. (He stays home because he is sick.)',
        'Ich denke, dass Deutsch schwer ist. (I think that German is difficult.)',
        'Sie sagt, dass sie morgen kommt. (She says that she is coming tomorrow.)',
        'Wir wissen, dass die Prüfung wichtig ist. (We know that the exam is important.)'
      ])
    ],
    [
      'Konjunktiv II (Subjunctive II)',
      'B1',
      'Expressing wishes, polite requests, hypothetical situations',
      'Konjunktiv II expresses:\n- Wishes (Ich wäre gern reich.)\n- Polite requests (Ich hätte gern...)\n- Hypothetical situations (Wenn ich Zeit hätte,...)\n- Advice (Du solltest lernen.)\n\nMain forms:\n- sein → wäre\n- haben → hätte\n- werden → würde\n- können → könnte\n- müssen → müsste\n- sollen → sollte\n\nRefer to: Menschen B1 Lektion 8, Begegnungen B1 Kapitel 7, DaF Kompakt Neu B1',
      JSON.stringify([
        'Ich wäre gern reich. (I would like to be rich.)',
        'Ich hätte gern einen Kaffee. (I would like a coffee.)',
        'Könnten Sie mir helfen? (Could you help me? - polite)',
        'Wenn ich Zeit hätte, würde ich reisen. (If I had time, I would travel.)',
        'Du solltest mehr lernen. (You should learn more.)',
        'An deiner Stelle würde ich das nicht machen. (In your place, I wouldn\'t do that.)'
      ])
    ],
    [
      'Passiv (Passive Voice)',
      'B1',
      'Forming passive sentences',
      'Passive voice emphasizes the action, not who does it.\n\nFormation: werden (conjugated) + past participle\n\nPresent: wird gemacht (is done)\nPerfekt: ist gemacht worden (was done)\nPräteritum: wurde gemacht (was done)\n\nAgent (by whom): von + dative\n\nRefer to: Begegnungen B1 Kapitel 5, Menschen B1 Lektion 11, Grammatik Aktiv B1',
      JSON.stringify([
        'Das Haus wird gebaut. (The house is being built.)',
        'Der Brief wird geschrieben. (The letter is being written.)',
        'Das Auto wurde repariert. (The car was repaired.)',
        'Das Buch ist von Goethe geschrieben worden. (The book was written by Goethe.)',
        'Die Tür wird geöffnet. (The door is being opened.)',
        'Deutsch wird in der Schule gelernt. (German is learned in school.)'
      ])
    ],
    [
      'Relativsätze (Relative Clauses)',
      'B1',
      'Describing nouns with relative clauses',
      'Relative clauses provide additional information about a noun. They use relative pronouns: der, die, das, etc.\n\nThe relative pronoun agrees with the noun in gender and number, but takes its case from its role in the relative clause.\n\nVerb goes to the END of the relative clause.\n\nRefer to: Menschen B1 Lektion 6, Begegnungen B1 Kapitel 3, Studio 21 B1',
      JSON.stringify([
        'Der Mann, der dort steht, ist mein Vater. (The man who is standing there is my father.)',
        'Das Buch, das ich lese, ist interessant. (The book that I am reading is interesting.)',
        'Die Frau, die ich gestern gesehen habe, ist Lehrerin. (The woman whom I saw yesterday is a teacher.)',
        'Das Auto, das mir gehört, ist alt. (The car that belongs to me is old.)',
        'Der Student, dem ich geholfen habe, kommt aus China. (The student whom I helped comes from China.)'
      ])
    ],
    [
      'Präteritum (Simple Past)',
      'B1',
      'Written past tense',
      'Präteritum is used mainly in written German (stories, news, formal texts) and with modal verbs and sein/haben in spoken German.\n\nRegular verbs: stem + -te, -test, -te, -ten, -tet, -ten\nIrregular verbs: stem changes (ging, kam, sah)\n\nRefer to: Menschen B1 Lektion 9, Schritte International Neu B1, Begegnungen B1 Kapitel 9',
      JSON.stringify([
        'sein: ich war, du warst, er war, wir waren',
        'haben: ich hatte, du hattest, sie hatte',
        'gehen: ich ging, du gingst, er ging',
        'machen: ich machte, du machtest, wir machten',
        'Es war einmal ein König. (Once upon a time there was a king.)',
        'Ich konnte nicht kommen. (I couldn\'t come.)',
        'Sie musste arbeiten. (She had to work.)'
      ])
    ],

    // ==================== B2 LEVEL ====================
    [
      'Konjunktiv I (Subjunctive I)',
      'B2',
      'Indirect speech and reported speech',
      'Konjunktiv I is used primarily for indirect speech (reporting what someone said).\n\nFormation: verb stem + special endings\n- ich -e, du -est, er/sie/es -e, wir -en, ihr -et, sie -en\n\nIf Konjunktiv I looks like indicative, use Konjunktiv II instead.\n\nRefer to: Begegnungen B2 Kapitel 4, DaF Kompakt Neu B2, Geschäftliche Begegnungen B2',
      JSON.stringify([
        'Er sagt, er komme morgen. (He says he is coming tomorrow.)',
        'Sie behauptet, sie habe keine Zeit. (She claims she has no time.)',
        'Der Minister erklärt, die Regierung wolle helfen. (The minister explains that the government wants to help.)',
        'Er meint, das sei wichtig. (He thinks that is important.)',
        'Die Zeitung schreibt, der Präsident habe das gesagt. (The newspaper writes that the president said that.)'
      ])
    ],
    [
      'Nominalisierung (Nominalization)',
      'B2',
      'Converting verbs and adjectives to nouns',
      'German frequently converts verbs and adjectives into nouns. This is common in formal and academic German.\n\nVerbs → nouns:\n- Infinitive as noun: das Lesen, das Schreiben (always neuter)\n- Adding suffixes: -ung, -tion, -heit, -keit\n\nAdjectives → nouns:\n- Add der/die/das: der Arme (the poor person), das Gute (the good thing)\n\nRefer to: Begegnungen B2 Kapitel 8, DaF Kompakt Neu B2',
      JSON.stringify([
        'lesen → das Lesen (reading)',
        'schwimmen → das Schwimmen (swimming)',
        'schön → die Schönheit (beauty)',
        'möglich → die Möglichkeit (possibility)',
        'entwickeln → die Entwicklung (development)',
        'informieren → die Information (information)',
        'Das Rauchen ist hier verboten. (Smoking is forbidden here.)',
        'Die Globalisierung verändert die Welt. (Globalization changes the world.)'
      ])
    ],
    [
      'Partizipien als Adjektive (Participles as Adjectives)',
      'B2',
      'Using present and past participles as adjectives',
      'Participles can function as adjectives and take adjective endings.\n\nPresent participle (active): infinitive + -d\n- der lesende Mann (the reading man)\n\nPast participle (passive/completed):\n- das gekochte Essen (the cooked food)\n\nRefer to: Begegnungen B2 Kapitel 6, DaF Kompakt Neu B2',
      JSON.stringify([
        'der spielende Hund (the playing dog)',
        'die lachenden Kinder (the laughing children)',
        'das gekochte Ei (the boiled egg)',
        'die geschriebene Arbeit (the written work)',
        'ein spannender Film (an exciting film)',
        'die überraschte Frau (the surprised woman)',
        'Das ist eine gut bezahlte Arbeit. (That is a well-paid job.)'
      ])
    ],
    [
      'Erweiterte Partizipialattribute (Extended Participial Attributes)',
      'B2',
      'Complex attributive constructions',
      'German allows very long attributes before nouns, common in formal writing.\n\nStructure: article + (adverbs/adjectives) + participle + noun\n\nThis is typical of academic, journalistic, and legal German.\n\nRefer to: Begegnungen B2 Kapitel 10, Geschäftliche Begegnungen B2',
      JSON.stringify([
        'der gestern veröffentlichte Artikel (the article published yesterday)',
        'die von allen bewunderte Künstlerin (the artist admired by everyone)',
        'das für morgen geplante Meeting (the meeting planned for tomorrow)',
        'ein in Deutschland produziertes Auto (a car produced in Germany)',
        'die seit Jahren diskutierte Frage (the question discussed for years)',
        'der vom Bundestag beschlossene Gesetzentwurf (the bill passed by the Bundestag)'
      ])
    ],

    // ==================== C1 LEVEL ====================
    [
      'Funktionsverbgefüge (Function Verb Constructions)',
      'C1',
      'Fixed verb-noun combinations',
      'Function verb constructions combine a noun with a "function verb" (often haben, sein, kommen, bringen, nehmen, etc.). They are very common in formal and administrative German.\n\nThe noun carries the main meaning, the verb loses its original meaning.\n\nRefer to: Begegnungen C1, DaF Kompakt Neu C1, Geschäftliche Begegnungen C1',
      JSON.stringify([
        'zur Sprache kommen = thematisiert werden (to be brought up)',
        'in Frage kommen = möglich sein (to be considered)',
        'zum Ausdruck bringen = ausdrücken (to express)',
        'in Betracht ziehen = überlegen (to consider)',
        'zur Verfügung stehen = verfügbar sein (to be available)',
        'Das Thema kam zur Sprache. (The topic was brought up.)',
        'Wir müssen alle Optionen in Betracht ziehen. (We must consider all options.)'
      ])
    ],
    [
      'Modalpartikeln (Modal Particles)',
      'C1',
      'Untranslatable particles expressing attitude',
      'Modal particles are short words that express the speaker\'s attitude, emotions, or emphasis. They are crucial for natural-sounding German but difficult to translate.\n\nCommon particles: doch, mal, ja, halt, eben, schon, etwa, bloß, eigentlich\n\nRefer to: Begegnungen C1, Advanced German Grammar Resources',
      JSON.stringify([
        'doch: Das ist doch klar! (That\'s obvious! - emphasis)',
        'mal: Komm mal her! (Come here! - softer command)',
        'ja: Du weißt ja, dass... (As you know... - shared knowledge)',
        'halt/eben: Das ist halt so. (That\'s just how it is. - acceptance)',
        'eigentlich: Was machst du eigentlich? (What are you actually doing? - curiosity)',
        'bloß: Wo ist er bloß? (Where on earth is he? - bewilderment)',
        'etwa: Du kommst doch nicht etwa zu spät? (You\'re not coming late, are you? - concern)'
      ])
    ],
    [
      'Konzessivsätze (Concessive Clauses)',
      'C1',
      'Expressing contrast and concession',
      'Concessive clauses express that something happens despite an obstacle or contrary expectation.\n\nConjunctions: obwohl, trotzdem, auch wenn, selbst wenn, wenngleich, wenn auch\n\nobwohl + verb at end (subordinate)\ntrotzdem + verb in 2nd position (coordinate)\n\nRefer to: Begegnungen C1, DaF Kompakt Neu C1',
      JSON.stringify([
        'Obwohl es regnet, gehe ich spazieren. (Although it\'s raining, I\'m going for a walk.)',
        'Es regnet. Trotzdem gehe ich spazieren. (It\'s raining. Nevertheless, I\'m going for a walk.)',
        'Auch wenn ich müde bin, arbeite ich weiter. (Even if I\'m tired, I\'ll continue working.)',
        'Selbst wenn du recht hast, ändert das nichts. (Even if you\'re right, that doesn\'t change anything.)',
        'Wenngleich die Aufgabe schwierig ist, ist sie lösbar. (Although the task is difficult, it is solvable.)'
      ])
    ],
    [
      'Irreale Bedingungssätze (Unreal Conditional)',
      'C1',
      'Complex hypothetical situations',
      'Expressing unreal or hypothetical conditions using Konjunktiv II.\n\nPresent unreal: Wenn ich Zeit hätte, würde ich...\nPast unreal: Wenn ich Zeit gehabt hätte, hätte ich...\n\nWithout "wenn": Hätte ich Zeit, würde ich... (more formal)\n\nRefer to: Begegnungen C1, DaF Kompakt Neu C1',
      JSON.stringify([
        'Wenn ich reich wäre, würde ich reisen. (If I were rich, I would travel.)',
        'Wenn ich das gewusst hätte, hätte ich anders gehandelt. (If I had known that, I would have acted differently.)',
        'Hätte ich mehr Zeit, würde ich ein Buch schreiben. (If I had more time, I would write a book.)',
        'Wäre ich an deiner Stelle, würde ich das nicht tun. (If I were in your place, I wouldn\'t do that.)',
        'Hätten wir früher angefangen, wären wir jetzt fertig. (If we had started earlier, we would be finished now.)'
      ])
    ],
  ];

  db.exec('BEGIN');
  for (const item of grammar) {
    insert.run(...item);
  }
  db.exec('COMMIT');
}

function insertSamplePrepositions() {
  const insert = db.prepare(`
    INSERT INTO prepositions (word, case_type, meaning, example, level)
    VALUES (?, ?, ?, ?, ?)
  `);

  const preps = [
    // A1 — basic prepositions
    ['in',     'Dativ/Akkusativ', 'in, into',          'Ich bin in der Schule.',              'A1'],
    ['aus',    'Dativ',           'from, out of',       'Ich komme aus Vietnam.',              'A1'],
    ['mit',    'Dativ',           'with',               'Ich fahre mit dem Bus.',              'A1'],
    ['von',    'Dativ',           'from, of',           'Das Buch ist von meinem Lehrer.',     'A1'],
    ['zu',     'Dativ',           'to',                 'Ich gehe zu meinem Freund.',          'A1'],
    ['nach',   'Dativ',           'to, after',          'Ich fahre nach Berlin.',              'A1'],
    ['bei',    'Dativ',           'at, near',           'Ich wohne bei meinen Eltern.',        'A1'],
    ['für',    'Akkusativ',       'for',                'Das Geschenk ist für dich.',          'A1'],

    // A2 — two-way & accusative prepositions
    ['auf',    'Dativ/Akkusativ', 'on, onto',           'Das Buch liegt auf dem Tisch.',       'A2'],
    ['an',     'Dativ/Akkusativ', 'at, on (vertical)',  'Das Bild hängt an der Wand.',         'A2'],
    ['über',   'Dativ/Akkusativ', 'over, above, about', 'Die Lampe hängt über dem Tisch.',     'A2'],
    ['unter',  'Dativ/Akkusativ', 'under',              'Die Katze sitzt unter dem Stuhl.',    'A2'],
    ['neben',  'Dativ/Akkusativ', 'next to',            'Ich sitze neben meiner Freundin.',    'A2'],
    ['vor',    'Dativ/Akkusativ', 'in front of, before','Wir treffen uns vor dem Kino.',       'A2'],
    ['hinter', 'Dativ/Akkusativ', 'behind',             'Der Garten ist hinter dem Haus.',     'A2'],
    ['zwischen','Dativ/Akkusativ','between',             'Der Park liegt zwischen zwei Straßen.','A2'],
    ['durch',  'Akkusativ',       'through',            'Wir gehen durch den Park.',           'A2'],
    ['ohne',   'Akkusativ',       'without',            'Ich gehe ohne meinen Bruder.',        'A2'],
    ['gegen',  'Akkusativ',       'against',            'Er fährt gegen die Wand.',            'A2'],
    ['um',     'Akkusativ',       'around, at (time)',  'Wir sitzen um den Tisch.',            'A2'],
    ['seit',   'Dativ',           'since, for',         'Ich lerne seit zwei Jahren Deutsch.',  'A2'],

    // B1 — genitive & advanced
    ['trotz',     'Genitiv',  'despite',            'Trotz des Regens gehen wir spazieren.',      'B1'],
    ['wegen',     'Genitiv',  'because of',         'Wegen des Wetters bleiben wir zu Hause.',    'B1'],
    ['während',   'Genitiv',  'during',             'Während des Unterrichts muss man leise sein.','B1'],
    ['statt',     'Genitiv',  'instead of',         'Statt eines Autos kaufe ich ein Fahrrad.',   'B1'],
    ['innerhalb', 'Genitiv',  'within',             'Innerhalb der Stadt gibt es viele Parks.',    'B1'],
    ['außerhalb', 'Genitiv',  'outside of',         'Außerhalb der Stadt ist es ruhiger.',         'B1'],
    ['gegenüber', 'Dativ',    'opposite, across',   'Die Apotheke ist gegenüber dem Bahnhof.',    'B1'],
    ['entlang',   'Akkusativ','along',              'Wir gehen den Fluss entlang.',               'B1'],
  ];

  db.exec('BEGIN');
  for (const item of preps) {
    insert.run(...item);
  }
  db.exec('COMMIT');
}

export default db;
