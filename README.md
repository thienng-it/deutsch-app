# 🇩🇪 DeutschApp — German Learning Platform

A full-stack German learning app with vocabulary flashcards, grammar lessons, reading practice, interactive games, and progress tracking. Built with **React + Vite** on the frontend and **Express + SQLite** on the backend.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env

# 3. Seed vocabulary data (run once)
npm run seed:vocab

# 4. Start both frontend & backend
npm run dev:full
```

- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:3000

> The database is created automatically at `data/deutsch-app.db` on first run with grammar topics, prepositions, and seed vocabulary.

---

## Project Structure

```
deutsch-app/
├── server/                      # Express backend
│   ├── index.js                 # Server entry, middleware, rate limiting
│   ├── database/
│   │   ├── init.js              # SQLite schema + seed data (grammar, prepositions)
│   │   └── seed-vocab.js        # Vocabulary seeder (run via npm run seed:vocab)
│   ├── middleware/auth.js        # JWT authentication middleware
│   └── routes/
│       ├── auth.js              # Login / register
│       ├── content.js           # Vocabulary, grammar, prepositions, game sets
│       ├── materials.js         # Browse Materials/ folder (audio, PDFs)
│       ├── progress.js          # Learning sessions & progress tracking
│       └── user.js              # User profile & leaderboard
├── src/                         # React frontend (TypeScript)
│   ├── api/                     # Axios API clients (auth, content, progress)
│   ├── components/
│   │   ├── Games/               # GameSetup + GameOver shared components
│   │   └── Layout/              # Navbar, Sidebar, BottomNav, Layout wrapper
│   ├── contexts/                # AuthContext, ThemeContext (dark/light mode)
│   ├── data/reading.ts          # Static reading passages (A1–C1)
│   ├── pages/
│   │   ├── Dashboard.tsx        # Overview: stats, progress, quick-play, activity
│   │   ├── Vocabulary.tsx       # Topic hub with search + word counts
│   │   ├── VocabularyTopic.tsx  # Word browser: grid/list, filters, modals
│   │   ├── Grammar.tsx          # Grammar topics with level filter + detail modal
│   │   ├── Reading.tsx          # Reading passages with split-pane + questions
│   │   ├── Prepositions.tsx     # Preposition cards with case-type colour coding
│   │   ├── Alphabet.tsx         # A–Z + Umlaute with TTS audio playback
│   │   ├── Numbers.tsx          # Number sections (0–12, teens, tens, big) + TTS
│   │   ├── Speaking.tsx         # Coming Soon placeholder
│   │   ├── Writing.tsx          # Coming Soon placeholder
│   │   └── Games/               # 6 interactive game pages
│   └── types/index.ts           # Shared TypeScript interfaces & constants
├── public/                      # Static assets
├── Materials/                   # Learning materials (audio/PDFs) — git-ignored
├── data/                        # SQLite database — git-ignored, auto-created
├── dist/                        # Production build output — git-ignored
└── .env.example                 # Environment variable template
```

---

## Available Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Start Vite dev server only (port 5173)            |
| `npm run dev:server` | Start Express API server only (port 3000)         |
| `npm run dev:full`   | Start both frontend + backend concurrently        |
| `npm run build`      | Production build → `dist/`                        |
| `npm start`          | Run production server (serves `dist/` + API)      |
| `npm run seed:vocab` | Seed the vocabulary table from the seed script    |

---

## Features

### 📚 Learning Pages
| Page | Description |
|---|---|
| **Dashboard** | Welcome banner, stats, level progress bars, quick-play game grid, performance analysis, recent activity |
| **Vocabulary** | Topic/category hub with per-topic word counts, search |
| **Vocabulary Topic** | Word browser: search, level filters, grid/list toggle, word detail modal, add-word modal |
| **Grammar** | 20+ grammar topics, level filter, detail modal with content + examples |
| **Reading** | 13 passages (A1–C1), category/level filters, split-pane reader + interactive questions |
| **Prepositions** | Preposition cards with case-type colour coding (Akkusativ, Dativ, Genitiv, Wechsel) |
| **Alphabet** | German A–Z + Ä Ö Ü ß with phonetics, example words, and TTS audio playback |
| **Numbers** | 0–12, teens, tens, compound numbers, large numbers — all with TTS audio |

### 🎮 Games (6 types)
| Game | Mechanic |
|---|---|
| **Flip Cards** | Flashcard review — flip + self-rate (Easy / Medium / Hard) |
| **Multiple Choice** | 4-option translation quiz (DE→EN or EN→DE) |
| **Memory Cards** | Match German–English word pairs on a grid |
| **Word Scramble** | Reorder scrambled letters to form the German word |
| **Fill in the Blank** | Type the missing word in a German sentence |
| **Speed Round** | 60-second timed multiple-choice blitz |

All games share a unified **GameSetup** (level + count picker) and **GameOver** (score, accuracy, breakdown) screen.

### 📊 Progress & Analysis
- Per-session score logging with duration and item count
- Vocabulary mastery per CEFR level (A1–C1) with progress bars
- Strongest/weakest level detection on Dashboard
- Weakest game-type detection → practice suggestions
- Achievement badge system (milestones)

### 🎨 Design System
All pages use a unified Tailwind CSS design language:
- **Light / Dark mode** with `dark:` modifier classes + `ThemeContext`
- **Component classes:** `.card`, `.card-hover`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.badge`, `.badge-a1`–`.badge-c1`, `.input`
- **Animations:** `animate-fade-in`, `animate-bounce-in`, `animate-shake`
- **Page structure:** `space-y-8 animate-fade-in`, `text-3xl sm:text-4xl font-extrabold`

