import { useState, useCallback } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';
import type { VocabItem } from '../../types';
import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

interface ScrambleQuestion {
  item: VocabItem;
  scrambled: string[];
  answer: string[];
  selected: string[];
  solved: boolean;
}

function scrambleWord(word: string) {
  const letters = word.toUpperCase().split('');
  let s: string[];
  do { s = [...letters].sort(() => Math.random() - 0.5); }
  while (s.join('') === word.toUpperCase());
  return s;
}

export default function WordScramble() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [questions, setQuestions] = useState<ScrambleQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [config, setConfig] = useState({ level: '', category: '', count: 10 });
  const [shake, setShake] = useState(false);

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: cfg.count });
    if (items.length === 0) return alert('No vocabulary found!');
    setQuestions(items.map(item => ({
      item,
      scrambled: scrambleWord(item.german),
      answer: item.german.toUpperCase().split(''),
      selected: [],
      solved: false,
    })));
    setIdx(0);
    setScore(0);
    setStartTime(Date.now());
    setPhase('play');
  }, []);

  const q = questions[idx];

  const selectLetter = (letter: string, letterIdx: number) => {
    if (!q || q.solved) return;
    const newSelected = [...q.selected, letter];
    const newScrambled = q.scrambled.filter((_, i) => i !== letterIdx);

    const updatedQ = { ...q, selected: newSelected, scrambled: newScrambled };
    const updatedQs = questions.map((x, i) => i === idx ? updatedQ : x);
    setQuestions(updatedQs);

    // Check if complete
    if (newSelected.length === q.answer.length) {
      const correct = newSelected.join('') === q.answer.join('');
      if (correct) {
        const pts = 10;
        setScore(s => s + pts);
        progressApi.updateProgress({ contentType: 'vocabulary', contentId: q.item.id, level: q.item.level, score: 100, completed: true });
        setQuestions(qs => qs.map((x, i) => i === idx ? { ...x, solved: true } : x));
        setTimeout(() => {
          if (idx < questions.length - 1) setIdx(i => i + 1);
          else {
            const duration = Math.round((Date.now() - startTime) / 1000);
            progressApi.logSession({ sessionType: 'word-scramble', score: score + pts, duration, itemsPracticed: questions.length, total: questions.length });
            setPhase('done');
          }
        }, 800);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setQuestions(qs => qs.map((x, i) => i === idx ? { ...q, scrambled: scrambleWord(q.item.german), selected: [] } : x));
        }, 500);
      }
    }
  };

  const deselect = (letter: string, letterIdx: number) => {
    if (!q || q.solved) return;
    const newSelected = q.selected.filter((_, i) => i !== letterIdx);
    const newScrambled = [...q.scrambled, letter];
    setQuestions(qs => qs.map((x, i) => i === idx ? { ...x, selected: newSelected, scrambled: newScrambled } : x));
  };

  const skip = () => {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setQuestions(qs => qs.map((x, i) => i === idx ? { ...q, scrambled: scrambleWord(q.item.german), selected: [] } : x));
    } else setPhase('done');
  };

  if (phase === 'setup') return (
    <GameSetup title="🔀 Word Scramble" desc="Unscramble the letters to form the correct German word!" onStart={startGame} />
  );

  if (phase === 'done') return (
    <GameOver
      title="Word Scramble"
      score={score}
      total={questions.length * 10}
      items={questions.length}
      duration={Math.round((Date.now() - startTime) / 1000)}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '✅ Solved', count: questions.filter(q => q.solved).length, color: 'text-green-400' },
        { label: '⏭ Skipped', count: questions.filter(q => !q.solved).length, color: 'text-gray-400' },
      ]}
    />
  );

  return (
    <div className="animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">🔀 Word Scramble</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{idx + 1} / {questions.length}</p>
        </div>
        <span className="text-amber-600 dark:text-amber-400 font-bold">⭐ {score}</span>
      </div>

      <div className="progress-bar mb-8">
        <div className="progress-fill bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>

      {/* Hint */}
      <div className="card text-center mb-6">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">English meaning</p>
        <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{q.item.english}</p>
        {q.item.category && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{q.item.category} · {q.item.level}</p>}
      </div>

      {/* Answer slots */}
      <div className={`flex flex-wrap gap-2 justify-center mb-6 min-h-[52px] ${shake ? 'animate-shake' : ''}`}>
        {q.answer.map((_, i) => (
          <button
            key={i}
            onClick={() => q.selected[i] && deselect(q.selected[i], i)}
            className={`
              w-11 h-11 rounded-lg border-2 text-base font-bold transition-colors
              ${q.solved ? 'bg-green-100 dark:bg-green-800 border-green-400 dark:border-green-500 text-green-700 dark:text-green-300'
                : q.selected[i] ? 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-white cursor-pointer hover:border-red-400 dark:hover:border-red-500'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-600 text-transparent'}
            `}
          >
            {q.selected[i] ?? '_'}
          </button>
        ))}
      </div>

      {/* Scrambled letters */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {q.scrambled.map((letter, i) => (
          <button
            key={`${letter}-${i}`}
            onClick={() => selectLetter(letter, i)}
            className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-amber-400 dark:hover:border-amber-500 transition-colors active:scale-95"
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={skip} className="btn-ghost flex-1">Skip →</button>
        <button
          onClick={() => setQuestions(qs => qs.map((x, i) => i === idx ? { ...q, scrambled: scrambleWord(q.item.german), selected: [] } : x))}
          className="btn-secondary flex-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
