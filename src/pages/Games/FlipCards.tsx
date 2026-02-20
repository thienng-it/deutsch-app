import { useState, useCallback } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';
import type { VocabItem } from '../../types';

import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

type Rating = 'easy' | 'medium' | 'hard' | null;

interface CardState extends VocabItem {
  flipped: boolean;
  rating: Rating;
}

export default function FlipCards() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [cards, setCards] = useState<CardState[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState(0);
  const [config, setConfig] = useState({ level: '', category: '', count: 15 });

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: cfg.count });
    if (items.length === 0) return alert('No vocabulary found for these settings!');
    setCards(items.map(i => ({ ...i, flipped: false, rating: null })));
    setIdx(0);
    setFlipped(false);
    setScore(0);
    setStartTime(Date.now());
    setPhase('play');
  }, []);

  const rate = async (r: 'easy' | 'medium' | 'hard') => {
    const card = cards[idx];
    const pts = r === 'easy' ? 10 : r === 'medium' ? 6 : 2;
    setScore(s => s + pts);
    setCards(prev => prev.map((c, i) => i === idx ? { ...c, rating: r } : c));

    await progressApi.updateProgress({
      contentType: 'vocabulary',
      contentId: card.id,
      level: card.level,
      score: pts * 10,
      completed: r === 'easy',
    });

    if (idx < cards.length - 1) {
      setIdx(i => i + 1);
      setFlipped(false);
    } else {
      const duration = Math.round((Date.now() - startTime) / 1000);
      await progressApi.logSession({ sessionType: 'flip-cards', score, duration, itemsPracticed: cards.length, total: cards.length });
      setPhase('done');
    }
  };

  if (phase === 'setup') return (
    <GameSetup title="🃏 Flip Cards" desc="Flip a card to see the translation, then rate how well you knew it." onStart={startGame} />
  );

  if (phase === 'done') return (
    <GameOver
      title="Flip Cards"
      score={score}
      total={cards.length * 10}
      items={cards.length}
      duration={Math.round((Date.now() - startTime) / 1000)}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '😊 Easy', count: cards.filter(c => c.rating === 'easy').length, color: 'text-green-400' },
        { label: '😐 Medium', count: cards.filter(c => c.rating === 'medium').length, color: 'text-yellow-400' },
        { label: '😓 Hard', count: cards.filter(c => c.rating === 'hard').length, color: 'text-red-400' },
      ]}
    />
  );

  const card = cards[idx];

  return (
    <div className="animate-fade-in max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">🃏 Flip Cards</h1>
          <p className="text-gray-400 text-sm">{idx + 1} / {cards.length}</p>
        </div>
        <div className="text-yellow-400 font-bold">⭐ {score}</div>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-6">
        <div className="progress-fill bg-gradient-to-r from-red-600 to-yellow-500" style={{ width: `${((idx + 1) / cards.length) * 100}%` }} />
      </div>

      {/* Card */}
      <div className="flip-container h-64 cursor-pointer" onClick={() => setFlipped(f => !f)}>
        <div className={`flip-card w-full h-full ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flip-front card flex flex-col items-center justify-center text-center p-8 h-full">
            <p className="text-xs text-gray-500 mb-2">{card.level} · {card.category ?? 'General'}</p>
            <p className="text-4xl font-bold text-white mb-4">{card.german}</p>
            <p className="text-gray-500 text-sm mt-4">Click to reveal →</p>
          </div>
          {/* Back */}
          <div className="flip-back card flex flex-col items-center justify-center text-center p-8 h-full bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-600/30">
            <p className="text-3xl font-bold text-yellow-400 mb-2">{card.english}</p>
            <p className="text-2xl text-white">{card.german}</p>
            {card.example_sentence && (
              <p className="text-gray-400 text-sm mt-4 italic">"{card.example_sentence}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons - only after flip */}
      {flipped && (
        <div className="flex gap-3 mt-6 animate-fade-in">
          <button onClick={() => rate('hard')} className="flex-1 btn bg-red-900/50 hover:bg-red-800 text-red-300 border border-red-700/50">
            😓 Hard
          </button>
          <button onClick={() => rate('medium')} className="flex-1 btn bg-yellow-900/50 hover:bg-yellow-800 text-yellow-300 border border-yellow-700/50">
            😐 Medium
          </button>
          <button onClick={() => rate('easy')} className="flex-1 btn bg-green-900/50 hover:bg-green-800 text-green-300 border border-green-700/50">
            😊 Easy
          </button>
        </div>
      )}

      {!flipped && (
        <p className="text-center text-gray-600 text-sm mt-6">Click the card to flip it</p>
      )}
    </div>
  );
}
