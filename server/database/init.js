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
    [
      'Artikel (Articles)',
      'A1',
      'German articles: der, die, das',
      'German nouns have three genders: masculine (der), feminine (die), and neuter (das). The gender must be memorized with each noun.',
      JSON.stringify([
        'der Mann (the man)',
        'die Frau (the woman)',
        'das Kind (the child)',
        'der Tisch (the table)',
        'die Tür (the door)',
        'das Fenster (the window)'
      ])
    ],
    [
      'Personalpronomen (Personal Pronouns)',
      'A1',
      'German personal pronouns in nominative case',
      'Personal pronouns replace nouns. In German: ich (I), du (you informal), er/sie/es (he/she/it), wir (we), ihr (you plural), sie/Sie (they/you formal)',
      JSON.stringify([
        'Ich bin Student. (I am a student.)',
        'Du bist nett. (You are nice.)',
        'Er ist groß. (He is tall.)',
        'Wir lernen Deutsch. (We learn German.)'
      ])
    ],
    [
      'Präsens (Present Tense)',
      'A1',
      'Conjugation of regular verbs in present tense',
      'Regular verbs in German follow a pattern: remove -en and add endings: -e, -st, -t, -en, -t, -en',
      JSON.stringify([
        'ich lerne (I learn)',
        'du lernst (you learn)',
        'er/sie/es lernt (he/she/it learns)',
        'wir lernen (we learn)',
        'ihr lernt (you all learn)',
        'sie/Sie lernen (they/you formal learn)'
      ])
    ],
    [
      'Akkusativ (Accusative Case)',
      'A2',
      'The accusative case for direct objects',
      'The accusative case is used for direct objects. Only masculine articles change: der → den, ein → einen',
      JSON.stringify([
        'Ich sehe den Mann. (I see the man.)',
        'Ich habe einen Bruder. (I have a brother.)',
        'Ich esse das Brot. (I eat the bread.)',
        'Ich kaufe die Zeitung. (I buy the newspaper.)'
      ])
    ],
    [
      'Perfekt (Present Perfect)',
      'A2',
      'Past tense using haben/sein + past participle',
      'The perfect tense is formed with haben or sein + past participle. Most verbs use haben, but motion and state-change verbs use sein.',
      JSON.stringify([
        'Ich habe gelernt. (I have learned.)',
        'Er hat gegessen. (He has eaten.)',
        'Wir sind gegangen. (We have gone.)',
        'Sie ist gekommen. (She has come.)'
      ])
    ],
  ];

  db.exec('BEGIN');
  for (const item of grammar) {
    insert.run(...item);
  }
  db.exec('COMMIT');
}

export default db;
