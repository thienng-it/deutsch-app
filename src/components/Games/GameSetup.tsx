import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface GameSetupProps {
  title: string;
  desc: string;
  onStart: (config: { level: string; category: string; count: number }) => void;
  maxCount?: number;
  hideCount?: boolean;
}

export default function GameSetup({ title, desc, onStart, maxCount = 20, hideCount = false }: GameSetupProps) {
  const { user } = useAuth();
  const [level, setLevel] = useState(user?.currentLevel ?? 'A1');
  const [category] = useState('');
  const [count, setCount] = useState(10);

  return (
    <div className="animate-fade-in max-w-md mx-auto">
      <div className="mb-6">
        <Link to="/games" className="text-gray-500 hover:text-gray-300 text-sm">← Back to Games</Link>
      </div>
      <div className="card space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 text-sm mt-2">{desc}</p>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`badge cursor-pointer transition-all badge-${l.toLowerCase()} ${level !== l && 'opacity-40 hover:opacity-70'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        {!hideCount && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of items: <span className="text-yellow-400 font-bold">{count}</span>
            </label>
            <input
              type="range"
              min="5"
              max={maxCount}
              step="5"
              value={count}
              onChange={e => setCount(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>5</span><span>{maxCount}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => onStart({ level, category, count })}
          className="btn-primary w-full py-3 text-base"
        >
          Start Game →
        </button>
      </div>
    </div>
  );
}
