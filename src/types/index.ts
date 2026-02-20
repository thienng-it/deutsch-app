// ── User & Auth ────────────────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  displayName: string;
  currentLevel: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

// ── Vocabulary ─────────────────────────────────────────────────────────────
export interface VocabItem {
  id: number;
  german: string;
  english: string;
  level: string;
  category: string | null;
  example_sentence: string | null;
  audio_path: string | null;
  image_path: string | null;
}

// ── Grammar ────────────────────────────────────────────────────────────────
export interface GrammarTopic {
  id: number;
  title: string;
  level: string;
  description: string;
  content?: string;
  examples?: string[];
  exercises?: string[];
}

// ── Lesson ─────────────────────────────────────────────────────────────────
export interface Lesson {
  id: number;
  title: string;
  level: string;
  category: string | null;
  description: string | null;
  content: string | null;
  audio_path: string | null;
  pdf_path: string | null;
  order_index: number | null;
}

// ── Progress ───────────────────────────────────────────────────────────────
export interface ProgressItem {
  id: number;
  user_id: number;
  content_type: string;
  content_id: string;
  level: string;
  score: number;
  attempts: number;
  completed: boolean;
  last_practiced: string;
}

export interface ProgressSummary {
  vocabByLevel: { level: string; total: number; mastered: number }[];
  recentSessions: LearningSession[];
  streakData: { day: string; sessions: number }[];
  totalScore: number;
  gameStats: { session_type: string; count: number; avg_score: number }[];
}

export interface LearningSession {
  id: number;
  user_id: number;
  session_type: string;
  duration: number;
  score: number;
  items_practiced: number;
  started_at: string;
  ended_at: string;
}

export interface Achievement {
  id: number;
  user_id: number;
  achievement_type: string;
  achievement_name: string;
  earned_at: string;
}

// ── Games ──────────────────────────────────────────────────────────────────
export type GameType =
  | 'flip-cards'
  | 'multiple-choice'
  | 'memory-cards'
  | 'word-scramble'
  | 'fill-in-blank'
  | 'speed-round'
  | 'listening-quiz';

export interface GameConfig {
  level: string;
  category?: string;
  count: number;
}

export interface GameResult {
  sessionType: string;
  score: number;
  total: number;
  duration: number;
  itemsPracticed: number;
}

// ── Materials ──────────────────────────────────────────────────────────────
export interface MaterialNode {
  type: 'folder' | 'audio' | 'pdf';
  name: string;
  path: string;
  url?: string;
  size?: number;
  ext?: string;
  children?: MaterialNode[];
}

// ── Leaderboard ────────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  id: number;
  displayName: string;
  currentLevel: string;
  totalSessions: number;
  totalScore: number;
  itemsMastered: number;
  isCurrentUser: boolean;
}

// ── Levels ─────────────────────────────────────────────────────────────────
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;
export type Level = typeof LEVELS[number];

export const LEVEL_COLORS: Record<string, string> = {
  A1: 'text-green-400',
  A2: 'text-teal-400',
  B1: 'text-blue-400',
  B2: 'text-purple-400',
  C1: 'text-orange-400',
};

export const LEVEL_BG: Record<string, string> = {
  A1: 'bg-green-900/40 border-green-700/50',
  A2: 'bg-teal-900/40 border-teal-700/50',
  B1: 'bg-blue-900/40 border-blue-700/50',
  B2: 'bg-purple-900/40 border-purple-700/50',
  C1: 'bg-orange-900/40 border-orange-700/50',
};
