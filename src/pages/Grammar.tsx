import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import type { GrammarTopic } from '../types';
import { LEVELS } from '../types';

export default function GrammarPage() {
  const [topics, setTopics] = useState<GrammarTopic[]>([]);
  const [selected, setSelected] = useState<GrammarTopic | null>(null);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    contentApi.getGrammar(level || undefined)
      .then(setTopics)
      .catch(() => setTopics([]))
      .finally(() => setLoading(false));
  }, [level]);

  const openTopic = async (id: number) => {
    const full = await contentApi.getGrammarTopic(id);
    setSelected(full);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">✏️ Grammar</h1>
        <p className="text-slate-500 dark:text-slate-400">Master German grammar rules from A1 to C1</p>
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-3 mb-8 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <span className="text-sm font-medium text-slate-500 flex items-center mr-2">Filter by Level:</span>
        <button
          onClick={() => setLevel('')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out border ${level === ''
            ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 shadow-md'
            : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          All Levels
        </button>
        {LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out border ${level === l
              ? `badge-${l.toLowerCase()} shadow-md scale-105`
              : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
          >
            {l}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium tracking-wide animate-pulse">Loading grammar topics...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-dashed">
              <span className="text-4xl mb-3 block">📚</span>
              <p className="font-medium text-lg text-slate-600 dark:text-slate-300">No topics found.</p>
              <p className="text-sm mt-1 text-slate-400">Try selecting a different level.</p>
            </div>
          ) : (
            topics.map(topic => (
              <div
                key={topic.id}
                onClick={() => openTopic(topic.id)}
                className="card-hover group flex flex-col h-full text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`badge badge-${topic.level.toLowerCase()}`}>
                    {topic.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {topic.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                  {topic.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                  <span className="text-xs font-semibold text-blue-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Topic Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 sm:p-6 overflow-hidden transition-opacity duration-300 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="card w-full max-w-2xl animate-bounce-in shadow-2xl border-slate-200 dark:border-slate-700 p-0 overflow-hidden flex flex-col max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col relative shrink-0">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 btn-ghost p-2 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="mb-3 mt-1">
                <span className={`badge badge-${selected.level.toLowerCase()}`}>{selected.level}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 pr-8">{selected.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{selected.description}</p>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {selected.content && (
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">📘</span> Explanation
                  </h3>
                  <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.content}
                  </div>
                </div>
              )}

              {selected.examples && selected.examples.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">📝</span> Examples
                  </h3>
                  <ul className="space-y-3">
                    {selected.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-green-500 mt-0.5 shrink-0">❖</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono tracking-tight leading-relaxed">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-800/20">
              <button onClick={() => setSelected(null)} className="btn-secondary w-full py-2.5 text-base">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
