import { useState, useCallback } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';

import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

interface MemoryCard {
  id: string;
  vocabId: number;
  text: string;
  type: 'german' | 'english';
  level: string;
  matched: boolean;
  flipped: boolean;
}

function shuffle<T>(arr: T[]) { return [...arr].sort(() => Math.random() - 0.5); }

export default function MemoryCards() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [config, setConfig] = useState({ level: '', category: '', count: 8 });
  const [checking, setChecking] = useState(false);
  const total = config.count;

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const n = Math.min(cfg.count, 10);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: n });
    if (items.length < 2) return alert('Not enough vocabulary for memory game!');

    const deck: MemoryCard[] = shuffle(
      items.flatMap((item): MemoryCard[] => [
        { id: `de-${item.id}`, vocabId: item.id, text: item.german, type: 'german', level: item.level, matched: false, flipped: false },
        { id: `en-${item.id}`, vocabId: item.id, text: item.english, type: 'english', level: item.level, matched: false, flipped: false },
      ])
    );
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setScore(0);
    setStartTime(Date.now());
    setPhase('play');
    setConfig(c => ({ ...c, count: items.length }));
  }, []);

  const flip = (card: MemoryCard) => {
    if (checking || card.matched || card.flipped) return;
    if (flippedIds.length === 1 && flippedIds[0] === card.id) return;

    const newFlipped = [...flippedIds, card.id];
    setCards(prev => prev.map(c => c.id === card.id ? { ...c, flipped: true } : c));

    if (newFlipped.length < 2) {
      setFlippedIds(newFlipped);
      return;
    }

    setMoves(m => m + 1);
    setChecking(true);

    const [id1] = newFlipped;
    const c1 = cards.find(c => c.id === id1)!;
    const c2 = { ...card };

    if (c1.vocabId === c2.vocabId && c1.type !== c2.type) {
      // Match!
      setCards(prev => prev.map(c => (c.id === id1 || c.id === c2.id) ? { ...c, matched: true, flipped: true } : c));
      setMatches(m => m + 1);
      const newScore = score + Math.max(10, 30 - moves);
      setScore(newScore);
      setFlippedIds([]);
      setChecking(false);

      if (matches + 1 === total) {
        const duration = Math.round((Date.now() - startTime) / 1000);
        progressApi.logSession({ sessionType: 'memory-cards', score: newScore, duration, itemsPracticed: total, total });
        setTimeout(() => setPhase('done'), 500);
      }
    } else {
      // No match
      setTimeout(() => {
        setCards(prev => prev.map(c => (c.id === id1 || c.id === c2.id) ? { ...c, flipped: false } : c));
        setFlippedIds([]);
        setChecking(false);
      }, 900);
    }
  };

  if (phase === 'setup') return (
    <GameSetup
      title="🧠 Memory Cards"
      desc="Match each German word with its English translation. Fewer moves = higher score!"
      onStart={startGame}
      maxCount={10}
    />
  );

  if (phase === 'done') return (
    <GameOver
      title="Memory Cards"
      score={score}
      total={total * 30}
      items={total}
      duration={Math.round((Date.now() - startTime) / 1000)}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '🎯 Pairs found', count: matches, color: 'text-green-400' },
        { label: '🔄 Total moves', count: moves, color: 'text-blue-400' },
      ]}
    />
  );

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">🧠 Memory Cards</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-400">🔄 Moves: <span className="text-white font-bold">{moves}</span></span>
          <span className="text-gray-400">✅ Pairs: <span className="text-green-400 font-bold">{matches}/{total}</span></span>
          <span className="text-yellow-400 font-bold">⭐ {score}</span>
        </div>
      </div>

      <div className="progress-bar mb-6">
        <div className="progress-fill bg-gradient-to-r from-purple-600 to-pink-500" style={{ width: `${(matches / total) * 100}%` }} />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => flip(card)}
            disabled={card.matched}
            className={`
              h-20 rounded-xl text-sm font-semibold transition-all duration-300 border
              ${card.matched
                ? 'bg-green-900/40 border-green-600/50 text-green-300'
                : card.flipped
                  ? 'bg-gray-700 border-gray-500 text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-700 hover:border-gray-500 hover:bg-gray-750'
              }
            `}
          >
            {(card.flipped || card.matched)
              ? <span className={card.type === 'german' ? 'text-red-300' : 'text-blue-300'}>{card.text}</span>
              : <span className="text-2xl">🇩🇪</span>
            }
          </button>
        ))}
      </div>
    </div>
  );
}
