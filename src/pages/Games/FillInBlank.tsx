import { useState, useCallback, useRef } from 'react';
import { contentApi } from '../../api/content';
import { progressApi } from '../../api/progress';
import type { VocabItem } from '../../types';
import GameSetup from '../../components/Games/GameSetup';
import GameOver from '../../components/Games/GameOver';

interface FillQuestion {
  sentence: string;
  answer: string;
  item: VocabItem;
  userInput: string;
  result: 'correct' | 'wrong' | null;
}

export default function FillInBlank() {
  const [phase, setPhase] = useState<'setup' | 'play' | 'done'>('setup');
  const [questions, setQuestions] = useState<FillQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [config, setConfig] = useState({ level: '', category: '', count: 10 });
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = useCallback(async (cfg: typeof config) => {
    setConfig(cfg);
    const items = await contentApi.getGameVocabSet({ level: cfg.level || undefined, category: cfg.category || undefined, count: cfg.count });
    const withSentences = items.filter(i => i.example_sentence);
    if (withSentences.length === 0) return alert('No sentences available for this level. Try a different level!');

    const qs: FillQuestion[] = withSentences.map(item => ({
      sentence: item.example_sentence!.replace(new RegExp(item.german, 'gi'), '___'),
      answer: item.german,
      item,
      userInput: '',
      result: null,
    }));
    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setStartTime(Date.now());
    setPhase('play');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const submit = async () => {
    const q = questions[idx];
    if (!q.userInput.trim()) return;

    const correct = q.userInput.trim().toLowerCase() === q.answer.toLowerCase();
    const pts = correct ? 10 : 0;
    if (correct) setScore(s => s + pts);

    setQuestions(qs => qs.map((x, i) => i === idx ? { ...x, result: correct ? 'correct' : 'wrong' } : x));

    await progressApi.updateProgress({ contentType: 'vocabulary', contentId: q.item.id, level: q.item.level, score: correct ? 100 : 0, completed: correct });

    setTimeout(async () => {
      if (idx < questions.length - 1) {
        setIdx(i => i + 1);
        setQuestions(qs => qs.map((x, i) => i === idx + 1 ? { ...x, userInput: '' } : x));
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        const duration = Math.round((Date.now() - startTime) / 1000);
        await progressApi.logSession({ sessionType: 'fill-in-blank', score: score + pts, duration, itemsPracticed: questions.length, total: questions.length });
        setPhase('done');
      }
    }, 1200);
  };

  const skip = () => {
    setQuestions(qs => qs.map((x, i) => i === idx ? { ...x, result: 'wrong' } : x));
    setTimeout(() => {
      if (idx < questions.length - 1) setIdx(i => i + 1);
      else setPhase('done');
    }, 400);
  };

  if (phase === 'setup') return (
    <GameSetup title="✍️ Fill in the Blank" desc="Complete the German sentence by typing the missing word." onStart={startGame} />
  );

  if (phase === 'done') return (
    <GameOver
      title="Fill in the Blank"
      score={score}
      total={questions.length * 10}
      items={questions.length}
      duration={Math.round((Date.now() - startTime) / 1000)}
      onReplay={() => startGame(config)}
      breakdown={[
        { label: '✅ Correct', count: questions.filter(q => q.result === 'correct').length, color: 'text-green-400' },
        { label: '❌ Wrong', count: questions.filter(q => q.result === 'wrong').length, color: 'text-red-400' },
      ]}
    />
  );

  const q = questions[idx];

  return (
    <div className="animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">✍️ Fill in the Blank</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{idx + 1} / {questions.length}</p>
        </div>
        <span className="text-amber-600 dark:text-amber-400 font-bold">⭐ {score}</span>
      </div>

      <div className="progress-bar mb-8">
        <div className="progress-fill bg-gradient-to-r from-green-500 to-teal-500" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>

      {/* Hint */}
      <div className="card mb-4 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">English: {q.item.english}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{q.item.category} · {q.item.level}</p>
      </div>

      {/* Sentence */}
      <div className="card mb-6 text-center">
        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
          {q.sentence.split('___').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`
                  inline-block border-b-2 mx-1 min-w-[80px] font-bold
                  ${q.result === 'correct' ? 'text-green-600 dark:text-green-400 border-green-500'
                    : q.result === 'wrong' ? 'text-red-600 dark:text-red-400 border-red-500'
                      : 'text-amber-600 dark:text-amber-400 border-amber-500'}
                `}>
                  {q.result === 'wrong' ? q.answer : q.userInput || '___'}
                </span>
              )}
            </span>
          ))}
        </p>
        {q.result === 'wrong' && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">Correct answer: <strong>{q.answer}</strong></p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          className={`input flex-1 text-lg ${q.result === 'correct' ? 'border-green-500 bg-green-900/20'
              : q.result === 'wrong' ? 'border-red-500 bg-red-900/20 animate-shake'
                : ''
            }`}
          placeholder="Type the German word…"
          value={q.userInput}
          onChange={e => setQuestions(qs => qs.map((x, i) => i === idx ? { ...x, userInput: e.target.value } : x))}
          onKeyDown={e => e.key === 'Enter' && submit()}
          disabled={q.result !== null}
        />
        {q.result === null && (
          <button onClick={submit} className="btn-primary px-6">Check</button>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={skip} className="btn-ghost flex-1 text-sm">Skip →</button>
      </div>
    </div>
  );
}
