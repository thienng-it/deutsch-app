import { useState, useRef, useEffect } from 'react';
import type { InteractiveQuestion } from '../data/curriculum';

/* ─── Single Question Renderers ─────────────────────────── */

function MultipleChoice({ q, onAnswer }: {
    q: InteractiveQuestion; onAnswer: (correct: boolean) => void;
}) {
    const [selected, setSelected] = useState<number | null>(null);
    const correct = q.correctAnswer as number;

    const handleSelect = (i: number) => {
        if (selected !== null) return;
        setSelected(i);
        onAnswer(i === correct);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-200 font-medium">{q.prompt}</p>
            <div className="grid gap-2">
                {q.options?.map((opt, i) => {
                    let cls = 'w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all border ';
                    if (selected === null) {
                        cls += 'border-gray-600 bg-gray-700/50 hover:bg-gray-600/70 hover:border-gray-500 text-gray-200 cursor-pointer';
                    } else if (i === correct) {
                        cls += 'border-green-500 bg-green-900/40 text-green-300 font-medium';
                    } else if (i === selected) {
                        cls += 'border-red-500 bg-red-900/30 text-red-300';
                    } else {
                        cls += 'border-gray-700 bg-gray-800/50 text-gray-500';
                    }
                    return (
                        <button key={i} onClick={() => handleSelect(i)} className={cls}>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
                                    {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                            </span>
                        </button>
                    );
                })}
            </div>
            {selected !== null && q.explanation && (
                <p className="text-xs text-blue-300 bg-blue-900/20 rounded-lg p-2 mt-1">
                    💡 {q.explanation}
                </p>
            )}
        </div>
    );
}

function TrueFalse({ q, onAnswer }: {
    q: InteractiveQuestion; onAnswer: (correct: boolean) => void;
}) {
    const [selected, setSelected] = useState<number | null>(null);
    const correct = q.correctAnswer as number;
    const options = q.options || ['Richtig', 'Falsch'];

    const handleSelect = (i: number) => {
        if (selected !== null) return;
        setSelected(i);
        onAnswer(i === correct);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-200 font-medium">{q.prompt}</p>
            <div className="flex gap-3">
                {options.map((opt, i) => {
                    let cls = 'flex-1 py-3 rounded-lg text-sm font-medium transition-all border text-center ';
                    if (selected === null) {
                        cls += 'border-gray-600 bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 cursor-pointer';
                    } else if (i === correct) {
                        cls += 'border-green-500 bg-green-900/40 text-green-300';
                    } else if (i === selected) {
                        cls += 'border-red-500 bg-red-900/30 text-red-300';
                    } else {
                        cls += 'border-gray-700 bg-gray-800/50 text-gray-500';
                    }
                    return (
                        <button key={i} onClick={() => handleSelect(i)} className={cls}>
                            {i === 0 ? '✅ ' : '❌ '}{opt}
                        </button>
                    );
                })}
            </div>
            {selected !== null && q.explanation && (
                <p className="text-xs text-blue-300 bg-blue-900/20 rounded-lg p-2 mt-1">
                    💡 {q.explanation}
                </p>
            )}
        </div>
    );
}

function TextInput({ q, onAnswer }: {
    q: InteractiveQuestion; onAnswer: (correct: boolean) => void;
}) {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:]+$/g, '');

    const handleSubmit = () => {
        if (!value.trim() || submitted) return;
        const answer = normalize(value);
        const correct = normalize(String(q.correctAnswer));
        const alts = (q.acceptableAnswers || []).map(normalize);
        const ok = answer === correct || alts.includes(answer);
        setIsCorrect(ok);
        setSubmitted(true);
        onAnswer(ok);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-200 font-medium">{q.prompt}</p>
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    disabled={submitted}
                    placeholder="Type your answer…"
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm border bg-gray-800/80 outline-none transition-all ${submitted
                            ? isCorrect
                                ? 'border-green-500 text-green-300'
                                : 'border-red-500 text-red-300'
                            : 'border-gray-600 text-white focus:border-blue-500'
                        }`}
                />
                {!submitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={!value.trim()}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-all"
                    >
                        Check
                    </button>
                )}
            </div>
            {submitted && !isCorrect && (
                <p className="text-xs text-yellow-300 bg-yellow-900/20 rounded-lg p-2">
                    ✏️ Correct answer: <strong>{String(q.correctAnswer)}</strong>
                </p>
            )}
            {submitted && q.explanation && (
                <p className="text-xs text-blue-300 bg-blue-900/20 rounded-lg p-2">
                    💡 {q.explanation}
                </p>
            )}
        </div>
    );
}

function FillBlank({ q, onAnswer }: {
    q: InteractiveQuestion; onAnswer: (correct: boolean) => void;
}) {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const normalize = (s: string) => s.trim().toLowerCase();

    const handleSubmit = () => {
        if (!value.trim() || submitted) return;
        const answer = normalize(value);
        const correct = normalize(String(q.correctAnswer));
        const alts = (q.acceptableAnswers || []).map(normalize);
        const ok = answer === correct || alts.includes(answer);
        setIsCorrect(ok);
        setSubmitted(true);
        onAnswer(ok);
    };

    // Parse the prompt to render the blank inline
    const parts = q.prompt.split('___');

    return (
        <div className="space-y-2">
            <div className="text-sm text-gray-200 font-medium flex flex-wrap items-center gap-1">
                {parts.map((part, i) => (
                    <span key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <input
                                ref={i === 0 ? inputRef : undefined}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                disabled={submitted}
                                className={`inline-block w-32 px-2 py-1 mx-1 rounded border text-sm text-center transition-all ${submitted
                                        ? isCorrect
                                            ? 'border-green-500 bg-green-900/30 text-green-300'
                                            : 'border-red-500 bg-red-900/30 text-red-300'
                                        : 'border-gray-500 bg-gray-700/50 text-white focus:border-blue-500'
                                    }`}
                                placeholder="..."
                            />
                        )}
                    </span>
                ))}
            </div>
            {!submitted && value.trim() && (
                <button onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all">
                    Check
                </button>
            )}
            {submitted && !isCorrect && (
                <p className="text-xs text-yellow-300 bg-yellow-900/20 rounded-lg p-2">
                    ✏️ Correct: <strong>{String(q.correctAnswer)}</strong>
                </p>
            )}
            {submitted && q.explanation && (
                <p className="text-xs text-blue-300 bg-blue-900/20 rounded-lg p-2">
                    💡 {q.explanation}
                </p>
            )}
        </div>
    );
}

function Ordering({ q, onAnswer }: {
    q: InteractiveQuestion; onAnswer: (correct: boolean) => void;
}) {
    const [items, setItems] = useState<string[]>(() => {
        const original = [...(q.options || [])];
        // Shuffle
        for (let i = original.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [original[i], original[j]] = [original[j], original[i]];
        }
        return original;
    });
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [dragging, setDragging] = useState<number | null>(null);

    const handleDragStart = (i: number) => setDragging(i);
    const handleDragOver = (e: React.DragEvent, i: number) => {
        e.preventDefault();
        if (dragging === null || dragging === i || submitted) return;
        const newItems = [...items];
        const [removed] = newItems.splice(dragging, 1);
        newItems.splice(i, 0, removed);
        setItems(newItems);
        setDragging(i);
    };

    const handleCheck = () => {
        const correctOrder = q.options || [];
        const ok = items.every((item, i) => item === correctOrder[i]);
        setIsCorrect(ok);
        setSubmitted(true);
        onAnswer(ok);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm text-gray-200 font-medium">{q.prompt}</p>
            <p className="text-xs text-gray-400">Drag to reorder:</p>
            <div className="space-y-1.5">
                {items.map((item, i) => (
                    <div
                        key={item}
                        draggable={!submitted}
                        onDragStart={() => handleDragStart(i)}
                        onDragOver={(e) => handleDragOver(e, i)}
                        onDragEnd={() => setDragging(null)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${submitted
                                ? item === (q.options || [])[i]
                                    ? 'border-green-600 bg-green-900/20 text-green-300'
                                    : 'border-red-600 bg-red-900/20 text-red-300'
                                : dragging === i
                                    ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                                    : 'border-gray-600 bg-gray-700/40 text-gray-200 cursor-grab'
                            }`}
                    >
                        <span className="text-gray-500 select-none">⣿</span>
                        <span className="flex-1">{item}</span>
                        <span className="text-xs text-gray-500 select-none">{i + 1}</span>
                    </div>
                ))}
            </div>
            {!submitted && (
                <button onClick={handleCheck}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all">
                    Check Order
                </button>
            )}
            {submitted && !isCorrect && (
                <p className="text-xs text-yellow-300 bg-yellow-900/20 rounded-lg p-2">
                    ✏️ Correct order: {(q.options || []).map((o, i) => `${i + 1}. ${o}`).join(' → ')}
                </p>
            )}
            {submitted && q.explanation && (
                <p className="text-xs text-blue-300 bg-blue-900/20 rounded-lg p-2">
                    💡 {q.explanation}
                </p>
            )}
        </div>
    );
}

