import { useState, useCallback, useEffect, useRef } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';
import type { VocabItem } from '../../types';
import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

function shuffle<T>(arr: T[]) { return [...arr].sort(() => Math.random() - 0.5); }

interface SpeedQuestion {
  item: VocabItem;
  choices: string[];
  correctIdx: number;
}

export default function SpeedRound() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState<'green' | 'red' | null>(null);
  const [config, setConfig] = useState({ level: '', category: '', count: 50 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: 50 });
    if (items.length < 4) return alert('Need at least 4 vocabulary items!');
    const qs: SpeedQuestion[] = items.map(item => {
      const others = shuffle(items.filter(x => x.id !== item.id)).slice(0, 3);
      const all = shuffle([item, ...others]);
      return { item, choices: all.map(x => x.english), correctIdx: all.indexOf(item) };
    });
    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setTimeLeft(60);
    startTimeRef.current = Date.now();
    setPhase('play');
  }, []);

  useEffect(() => {
    if (phase !== 'play') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
          progressApi.logSession({ sessionType: 'speed-round', score, duration, itemsPracticed: correct + wrong, total: correct + wrong });
          setPhase('done');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const answer = (choiceIdx: number) => {
    if (idx >= questions.length) return;
    const q = questions[idx];
    const isCorrect = choiceIdx === q.correctIdx;

    if (isCorrect) { setScore(s => s + 10); setCorrect(c => c + 1); setFlash('green'); }
    else { setWrong(w => w + 1); setFlash('red'); }

    setTimeout(() => setFlash(null), 200);
    setIdx(i => i + 1);
  };

  if (phase === 'setup') return (
    <GameSetup
      title="⚡ Speed Round"
      desc="Answer as many questions as you can in 60 seconds! +10 for each correct answer."
      onStart={startGame}
      hideCount
    />
  );

  if (phase === 'done') return (
    <GameOver
      title="Speed Round"
      score={score}
      total={(correct + wrong) * 10}
      items={correct + wrong}
      duration={60}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '✅ Correct', count: correct, color: 'text-green-400' },
        { label: '❌ Wrong', count: wrong, color: 'text-red-400' },
      ]}
    />
  );

  const q = questions[idx % questions.length];
  const timerPct = (timeLeft / 60) * 100;

  return (
    <div className={`animate-fade-in max-w-xl mx-auto transition-colors duration-200 ${flash === 'green' ? 'brightness-125' : flash === 'red' ? '' : ''
      }`}>
      {/* Timer */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">⚡ Speed Round</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-green-600 dark:text-green-400">✅ {correct}</span>
          <span className="text-red-600 dark:text-red-400">❌ {wrong}</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="progress-bar mb-2 h-3">
        <div
          className={`progress-fill h-3 ${timeLeft > 20 ? 'bg-green-500' : timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}
          style={{ width: `${timerPct}%` }}
        />
      </div>
      <div className={`text-right text-lg font-bold mb-6 ${timeLeft <= 10 ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-slate-600 dark:text-slate-300'}`}>
        ⏱ {timeLeft}s
      </div>

      {/* Question */}
      <div className={`card text-center mb-6 transition-colors ${flash === 'green' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : flash === 'red' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''
        }`}>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Translate to English</p>
        <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{q.item.german}</p>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3">
        {q.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => answer(i)}
            className="btn btn-secondary text-base py-4 active:scale-95 hover:bg-gray-600"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
