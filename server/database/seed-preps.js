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

console.log('🗑️  Dropping old prepositions table...');
db.exec('DROP TABLE IF EXISTS prepositions');

console.log('🏗️  Recreating prepositions table...');
db.exec(`
  CREATE TABLE prepositions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    case_type TEXT NOT NULL,
    meaning TEXT NOT NULL,
    example TEXT NOT NULL,
    level TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const insert = db.prepare(`
  INSERT INTO prepositions (word, case_type, meaning, example, level)
  VALUES (?, ?, ?, ?, ?)
`);

const preps = [
    // ================= A1 LEVEL (Basic Dative and Accusative) =================
    ['aus', 'Dativ', 'from, out of (origin, material)', 'Sie kommt aus Deutschland.', 'A1'],
    ['bei', 'Dativ', 'at, near, with (location, staying with)', 'Ich wohne noch bei meinen Eltern.', 'A1'],
    ['mit', 'Dativ', 'with (instrument, companion)', 'Ich fahre immer mit dem Bus zur Arbeit.', 'A1'],
    ['nach', 'Dativ', 'after, to (cities, countries, home)', 'Nach der Arbeit gehe ich nach Hause.', 'A1'],
    ['seit', 'Dativ', 'since, for (time duration starting in past)', 'Wir leben seit drei Jahren in Berlin.', 'A1'],
    ['von', 'Dativ', 'from, of (possession, origin)', 'Das ist ein Geschenk von meiner Tante.', 'A1'],
    ['zu', 'Dativ', 'to (people, places within a city)', 'Ich gehe jetzt zum Arzt.', 'A1'],
    ['für', 'Akkusativ', 'for (purpose, recipient)', 'Dieses schöne Geschenk ist für dich.', 'A1'],
    ['ohne', 'Akkusativ', 'without', 'Möchtest du den Kaffee mit oder ohne Zucker?', 'A1'],
    ['in', 'Dativ/Akkusativ', 'in, into', 'Wir lernen Deutsch in der Schule.', 'A1'], // Kept basic for A1

    // ================= A2 LEVEL (Wechselpräpositionen & More Acc/Dat) =================
    ['durch', 'Akkusativ', 'through (location, means)', 'Wir spazieren durch den schönen Park.', 'A2'],
    ['gegen', 'Akkusativ', 'against, around (time)', 'Das Auto fuhr gegen den Baum.', 'A2'],
    ['um', 'Akkusativ', 'around, at (time)', 'Der Unterricht beginnt um 8 Uhr.', 'A2'],
    ['bis', 'Akkusativ', 'until, to, up to', 'Der Zug fährt nur bis München.', 'A2'],
    ['an', 'Dativ/Akkusativ', 'at, on (vertical surface, boundary)', 'Das Bild hängt an der Wand.', 'A2'],
    ['auf', 'Dativ/Akkusativ', 'on, onto (horizontal surface)', 'Dein Buch liegt auf dem Tisch.', 'A2'],
    ['hinter', 'Dativ/Akkusativ', 'behind', 'Mein Fahrrad steht hinter dem Haus.', 'A2'],
    ['in', 'Dativ/Akkusativ', 'in, into (Wechselpräposition)', 'Ich gehe in die Küche (Akk). Ich bin in der Küche (Dat).', 'A2'],
    ['neben', 'Dativ/Akkusativ', 'next to, beside', 'Die Bank ist direkt neben der Post.', 'A2'],
    ['über', 'Dativ/Akkusativ', 'over, above, across, about', 'Die Lampe hängt über dem Esstisch.', 'A2'],
    ['unter', 'Dativ/Akkusativ', 'under, below, among', 'Der Hund schläft unter dem Sofa.', 'A2'],
    ['vor', 'Dativ/Akkusativ', 'in front of, before, ago', 'Wir treffen uns vor dem Kino.', 'A2'],
    ['zwischen', 'Dativ/Akkusativ', 'between', 'Das Sofa steht zwischen dem Sessel und dem Schrank.', 'A2'],
    ['ausgenommen', 'Akkusativ', 'except (for), excluding', 'Alle haben bestanden, ihn ausgenommen.', 'A2'],

    // ================= B1 LEVEL (Genitive & Advanced Dat/Acc) =================
    ['trotz', 'Genitiv', 'despite, in spite of', 'Trotz des schlechten Wetters gehen wir spazieren.', 'B1'],
    ['wegen', 'Genitiv', 'because of', 'Wegen des Regens fällt das Spiel aus.', 'B1'],
    ['während', 'Genitiv', 'during', 'Während des Urlaubs habe ich viel gelesen.', 'B1'],
    ['statt', 'Genitiv', 'instead of (also: anstelle)', 'Statt eines Autos kaufe ich mir lieber ein Fahrrad.', 'B1'],
    ['innerhalb', 'Genitiv', 'inside of, within (time or space)', 'Bitte überweisen Sie den Betrag innerhalb einer Woche.', 'B1'],
    ['außerhalb', 'Genitiv', 'outside of', 'Wir wohnen etwas außerhalb der großen Stadt.', 'B1'],
    ['gegenüber', 'Dativ', 'opposite, across from (usually follows noun)', 'Die Apotheke liegt dem Bahnhof gegenüber.', 'B1'],
    ['entlang', 'Akkusativ / Dativ', 'along (Acc when following noun, Dat/Gen when preceding)', 'Wir gehen den Fluss entlang.', 'B1'],
    ['außer', 'Dativ', 'except, besides, out of', 'Außer mir war niemand pünktlich.', 'B1'],
    ['ab', 'Dativ', 'from, starting at (time, location)', 'Ab nächster Woche habe ich endlich Urlaub.', 'B1'],
    ['dank', 'Dativ / Genitiv', 'thanks to', 'Dank deiner Hilfe haben wir es geschafft.', 'B1'],

    // ================= B2 / C1 LEVEL (Formal, Academic, Administrative) =================
    ['aufgrund', 'Genitiv', 'due to, based on', 'Aufgrund der aktuellen Situation bleibt das Geschäft geschlossen.', 'B2'],
    ['infolge', 'Genitiv', 'as a result of, due to', 'Infolge des Unfalls gab es einen langen Stau.', 'B2'],
    ['bezüglich', 'Genitiv', 'regarding, concerning', 'Bezüglich Ihrer Anfrage teilen wir Ihnen Folgendes mit.', 'B2'],
    ['hinsichtlich', 'Genitiv', 'with regard to, concerning', 'Hinsichtlich der Qualität gibt es keine Bedenken.', 'B2'],
    ['laut', 'Genitiv / Dativ', 'according to', 'Laut dem aktuellen Wetterbericht soll es morgen regnen.', 'B2'],
    ['gemäß', 'Dativ', 'according to, in accordance with', 'Wir handeln gemäß den geltenden Vorschriften.', 'B2'],
    ['zufolge', 'Dativ', 'according to (always follows the noun)', 'Einem Bericht zufolge steigt die Arbeitslosigkeit.', 'B2'],
    ['zwecks', 'Genitiv', 'for the purpose of', 'Zwecks besserer Planung bitten wir um frühzeitige Anmeldung.', 'B2'],
    ['mangels', 'Genitiv', 'for lack of', 'Mangels ausreichender Beweise wurde der Angeklagte freigesprochen.', 'C1'],
    ['anlässlich', 'Genitiv', 'on the occasion of', 'Anlässlich seines 50. Geburtstags gab es ein großes Fest.', 'C1'],
    ['mithilfe', 'Genitiv', 'with the help of', 'Mithilfe eines Experten konnte das Problem gelöst werden.', 'C1'],
    ['unweit', 'Genitiv', 'not far from', 'Das Hotel befindet sich unweit des Hauptbahnhofs.', 'C1'],
    ['inmitten', 'Genitiv', 'in the middle of, amid', 'Die kleine Hütte liegt inmitten eines dichten Waldes.', 'C1'],
    ['zugunsten', 'Genitiv', 'in favor of, for the benefit of', 'Der Erlös des Konzerts geht zugunsten von Straßenkindern.', 'C1'],
    ['zulasten', 'Genitiv', 'to the detriment of, at the expense of', 'Die neuen Steuern gehen zulasten der Arbeitnehmer.', 'C1']
];

console.log('🌱  Seeding detailed prepositions into the database...');
db.exec('BEGIN');
let count = 0;
for (const item of preps) {
    insert.run(...item);
    count++;
}
db.exec('COMMIT');

console.log(`✅ Successfully seeded ${count} detailed prepositions into the database!`);
process.exit(0);
