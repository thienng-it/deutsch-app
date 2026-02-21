import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { progressApi } from '../api/progress';

import type { ProgressSummary } from '../types';
import { LEVEL_COLORS } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressApi.getSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

  // Performance Analysis derived data
  const vocabLevels = summary?.vocabByLevel || [];
  const strongestLevel = vocabLevels.length > 0
    ? vocabLevels.reduce((prev, curr) => (curr.mastered / (curr.total || 1)) > (prev.mastered / (prev.total || 1)) ? curr : prev)
    : null;

  const weakestLevel = vocabLevels.length > 0
    ? vocabLevels.reduce((prev, curr) => (curr.mastered / (curr.total || 1)) < (prev.mastered / (prev.total || 1)) ? curr : prev)
    : null;

  const gameStats = summary?.gameStats || [];
  const weakestGame = gameStats.length > 0
    ? gameStats.reduce((prev, curr) => curr.avg_score < prev.avg_score ? curr : prev)
    : null;


  const totalVocab = summary?.vocabByLevel.reduce((s, v) => s + v.total, 0) ?? 0;
  const totalMaster = summary?.vocabByLevel.reduce((s, v) => s + v.mastered, 0) ?? 0;
  const pct = totalVocab > 0 ? Math.round((totalMaster / totalVocab) * 100) : 0;

  const gameCards = [
    { to: '/games/flip-cards', icon: '🃏', title: 'Flip Cards', desc: 'Classic vocabulary flip cards' },
    { to: '/games/multiple-choice', icon: '☑️', title: 'Multiple Choice', desc: 'Test your knowledge' },
    { to: '/games/memory', icon: '🧠', title: 'Memory Cards', desc: 'Match pairs to win' },
    { to: '/games/scramble', icon: '🔀', title: 'Word Scramble', desc: 'Unscramble the letters' },
    { to: '/games/fill-blank', icon: '✍️', title: 'Fill in Blank', desc: 'Complete the sentence' },
    { to: '/games/speed', icon: '⚡', title: 'Speed Round', desc: '60-second vocabulary sprint' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-spin">🇩🇪</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Guten Tag, <span className="text-red-500">{user?.displayName}</span>! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Current level: <span className={`font-bold ${LEVEL_COLORS[user?.currentLevel ?? 'A1']}`}>{user?.currentLevel}</span>
          </p>
        </div>
      </div>



      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '📚', label: 'Words Studied', value: totalVocab, color: 'text-blue-400' },
          { icon: '✅', label: 'Words Mastered', value: totalMaster, color: 'text-green-400' },
          { icon: '🎮', label: 'Total Sessions', value: summary?.recentSessions.length ?? 0, color: 'text-yellow-400' },
          { icon: '🏆', label: 'Total Score', value: summary?.totalScore ?? 0, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress by level */}
      {summary && summary.vocabByLevel.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">📊 Vocabulary by Level</h2>
          <div className="space-y-3">
            {summary.vocabByLevel.map(({ level, total, mastered }) => {
              const p = total > 0 ? Math.round((mastered / total) * 100) : 0;
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className={`w-8 text-xs font-bold ${LEVEL_COLORS[level]}`}>{level}</span>
                  <div className="flex-1 progress-bar">
                    <div
                      className="progress-fill bg-gradient-to-r from-red-600 to-yellow-500"
                      style={{ width: `${p}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-20 text-right">
                    {mastered}/{total} ({p}%)
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-right">
            <span className="text-sm text-gray-400">Overall: </span>
            <span className="text-sm font-bold text-yellow-400">{pct}% mastered</span>
          </div>
        </div>
      )}

      {/* 2-col: games + leaderboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Games grid */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">🎮 Quick Play</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {gameCards.map(g => (
              <Link key={g.to} to={g.to} className="card-hover group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{g.icon}</div>
                <div className="font-semibold text-white text-sm">{g.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{g.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Analysis */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">📈 Performance Analysis</h2>
          <div className="card space-y-4">
            {summary ? (
              <>
                <div className="space-y-1">
                  <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Strongest Level</span>
                  <p className="text-white text-sm">
                    {strongestLevel ? (
                      <>You are mastering <span className={`font-bold ${LEVEL_COLORS[strongestLevel.level]}`}>{strongestLevel.level}</span> vocabulary extremely well!</>
                    ) : (
                      <span className="text-gray-500">Not enough data.</span>
                    )}
                  </p>
                </div>

                <div className="h-px bg-gray-800" />

                <div className="space-y-1">
                  <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">Level to Focus On</span>
                  <p className="text-white text-sm">
                    {weakestLevel && weakestLevel !== strongestLevel ? (
                      <>Spend more time reviewing <span className={`font-bold ${LEVEL_COLORS[weakestLevel.level]}`}>{weakestLevel.level}</span> words to bring it up to speed.</>
                    ) : (
                      <span className="text-gray-500">Keep practicing to find your weak spots!</span>
                    )}
                  </p>
                </div>

                <div className="h-px bg-gray-800" />

                <div className="space-y-1">
                  <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Needs Practice</span>
                  <p className="text-white text-sm">
                    {weakestGame ? (
                      <>Your average score in <span className="font-bold text-gray-300 capitalize">{weakestGame.session_type.replace('-', ' ')}</span> is lower than others. Try another round!</>
                    ) : (
                      <span className="text-gray-500">Play some games to see suggestions here.</span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Not enough data to analyze yet. Start learning!</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      {summary && summary.recentSessions.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">🕐 Recent Activity</h2>
          <div className="space-y-2">
            {summary.recentSessions.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <span className="text-gray-500 text-xs w-32 shrink-0">
                  {new Date(s.started_at).toLocaleDateString()}
                </span>
                <span className="text-gray-300 font-medium capitalize flex-1">{s.session_type.replace('-', ' ')}</span>
                <span className="text-yellow-400 font-bold">{s.score} pts</span>
                <span className="text-gray-600">{s.items_practiced} items</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
