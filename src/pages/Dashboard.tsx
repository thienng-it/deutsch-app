import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { progressApi } from '../api/progress';

import type { ProgressSummary, LeaderboardEntry } from '../types';
import { userApi } from '../api/auth';
import { LEVEL_COLORS } from '../types';
import { CURRICULUM, getProgress, SKILL_KEYS } from '../data/curriculum';

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [materialStats, setMaterialStats] = useState<{ audioFiles: number; pdfFiles: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      progressApi.getSummary(),
      userApi.getLeaderboard(),
      fetch('/api/materials/stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then(r => r.json()).catch(() => null),
    ]).then(([sum, lb, ms]) => {
      setSummary(sum);
      setLeaderboard(lb);
      setMaterialStats(ms);
    }).finally(() => setLoading(false));
  }, []);

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
        <Link to="/" className="btn-gold hidden sm:flex">📅 Learning Plan</Link>
      </div>

      {/* Today's Lesson */}
      {(() => {
        const chProgress = getProgress();
        const current = CURRICULUM.flatMap(ch =>
          ch.days.map(d => ({ ch, day: d.num, key: `${ch.id}_day${d.num}` }))
        ).find(({ key }) => {
          const p = chProgress[key] ?? {};
          return SKILL_KEYS.some(k => !p[k]);
        });
        if (!current) return null;
        const dp = chProgress[current.key] ?? {};
        const done = SKILL_KEYS.filter(k => dp[k]).length;
        return (
          <Link to="/" className="card bg-gradient-to-r from-red-900/30 to-yellow-900/20 border border-red-700/30 hover:border-red-600/50 transition-all block">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Continue Learning</p>
                <p className="font-bold text-white">{current.ch.title} — Day {current.day}</p>
                <p className="text-xs text-gray-500 mt-0.5">{current.ch.days[current.day - 1].title} · {done}/4 skills done</p>
              </div>
              <span className="text-red-400 font-semibold text-sm">Start →</span>
            </div>
          </Link>
        );
      })()}

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

        {/* Leaderboard */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">🏆 Leaderboard</h2>
          <div className="card space-y-3">
            {leaderboard.length === 0 ? (
              <p className="text-gray-500 text-sm">No data yet – start playing!</p>
            ) : leaderboard.map((entry, i) => (
              <div key={entry.id} className={`flex items-center gap-3 p-2 rounded-lg ${entry.isCurrentUser ? 'bg-red-600/10 border border-red-600/20' : ''
                }`}>
                <span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {entry.displayName} {entry.isCurrentUser && <span className="text-xs text-gray-500">(you)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{entry.itemsMastered} mastered</p>
                </div>
                <span className="text-yellow-400 font-bold text-sm">{entry.totalScore.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Materials stats */}
          {materialStats && (
            <div className="card mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-gray-300">📁 Materials Library</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">🎵 Audio files</span>
                <span className="text-blue-400 font-bold">{materialStats.audioFiles.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">📄 PDF files</span>
                <span className="text-red-400 font-bold">{materialStats.pdfFiles}</span>
              </div>
              <Link to="/materials" className="btn-secondary btn-sm w-full mt-2">Browse Materials →</Link>
            </div>
          )}
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
