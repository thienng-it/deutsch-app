import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { progressApi } from '../api/progress';
import type { ProgressSummary } from '../types';

const LEVEL_BADGE: Record<string, string> = {
  A1: 'badge-a1', A2: 'badge-a2', B1: 'badge-b1', B2: 'badge-b2', C1: 'badge-c1',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    progressApi.getSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  }, []);

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

  const totalVocab = vocabLevels.reduce((s, v) => s + v.total, 0);
  const totalMaster = vocabLevels.reduce((s, v) => s + v.mastered, 0);
  const pct = totalVocab > 0 ? Math.round((totalMaster / totalVocab) * 100) : 0;

  const gameCards = [
    { to: '/games/flip-cards', icon: '🃏', title: 'Flip Cards', desc: 'Classic vocabulary flashcards', accent: 'from-red-500/10 to-red-500/5' },
    { to: '/games/multiple-choice', icon: '☑️', title: 'Multiple Choice', desc: 'Test your knowledge', accent: 'from-blue-500/10 to-blue-500/5' },
    { to: '/games/memory', icon: '🧠', title: 'Memory Cards', desc: 'Match pairs to win', accent: 'from-purple-500/10 to-purple-500/5' },
    { to: '/games/scramble', icon: '🔀', title: 'Word Scramble', desc: 'Unscramble the letters', accent: 'from-orange-500/10 to-orange-500/5' },
    { to: '/games/fill-blank', icon: '✍️', title: 'Fill in Blank', desc: 'Complete the sentence', accent: 'from-green-500/10 to-green-500/5' },
    { to: '/games/speed', icon: '⚡', title: 'Speed Round', desc: '60-second sprint', accent: 'from-yellow-500/10 to-yellow-500/5' },
  ];

  const quickLinks = [
    { to: '/vocabulary', icon: '📚', label: 'Vocabulary' },
    { to: '/grammar', icon: '✏️', label: 'Grammar' },
    { to: '/reading', icon: '📖', label: 'Reading' },
    { to: '/prepositions', icon: '📍', label: 'Prepositions' },
    { to: '/alphabet', icon: '🔤', label: 'Alphabet' },
    { to: '/numbers', icon: '🔢', label: 'Numbers' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-5xl animate-bounce-in">🇩🇪</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Welcome ────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute -right-6 -top-6 text-[120px] opacity-10 select-none pointer-events-none">🇩🇪</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Guten Tag, {user?.displayName}! 👋
        </h1>
        <p className="mt-2 text-red-100 text-sm sm:text-base">
          Current level: <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md ml-1">{user?.currentLevel}</span>
        </p>
        {totalVocab > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm font-bold whitespace-nowrap">{pct}% mastered</span>
          </div>
        )}
      </div>

      {/* ── Stats row ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: '📚', label: 'Words Studied', value: totalVocab, accent: 'text-blue-600 dark:text-blue-400' },
          { icon: '✅', label: 'Mastered', value: totalMaster, accent: 'text-green-600 dark:text-green-400' },
          { icon: '🎮', label: 'Sessions', value: summary?.recentSessions.length ?? 0, accent: 'text-amber-600 dark:text-amber-400' },
          { icon: '🏆', label: 'Total Score', value: summary?.totalScore ?? 0, accent: 'text-red-600 dark:text-red-400' },
        ].map(s => (
          <div key={s.label} className="card text-center py-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-extrabold ${s.accent}`}>{s.value.toLocaleString()}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Quick Links ────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">📖 Continue Learning</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {quickLinks.map(l => (
            <Link key={l.to} to={l.to}
              className="card text-center py-3 px-2 hover:border-red-500/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{l.icon}</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{l.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Vocab by Level ─────────────────────────────────── */}
      {summary && summary.vocabByLevel.length > 0 && (
        <section className="card">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">📊 Vocabulary by Level</h2>
          <div className="space-y-3">
            {summary.vocabByLevel.map(({ level, total, mastered }) => {
              const p = total > 0 ? Math.round((mastered / total) * 100) : 0;
              return (
                <div key={level} className="flex items-center gap-3">
                  <span className={`${LEVEL_BADGE[level] || 'badge'} w-10 text-center`}>{level}</span>
                  <div className="flex-1 progress-bar">
                    <div className="progress-fill bg-gradient-to-r from-red-500 to-amber-500" style={{ width: `${p}%` }} />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-24 text-right font-medium tabular-nums">
                    {mastered}/{total} ({p}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Games + Analysis ───────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">🎮 Quick Play</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {gameCards.map(g => (
              <Link key={g.to} to={g.to}
                className={`card group hover:border-red-500/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-gradient-to-br ${g.accent}`}>
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{g.icon}</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{g.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{g.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">📈 Analysis</h2>
          <div className="card space-y-4">
            {summary ? (
              <>
                <div className="space-y-1">
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider">Strongest</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {strongestLevel ? (
                      <>Mastering <span className={`font-bold ${LEVEL_BADGE[strongestLevel.level] || ''}`}>{strongestLevel.level}</span> vocabulary well!</>
                    ) : (
                      <span className="text-slate-400">Not enough data.</span>
                    )}
                  </p>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1">
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">Focus On</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {weakestLevel && weakestLevel !== strongestLevel ? (
                      <>Review <span className={`font-bold ${LEVEL_BADGE[weakestLevel.level] || ''}`}>{weakestLevel.level}</span> words more often.</>
                    ) : (
                      <span className="text-slate-400">Keep practicing!</span>
                    )}
                  </p>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1">
                  <span className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider">Needs Practice</span>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {weakestGame ? (
                      <>Your <span className="font-bold capitalize">{weakestGame.session_type.replace('-', ' ')}</span> score is lowest. Try another round!</>
                    ) : (
                      <span className="text-slate-400">Play games to see tips here.</span>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-sm">Start learning to see analysis!</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Activity ────────────────────────────────── */}
      {summary && summary.recentSessions.length > 0 && (
        <section className="card">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🕐 Recent Activity</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {summary.recentSessions.slice(0, 5).map(s => (
              <div key={s.id} className="flex items-center gap-3 text-sm py-2.5 first:pt-0 last:pb-0">
                <span className="text-slate-400 dark:text-slate-500 text-xs w-28 shrink-0 tabular-nums">
                  {new Date(s.started_at).toLocaleDateString()}
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium capitalize flex-1">{s.session_type.replace('-', ' ')}</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">{s.score} pts</span>
                <span className="text-slate-400 dark:text-slate-500 text-xs tabular-nums">{s.items_practiced} items</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
