import { useEffect, useState } from 'react';
import { progressApi } from '../api/progress';
import type { ProgressSummary } from '../types';
import { LEVEL_COLORS } from '../types';
import { Link } from 'react-router-dom';

export default function ProgressPage() {
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [achievements, setAchievements] = useState<{ achievement_name: string; earned_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([progressApi.getSummary(), progressApi.getAchievements()])
      .then(([s, a]) => { setSummary(s); setAchievements(a); })
      .catch(() => { /* no backend on static deployment — show empty state */ })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-4xl animate-spin">📊</div></div>;

  const totalVocab = summary?.vocabByLevel.reduce((s, v) => s + v.total, 0) ?? 0;
  const totalMaster = summary?.vocabByLevel.reduce((s, v) => s + v.mastered, 0) ?? 0;

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">📈 Progress</h1>
        <p className="text-gray-400 text-sm mt-1">Track your German learning journey</p>
      </div>

      {/* Total score */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '🏆', label: 'Total Score', value: summary?.totalScore ?? 0, color: 'text-yellow-400' },
          { icon: '✅', label: 'Mastered', value: totalMaster, color: 'text-green-400' },
          { icon: '📚', label: 'Total Vocab', value: totalVocab, color: 'text-blue-400' },
          { icon: '🎮', label: 'Game Sessions', value: summary?.recentSessions.length ?? 0, color: 'text-purple-400' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Vocab progress by level */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">📊 Vocabulary Progress by Level</h2>
        <div className="space-y-4">
          {summary?.vocabByLevel.map(({ level, total, mastered }) => {
            const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
            return (
              <div key={level}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-bold ${LEVEL_COLORS[level]}`}>{level}</span>
                  <span className="text-sm text-gray-400">{mastered}/{total} words ({pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill bg-gradient-to-r from-red-600 to-yellow-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game performance */}
      {summary && summary.gameStats.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">🎮 Game Performance</h2>
          <div className="space-y-3">
            {summary.gameStats.map(g => (
              <div key={g.session_type} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-300 w-40 capitalize">{g.session_type.replace('-', ' ')}</span>
                <div className="flex-1 progress-bar">
                  <div className="progress-fill bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${Math.min(g.avg_score, 100)}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-24 text-right">{g.count}x · avg {Math.round(g.avg_score)}pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak calendar */}
      {summary && summary.streakData.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">🔥 Activity (Last 30 days)</h2>
          <div className="flex flex-wrap gap-1.5">
            {summary.streakData.slice(0, 30).reverse().map(d => (
              <div
                key={d.day}
                title={`${d.day}: ${d.sessions} sessions`}
                className={`w-6 h-6 rounded text-xs flex items-center justify-center ${d.sessions >= 3 ? 'bg-green-500' : d.sessions >= 2 ? 'bg-green-700' : d.sessions >= 1 ? 'bg-green-900/80' : 'bg-gray-800'
                  }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
            <span>Less</span>
            {['bg-gray-800', 'bg-green-900/80', 'bg-green-700', 'bg-green-500'].map(c => (
              <div key={c} className={`w-4 h-4 rounded ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">🏅 Achievements</h2>
        {achievements.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No achievements yet! Start learning to earn badges.</p>
            <Link to="/games" className="btn-primary btn-sm mt-4 inline-flex">Play Games →</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.achievement_name} className="flex items-center gap-3 bg-gray-800/60 rounded-lg p-3">
                <span className="text-2xl">{a.achievement_name.split(' ')[0]}</span>
                <div>
                  <p className="text-sm font-medium text-white">{a.achievement_name.substring(a.achievement_name.indexOf(' ') + 1)}</p>
                  <p className="text-xs text-gray-500">{new Date(a.earned_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent sessions */}
      {summary && summary.recentSessions.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">🕐 Recent Sessions</h2>
          <div className="space-y-2">
            {summary.recentSessions.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50">
                <span className="text-gray-500 text-xs w-24 shrink-0">{new Date(s.started_at).toLocaleDateString()}</span>
                <span className="text-gray-300 font-medium capitalize flex-1 text-sm">{s.session_type.replace(/-/g, ' ')}</span>
                <span className="text-xs text-gray-600">{s.items_practiced} items</span>
                <span className="text-yellow-400 font-bold text-sm">{s.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
