import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import { LEVELS } from '../types';
import type { Preposition } from '../types';

const CASE_COLORS: Record<string, string> = {
    Akkusativ: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    Dativ: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    Genitiv: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    Wechselpräposition: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
};

export default function PrepositionsPage() {
    const [prepositions, setPrepositions] = useState<Preposition[]>([]);
    const [level, setLevel] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        contentApi.getPrepositions(level || undefined)
            .then(setPrepositions)
            .finally(() => setLoading(false));
    }, [level]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                    📍 Preposition Practice
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Master German prepositions and their cases
                </p>
            </div>

            {/* Level filter */}
            <div className="flex gap-2 flex-wrap">
                {['', ...LEVELS].map(l => (
                    <button
                        key={l || 'all'}
                        onClick={() => setLevel(l)}
                        className={`badge cursor-pointer transition-all ${level === l
                            ? l ? `badge-${l.toLowerCase()}` : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        {l || 'All Levels'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-4xl animate-bounce-in">📍</div>
                </div>
            ) : prepositions.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No prepositions found for this level.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {prepositions.map(prep => (
                        <div key={prep.id}
                            className="card hover:border-red-500/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`badge badge-${prep.level.toLowerCase()}`}>{prep.level}</span>
                                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${CASE_COLORS[prep.case_type] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                    {prep.case_type}
                                </span>
                            </div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                {prep.word}
                            </h3>
                            <p className="text-red-600 dark:text-red-400 font-medium text-sm mt-1">{prep.meaning}</p>

                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed">"{prep.example}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