/* ─── Main Interactive Exercise Component ───────────────── */

export default function InteractiveExercise({
    exercises,
    onAllComplete,
}: {
    exercises: InteractiveQuestion[];
    onAllComplete?: (score: number, total: number) => void;
}) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<boolean[]>(new Array(exercises.length).fill(false));
    const [results, setResults] = useState<(boolean | null)[]>(new Array(exercises.length).fill(null));

    const allDone = answered.every(Boolean);
    const current = exercises[currentIdx];

    const handleAnswer = (correct: boolean) => {
        const newAnswered = [...answered];
        newAnswered[currentIdx] = true;
        setAnswered(newAnswered);

        const newResults = [...results];
        newResults[currentIdx] = correct;
        setResults(newResults);

        const newScore = correct ? score + 1 : score;
        if (correct) setScore(newScore);

        // Auto-advance after a delay
        setTimeout(() => {
            if (currentIdx < exercises.length - 1) {
                setCurrentIdx(currentIdx + 1);
            } else if (newAnswered.every(Boolean)) {
                onAllComplete?.(newScore, exercises.length);
            }
        }, 1200);
    };

    const renderQuestion = (q: InteractiveQuestion) => {
        switch (q.type) {
            case 'multipleChoice': return <MultipleChoice q={q} onAnswer={handleAnswer} />;
            case 'trueFalse': return <TrueFalse q={q} onAnswer={handleAnswer} />;
            case 'textInput': return <TextInput q={q} onAnswer={handleAnswer} />;
            case 'fillBlank': return <FillBlank q={q} onAnswer={handleAnswer} />;
            case 'ordering': return <Ordering q={q} onAnswer={handleAnswer} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                    Question {currentIdx + 1}/{exercises.length}
                </span>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                        style={{ width: `${((answered.filter(Boolean).length) / exercises.length) * 100}%` }}
                    />
                </div>
                <span className="text-xs text-gray-400">{score}/{exercises.length}</span>
            </div>

            {/* Question dots */}
            <div className="flex gap-1 justify-center">
                {exercises.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => answered[i] && setCurrentIdx(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIdx
                                ? 'bg-blue-400 scale-125'
                                : results[i] === true
                                    ? 'bg-green-400'
                                    : results[i] === false
                                        ? 'bg-red-400'
                                        : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>

            {/* Current question */}
            <div key={currentIdx} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                {renderQuestion(current)}
            </div>

            {/* Score summary */}
            {allDone && (
                <div className={`rounded-xl p-4 text-center border ${score === exercises.length
                        ? 'bg-green-900/30 border-green-600/40'
                        : score >= exercises.length / 2
                            ? 'bg-yellow-900/30 border-yellow-600/40'
                            : 'bg-red-900/30 border-red-600/40'
                    }`}>
                    <div className="text-3xl mb-1">
                        {score === exercises.length ? '🎉' : score >= exercises.length / 2 ? '👍' : '📚'}
                    </div>
                    <p className="text-white font-bold">
                        {score}/{exercises.length} correct
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {score === exercises.length
                            ? 'Perfect! Great job!'
                            : score >= exercises.length / 2
                                ? 'Good work! Keep practicing.'
                                : 'Keep going! Listen again and retry.'}
                    </p>
                </div>
            )}
        </div>
    );
}
