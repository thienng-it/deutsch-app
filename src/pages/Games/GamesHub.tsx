import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const games = [
  {
    to: '/games/flip-cards',
    icon: '🃏',
    title: 'Flip Cards',
    desc: 'Classic vocabulary flashcards. Flip to reveal the translation and rate how well you knew it.',
    tags: ['Vocabulary', 'All Levels'],
    color: 'from-red-900/40 to-red-800/20 border-red-700/30',
  },
  {
    to: '/games/multiple-choice',
    icon: '☑️',
    title: 'Multiple Choice',
    desc: 'Choose the correct translation from 4 options. Fast and effective for memorization.',
    tags: ['Vocabulary', 'Quiz'],
    color: 'from-blue-900/40 to-blue-800/20 border-blue-700/30',
  },
  {
    to: '/games/memory',
    icon: '🧠',
    title: 'Memory Cards',
    desc: 'Match German words with their English translations in this classic memory game.',
    tags: ['Vocabulary', 'Fun'],
    color: 'from-purple-900/40 to-purple-800/20 border-purple-700/30',
  },
  {
    to: '/games/scramble',
    icon: '🔀',
    title: 'Word Scramble',
    desc: 'Unscramble the letters to form the correct German word. Tests your spelling!',
    tags: ['Spelling', 'Writing'],
    color: 'from-orange-900/40 to-orange-800/20 border-orange-700/30',
  },
  {
    to: '/games/fill-blank',
    icon: '✍️',
    title: 'Fill in the Blank',
    desc: 'Complete German sentences by filling in the missing word. Tests contextual understanding.',
    tags: ['Grammar', 'Context'],
    color: 'from-green-900/40 to-green-800/20 border-green-700/30',
  },
  {
    to: '/games/speed',
    icon: '⚡',
    title: 'Speed Round',
    desc: 'Answer as many questions as possible in 60 seconds. Race against the clock!',
    tags: ['Speed', 'Challenge'],
    color: 'from-yellow-900/40 to-yellow-800/20 border-yellow-700/30',
  },
];

export default function GamesHub() {
  const { user } = useAuth();
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🎮 Games</h1>
        <p className="text-gray-400 text-sm mt-1">
          Practice German in a fun way · Current level: <span className="text-yellow-400 font-semibold">{user?.currentLevel}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map(g => (
          <Link
            key={g.to}
            to={g.to}
            className={`card border bg-gradient-to-br ${g.color} hover:scale-[1.02] transition-all group`}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.icon}</div>
            <h2 className="text-lg font-bold text-white">{g.title}</h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{g.desc}</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {g.tags.map(t => (
                <span key={t} className="badge bg-gray-800/80 text-gray-400 border-gray-700">{t}</span>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Play now →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
