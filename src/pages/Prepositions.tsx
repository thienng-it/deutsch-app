import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import { LEVELS, LEVEL_COLORS, LEVEL_BG } from '../types';
import type { Preposition } from '../types';

export default function PrepositionsPage() {
    const [prepositions, setPrepositions] = useState<Preposition[]>([]);
    const [level, setLevel] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Use an API call we will create
        contentApi.getPrepositions(level || undefined)
            .then(setPrepositions)
            .finally(() => setLoading(false));
    }, [level]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">📍 Preposition Practice</h1>
                <p className="text-gray-400 text-sm mt-1">Master German prepositions and cases from A1 to B1</p>
            </div>

            {/* Level filter */}
            <div className="flex gap-2 flex-wrap">
                {['', ...LEVELS].map(l => (
                    <button
                        key={l || 'all'}
                        onClick={() => setLevel(l)}
                        className={`badge cursor-pointer transition-all ${level === l
                                ? l ? `badge-${l.toLowerCase()}` : 'bg-gray-700 text-white border-gray-600'
                                : 'bg-gray-800/50 text-gray-500 border-gray-700 hover:text-gray-300'
                            }`}
                    >
                        {l || 'All Levels'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-16 text-gray-500">Loading prepositions…</div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {prepositions.map(prep => (
                        <div
                            key={prep.id}
                            className={`card text-left border ${LEVEL_BG[prep.level] || 'border-gray-700'} hover:scale-[1.02] transition-all`}
                        >
                            <div className="flex justify-between items-start">
                                <span className={`text-xs font-bold ${LEVEL_COLORS[prep.level] || 'text-gray-400'}`}>{prep.level}</span>
                                <span className="text-xs font-mono bg-blue-900/40 text-blue-300 px-2 rounded-full">{prep.case_type}</span>
                            </div>
                            <h3 className="font-bold text-white mt-1 text-2xl">{prep.word}</h3>
                            <p className="text-red-400 font-medium text-sm mt-1">{prep.meaning}</p>

                            <div className="mt-4 pt-4 border-t border-gray-700/50">
                                <p className="text-gray-300 text-sm italic">"{prep.example}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