---

## API Endpoints

### Authentication
| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user |

### Content
| Method | Path | Description |
|---|---|---|
| GET | `/api/content/vocabulary` | List vocabulary (filter: `level`, `category`, `search`) |
| GET | `/api/content/vocabulary/categories` | List unique category names |
| GET | `/api/content/vocabulary/categories-with-counts` | Categories with word count each |
| GET | `/api/content/vocabulary/levels` | Available CEFR levels in DB |
| GET | `/api/content/vocabulary/game-set` | Random vocab set for games |
| POST | `/api/content/vocabulary` | Add a new vocabulary word |
| GET | `/api/content/grammar` | List grammar topics (filter: `level`) |
| GET | `/api/content/grammar/:id` | Get single grammar topic |
| GET | `/api/content/prepositions` | List prepositions (filter: `level`) |

### Progress
| Method | Path | Description |
|---|---|---|
| GET | `/api/progress/summary` | Full dashboard summary (vocab by level, sessions, stats) |
| POST | `/api/progress/update` | Update word mastery score |
| POST | `/api/progress/session` | Log a completed game session |

---

## Adding More Data

### Add vocabulary
Use the **"+ Add Word"** button on any Vocabulary Topic page, or insert directly:
```sql
INSERT INTO vocabulary (german, english, level, category, example_sentence, part_of_speech)
VALUES ('Beispiel', 'Example', 'A1', 'Basic', 'Das ist ein Beispiel.', 'noun');
```

### Add grammar topics
```sql
INSERT INTO grammar_topics (title, level, description, content, examples)
VALUES ('Topic Title', 'A1', 'Short description', 'Full explanation text',
        '["Ich bin müde.", "Du bist schnell."]');
```

### Add prepositions
```sql
INSERT INTO prepositions (word, case_type, meaning, example, level)
VALUES ('ab', 'Dativ', 'from (time/place)', 'Ab morgen lerne ich mehr.', 'B1');
```

### Add reading passages
Edit `src/data/reading.ts` and add an entry. Each passage supports:
- German text with level + category metadata
- Questions: `multiple-choice`, `fill-blank`, `true-false`, `short-answer`

### Add learning materials
Drop `.mp3`, `.wav`, `.ogg`, `.m4a` or `.pdf` files into `Materials/`. They appear automatically in the Materials browser via the `/api/materials` route.

---

## Environment Variables

See `.env.example` for all options:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Backend server port |
| `NODE_ENV` | `development` | Environment mode |
| `JWT_SECRET` | — | Secret for signing JWT tokens |
| `DB_PATH` | `./data/deutsch-app.db` | SQLite database file path |
| `MAX_USERS` | `2` | Maximum allowed user registrations |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window in ms (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | `500` | Max requests per window per IP |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18, TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 (JIT), PostCSS |
| Routing | React Router 6 |
| HTTP client | Axios |
| Backend | Express 4, Node.js |
| Database | Node.js built-in `node:sqlite` (zero-config) |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |
| Dev tooling | Nodemon, Concurrently, TypeScript |

---

## License

See [LICENSE](LICENSE) for details.