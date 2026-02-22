import { DatabaseSync } from 'node:sqlite';
try {
    const db = new DatabaseSync('./data/deutsch-app.db');
    console.log('Tables:', db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
    console.log('Columns in vocabulary:', db.prepare("PRAGMA table_info(vocabulary)").all());
    const item = db.prepare("SELECT * FROM vocabulary LIMIT 1").get();
    console.log('First Item:', item);
} catch (e) {
    console.error(e);
}
