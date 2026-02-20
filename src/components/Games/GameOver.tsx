import { Link } from 'react-router-dom';

interface BreakdownItem {
  label: string;
  count: number;
  color: string;
}

interface GameOverProps {
  title: string;
  score: number;
  total: number;
  items: number;
  duration: number;
  onReplay: () => void;
  breakdown?: BreakdownItem[];
}

export default function GameOver({ title, score, total, items, duration, onReplay, breakdown }: GameOverProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const grade = pct >= 90 ? '🌟 Excellent!' : pct >= 70 ? '👍 Good job!' : pct >= 50 ? '📚 Keep practicing!' : '💪 Try again!';
  const mins  = Math.floor(duration / 60);
  const secs  = duration % 60;

  return (
    <div className="animate-bounce-in max-w-md mx-auto">
      <div className="card text-center space-y-4">
        <div className="text-5xl">{pct >= 70 ? '🏆' : pct >= 50 ? '🎯' : '📚'}</div>
        <h2 className="text-2xl font-bold text-white">{title} Complete!</h2>
        <p className="text-gray-400">{grade}</p>

        {/* Score */}
        <div className="bg-gray-800/60 rounded-xl p-6">
          <div className="text-5xl font-bold text-yellow-400">{score}</div>
          <div className="text-gray-500 text-sm mt-1">points</div>
          <div className="progress-bar mt-4">
            <div className="progress-fill bg-gradient-to-r from-red-600 to-yellow-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-sm text-gray-400 mt-2">{pct}% accuracy</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="text-blue-400 font-bold text-lg">{items}</div>
            <div className="text-gray-500 text-xs">Items</div>
          </div>
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="text-green-400 font-bold text-lg">{pct}%</div>
            <div className="text-gray-500 text-xs">Score</div>
          </div>
          <div className="bg-gray-800/40 rounded-lg p-3">
            <div className="text-purple-400 font-bold text-lg">{mins > 0 ? `${mins}m${secs}s` : `${secs}s`}</div>
            <div className="text-gray-500 text-xs">Time</div>
          </div>
        </div>

        {/* Breakdown */}
        {breakdown && breakdown.length > 0 && (
          <div className="space-y-1 text-sm text-left">
            {breakdown.map(b => (
              <div key={b.label} className="flex justify-between">
                <span className="text-gray-400">{b.label}</span>
                <span className={`font-bold ${b.color}`}>{b.count}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={onReplay} className="btn-primary flex-1">Play Again 🔄</button>
          <Link to="/games" className="btn-secondary flex-1 text-center">All Games</Link>
        </div>
        <Link to="/" className="text-gray-600 hover:text-gray-400 text-sm block">← Dashboard</Link>
      </div>
    </div>
  );
}
