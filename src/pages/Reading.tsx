import { useState } from 'react';
import { READING_PASSAGES } from '../data/reading';
import InteractiveExercise from '../components/InteractiveExercise';

export default function ReadingPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [filterLevel, setFilterLevel] = useState<string>('All');

    const selectedPassage = READING_PASSAGES.find(p => p.id === selectedId);

    const categories = ['All', 'Exam Practice', 'Working & Living'];
    const levels = ['All', 'A1', 'A2', 'B1', 'B2', 'C1'];

    const filteredPassages = READING_PASSAGES.filter(p => {
        if (filterCategory !== 'All' && p.category !== filterCategory) return false;
        if (filterLevel !== 'All' && p.level !== filterLevel) return false;
        return true;
    });

    const sortedFilteredPassages = [...filteredPassages].sort((a, b) => {
        const levelWeight: Record<string, number> = { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6 };
        const weightA = levelWeight[a.level] || 99;
        const weightB = levelWeight[b.level] || 99;
        return weightA - weightB;
    });

    if (selectedPassage) {
        return (
            <div className="h-full flex flex-col animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => setSelectedId(null)}
                        className="btn-ghost p-2"
                        title="Back to Reading Hub"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {selectedPassage.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`badge badge-${selectedPassage.level.toLowerCase()}`}>
                                {selectedPassage.level}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-blue-500 font-semibold tracking-wide uppercase">
                                {selectedPassage.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[60vh]">
                    {/* Left Pane: German Text */}
                    <div className="flex-1 card flex flex-col min-h-[40vh] lg:min-h-0 overflow-hidden p-0 max-h-[80vh] lg:max-h-none">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20 shrink-0">
                            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Lesetext (Reading Text)</h2>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                ⏱️ ~{selectedPassage.readingTimeMin} min read
                            </span>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed">
                            {/* Render basic markdown-like structures manually for stability, or just pre-format the text */}
                            <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{
                                __html: selectedPassage.content
                                    // very crude markdown parser for bolding/headers
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/#(.*)/g, '<h3 class="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white">$1</h3>')
                                    .replace(/---/g, '<hr class="my-6 border-slate-200 dark:border-slate-800" />')
                            }} />
                        </div>
                    </div>

                    {/* Right Pane: Interactive Questions */}
                    <div className="w-full lg:w-[450px] card overflow-y-auto flex flex-col p-0 max-h-[80vh] lg:max-h-none">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 sticky top-0 z-10 shrink-0">
                            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">Fragen (Questions)</h2>
                        </div>
                        <div className="p-5 flex-1 overflow-y-auto">
                            <InteractiveExercise exercises={selectedPassage.questions} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">📖 Reading Practice</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Prepare for German exams or practice real-world reading scenarios
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">Category</span>
                    <select
                        value={filterCategory}
                        onChange={e => setFilterCategory(e.target.value)}
                        className="input py-2"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">Level</span>
                    <select
                        value={filterLevel}
                        onChange={e => setFilterLevel(e.target.value)}
                        className="input py-2"
                    >
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
            </div>

            {/* Reading Passages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedFilteredPassages.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-dashed">
                        <span className="text-4xl mb-3 block">🔍</span>
                        <p className="font-medium text-lg text-slate-600 dark:text-slate-300">No reading passages found.</p>
                        <p className="text-sm mt-1 text-slate-400">Try adjusting your category or level filters.</p>
                    </div>
                ) : (
                    sortedFilteredPassages.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedId(p.id)}
                            className="card-hover group flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={`badge badge-${p.level.toLowerCase()}`}>
                                    {p.level}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase truncate max-w-[150px]">
                                    {p.category}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                {p.title}
                            </h3>

                            <div className="mt-auto pt-5 flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1.5 rounded-lg">
                                    <span className="text-lg">⏱️</span> {p.readingTimeMin} min
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1.5 rounded-lg">
                                    <span className="text-lg">❓</span> {p.questions.length} Qs
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
