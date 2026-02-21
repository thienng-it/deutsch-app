import { useState } from 'react';
import { READING_PASSAGES } from '../data/reading';
import InteractiveExercise from '../components/InteractiveExercise';
import { LEVEL_COLORS } from '../types';

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

    if (selectedPassage) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => setSelectedId(null)}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                        title="Back to Reading Hub"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            {selectedPassage.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-bold ${LEVEL_COLORS[selectedPassage.level] || 'text-gray-400'}`}>
                                {selectedPassage.level}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-blue-400 font-medium">
                                {selectedPassage.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                    {/* Left Pane: German Text */}
                    <div className="flex-1 bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col min-h-[40vh] lg:min-h-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Lesetext (Reading Text)</h2>
                            <span className="text-xs text-gray-400">⏱️ ~{selectedPassage.readingTimeMin} min read</span>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 prose prose-sm dark:prose-invert max-w-none">
                            {/* Render basic markdown-like structures manually for stability, or just pre-format the text */}
                            <div className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-200" dangerouslySetInnerHTML={{
                                __html: selectedPassage.content
                                    // very crude markdown parser for bolding/headers
                                    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                                    .replace(/#(.*)/g, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
                                    .replace(/---/g, '<hr class="my-4 border-gray-200 dark:border-gray-700" />')
                            }} />
                        </div>
                    </div>

                    {/* Right Pane: Interactive Questions */}
                    <div className="w-full lg:w-[450px] bg-white dark:bg-gray-800/80 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-y-auto flex flex-col">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0 z-10">
                            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Fragen (Questions)</h2>
                        </div>
                        <div className="p-5 flex-1">
                            <InteractiveExercise exercises={selectedPassage.questions} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reading Practice</h1>
            <p className="text-gray-500 mb-8">
                Prepare for your German exams or practice real-world reading scenarios for working and living in Germany.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Category:</span>
                    <select
                        value={filterCategory}
                        onChange={e => setFilterCategory(e.target.value)}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 text-gray-900 dark:text-white"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Level:</span>
                    <select
                        value={filterLevel}
                        onChange={e => setFilterLevel(e.target.value)}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 text-gray-900 dark:text-white"
                    >
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
            </div>

            {/* Reading Passages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPassages.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-800/20 rounded-2xl border border-gray-700/50 dashed">
                        No reading passages found matching your filters.
                    </div>
                ) : (
                    filteredPassages.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedId(p.id)}
                            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 ${LEVEL_COLORS[p.level] || 'text-gray-400'}`}>
                                    {p.level}
                                </span>
                                <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                                    {p.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {p.title}
                            </h3>
                            <div className="mt-auto pt-4 flex items-center justify-between">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    ⏱️ {p.readingTimeMin} min read
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    ❔ {p.questions.length} questions
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
