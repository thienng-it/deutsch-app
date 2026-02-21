# 🇩🇪 DeutschApp — German Learning Platform

A personal German learning app with vocabulary flashcards, grammar lessons, reading practice, interactive games, and progress tracking. Built with React + Vite (frontend) and Express + SQLite (backend).

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Start both frontend & backend in one command
npm run dev:full
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

> On first run the database is created automatically in `data/deutsch-app.db` with sample vocabulary, grammar topics, and prepositions.

---

## Project Structure

```
deutsch-app/
├── server/                 # Express backend
│   ├── index.js            # Server entry point
│   ├── database/init.js    # SQLite schema + seed data
│   ├── middleware/auth.js   # Auth middleware (currently bypassed)
│   └── routes/
│       ├── auth.js         # Login / register
│       ├── content.js      # Vocabulary, grammar, prepositions, game data
│       ├── materials.js    # Browse audio/PDF files from Materials/ folder
│       ├── progress.js     # Learning progress & achievements
│       └── user.js         # User profile & leaderboard
├── src/                    # React frontend
│   ├── api/                # API client wrappers (axios)
│   ├── components/         # Shared components (Layout, Games, ErrorBoundary)
│   ├── contexts/           # React contexts (Auth, Theme)
│   ├── data/               # Static data (reading passages)
│   ├── pages/              # Page components
│   │   └── Games/          # 6 interactive games
│   └── types/              # TypeScript interfaces
├── Materials/              # German learning materials (audio, PDFs) — git-ignored
├── data/                   # SQLite database — git-ignored, auto-created
└── .env.example            # Environment variable template
```

---

## Available Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start Vite frontend only (port 5173)             |
| `npm run dev:server`| Start Express backend only (port 3000)           |
| `npm run dev:full`  | Start both frontend + backend together           |
| `npm run build`     | Build frontend for production (outputs to `dist/`)|
| `npm start`         | Start production server (serves `dist/` + API)   |

---

## Features

### 📚 Learning Content
- **Vocabulary** — Browse, search, filter, and add words (A1–C1)
- **Grammar** — 20+ grammar topics with explanations and examples
- **Prepositions** — Cases, meanings, and example sentences
- **Reading** — 13 reading passages with interactive comprehension questions

### 🎮 Games (6 types)
- **Flip Cards** — Flashcard-style vocabulary review with self-rating
- **Multiple Choice** — Choose the correct translation (DE↔EN)
- **Memory Cards** — Match German–English word pairs
- **Word Scramble** — Unscramble letters to form German words
- **Fill in the Blank** — Complete sentences with the missing word
- **Speed Round** — 60-second timed vocabulary quiz

### 📊 Progress Tracking
- Learning session logging with scores
- Vocabulary mastery per level
- Achievement system (badges for milestones)
- Performance analysis on dashboard

### 📂 Materials Browser
- Browse audio files and PDFs from your `Materials/` folder
- Supports nested folder structures (textbooks, CDs, etc.)

---

## Adding More Data

### Add vocabulary
Use the **"+ Add Word"** button on the Vocabulary page, or insert directly into the database:
```sql
INSERT INTO vocabulary (german, english, level, category, example_sentence)
VALUES ('Beispiel', 'Example', 'A1', 'Basic', 'Das ist ein Beispiel.');
```

### Add grammar topics
Insert into the `grammar_topics` table. The `examples` column is a JSON array:
```sql
INSERT INTO grammar_topics (title, level, description, content, examples)
VALUES ('Topic Title', 'A1', 'Short description', 'Full explanation...', '["Example 1","Example 2"]');
```

### Add prepositions
```sql
INSERT INTO prepositions (word, case_type, meaning, example, level)
VALUES ('ab', 'Dativ', 'from (time/place)', 'Ab morgen lerne ich mehr.', 'B1');
```

### Add reading passages
Edit `src/data/reading.ts` and add a new entry to the array. Each passage includes:
- German text, level, category
- Interactive questions (multiple choice, fill-blank, true/false, etc.)

### Add learning materials
Drop audio files (`.mp3`, `.wav`, `.ogg`, `.m4a`) or PDFs into the `Materials/` folder. They will appear automatically in the Materials browser.

---

## Environment Variables

See `.env.example` for all options:

| Variable                   | Default        | Description                        |
| -------------------------- | -------------- | ---------------------------------- |
| `PORT`                     | `3000`         | Backend server port                |
| `NODE_ENV`                 | `development`  | Environment mode                   |
| `JWT_SECRET`               | —              | Secret for JWT tokens              |
| `DB_PATH`                  | `./data/deutsch-app.db` | SQLite database path      |
| `MAX_USERS`                | `2`            | Max allowed user accounts          |
| `RATE_LIMIT_WINDOW_MS`     | `900000`       | Rate limit window (15 min)         |
| `RATE_LIMIT_MAX_REQUESTS`  | `100`          | Max requests per window            |

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Express, Node.js built-in SQLite (`node:sqlite`), bcrypt, JWT
- **Database:** SQLite (zero-config, file-based)

---

## License

See [LICENSE](LICENSE) for details.