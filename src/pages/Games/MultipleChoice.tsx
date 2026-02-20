import { useState, useCallback } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';
import type { VocabItem } from '../../types';
import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

interface Question {
  item: VocabItem;
  choices: string[];
  correctIdx: number;
  userAnswer: number | null;
}

function shuffle<T>(arr: T[]) { return [...arr].sort(() => Math.random() - 0.5); }

export default function MultipleChoice() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [config, setConfig] = useState({ level: '', category: '', count: 10 });
  const [direction, setDirection] = useState<'de-en' | 'en-de'>('de-en');

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: Math.max(cfg.count, 10) });
    if (items.length < 4) return alert('Need at least 4 vocabulary items for this game!');

    const qs: Question[] = items.slice(0, cfg.count).map((item) => {
      const others = shuffle(items.filter(x => x.id !== item.id)).slice(0, 3);
      const all = shuffle([item, ...others]);
      return {
        item,
        choices: all.map(x => direction === 'de-en' ? x.english : x.german),
        correctIdx: all.indexOf(item),
        userAnswer: null,
      };
    });
    setQuestions(qs);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setStartTime(Date.now());
    setPhase('play');
  }, [direction]);

  const answer = async (choiceIdx: number) => {
    if (selected !== null) return;
    setSelected(choiceIdx);

    const q = questions[idx];
    const correct = choiceIdx === q.correctIdx;
    if (correct) setScore(s => s + 10);

    await progressApi.updateProgress({
      contentType: 'vocabulary',
      contentId: q.item.id,
      level: q.item.level,
      score: correct ? 100 : 0,
      completed: correct,
    });

    setTimeout(async () => {
      if (idx < questions.length - 1) {
        setIdx(i => i + 1);
        setSelected(null);
      } else {
        const duration = Math.round((Date.now() - startTime) / 1000);
        await progressApi.logSession({ sessionType: 'multiple-choice', score: score + (correct ? 10 : 0), duration, itemsPracticed: questions.length, total: questions.length });
        setPhase('done');
      }
    }, 900);
  };

  if (phase === 'setup') return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Direction</h2>
        <div className="flex gap-2">
          {(['de-en', 'en-de'] as const).map(d => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 btn ${direction === d ? 'btn-primary' : 'btn-secondary'}`}>
              {d === 'de-en' ? '🇩🇪 → 🇬🇧' : '🇬🇧 → 🇩🇪'}
            </button>
          ))}
        </div>
      </div>
      <GameSetup title="☑️ Multiple Choice" desc="Choose the correct translation from 4 options." onStart={startGame} />
    </div>
  );

  if (phase === 'done') return (
    <GameOver
      title="Multiple Choice"
      score={score}
      total={questions.length * 10}
      items={questions.length}
      duration={Math.round((Date.now() - startTime) / 1000)}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '✅ Correct', count: questions.filter(q => q.userAnswer === q.correctIdx).length, color: 'text-green-400' },
        { label: '❌ Wrong', count: questions.filter(q => q.userAnswer !== null && q.userAnswer !== q.correctIdx).length, color: 'text-red-400' },
      ]}
    />
  );

  const q = questions[idx];

  return (
    <div className="animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">☑️ Multiple Choice</h1>
          <p className="text-gray-400 text-sm">{idx + 1} / {questions.length}</p>
        </div>
        <div className="text-yellow-400 font-bold">⭐ {score}</div>
      </div>

      <div className="progress-bar mb-8">
        <div className="progress-fill bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card text-center mb-6">
        <p className="text-xs text-gray-500 mb-2">{direction === 'de-en' ? 'Translate to English' : 'Translate to German'}</p>
        <p className="text-4xl font-bold text-white">
          {direction === 'de-en' ? q.item.german : q.item.english}
        </p>
        {q.item.category && <p className="text-xs text-gray-500 mt-2">{q.item.category} · {q.item.level}</p>}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3">
        {q.choices.map((choice, i) => {
          let cls = 'btn btn-secondary text-base py-4 w-full';
          if (selected !== null) {
            if (i === q.correctIdx) cls = 'btn text-base py-4 w-full bg-green-700 text-white border-green-500';
            else if (i === selected) cls = 'btn text-base py-4 w-full bg-red-800 text-red-300 border-red-600 animate-shake';
          }
          return (
            <button key={i} onClick={() => answer(i)} disabled={selected !== null} className={cls}>
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
