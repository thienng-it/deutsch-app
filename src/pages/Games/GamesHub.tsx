import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const games = [
  {
    to: '/games/flip-cards',
    icon: '🃏',
    title: 'Flip Cards',
    desc: 'Classic vocabulary flashcards. Flip to reveal the translation and rate how well you knew it.',
    tags: ['Vocabulary', 'All Levels'],
    accent: 'from-red-500/10 to-red-500/5 hover:border-red-400/50',
  },
  {
    to: '/games/multiple-choice',
    icon: '☑️',
    title: 'Multiple Choice',
    desc: 'Choose the correct translation from 4 options. Fast and effective for memorization.',
    tags: ['Vocabulary', 'Quiz'],
    accent: 'from-blue-500/10 to-blue-500/5 hover:border-blue-400/50',
  },
  {
    to: '/games/memory',
    icon: '🧠',
    title: 'Memory Cards',
    desc: 'Match German words with their English translations in this classic memory game.',
    tags: ['Vocabulary', 'Fun'],
    accent: 'from-purple-500/10 to-purple-500/5 hover:border-purple-400/50',
  },
  {
    to: '/games/scramble',
    icon: '🔀',
    title: 'Word Scramble',
    desc: 'Unscramble the letters to form the correct German word. Tests your spelling!',
    tags: ['Spelling', 'Writing'],
    accent: 'from-orange-500/10 to-orange-500/5 hover:border-orange-400/50',
  },
  {
    to: '/games/fill-blank',
    icon: '✍️',
    title: 'Fill in the Blank',
    desc: 'Complete German sentences by filling in the missing word. Tests contextual understanding.',
    tags: ['Grammar', 'Context'],
    accent: 'from-green-500/10 to-green-500/5 hover:border-green-400/50',
  },
  {
    to: '/games/speed',
    icon: '⚡',
    title: 'Speed Round',
    desc: 'Answer as many questions as possible in 60 seconds. Race against the clock!',
    tags: ['Speed', 'Challenge'],
    accent: 'from-amber-500/10 to-amber-500/5 hover:border-amber-400/50',
  },
];

export default function GamesHub() {
  const { user } = useAuth();
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          🎮 Games
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Practice German in a fun way · Level: <span className={`font-bold badge badge-${(user?.currentLevel ?? 'A1').toLowerCase()} ml-1`}>{user?.currentLevel}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map(g => (
          <Link
            key={g.to}
            to={g.to}
            className={`card bg-gradient-to-br ${g.accent} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group`}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.icon}</div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{g.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">{g.desc}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {g.tags.map(t => (
                <span key={t} className="badge bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">{t}</span>
              ))}
            </div>
            <div className="mt-4 text-sm text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 font-medium transition-colors">
              Play now →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
