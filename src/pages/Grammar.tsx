import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import type { GrammarTopic } from '../types';
import { LEVELS, LEVEL_COLORS, LEVEL_BG } from '../types';

export default function GrammarPage() {
  const [topics, setTopics]     = useState<GrammarTopic[]>([]);
  const [selected, setSelected] = useState<GrammarTopic | null>(null);
  const [level, setLevel]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    setLoading(true);
    contentApi.getGrammar(level || undefined)
      .then(setTopics)
      .finally(() => setLoading(false));
  }, [level]);

  const openTopic = async (id: number) => {
    const full = await contentApi.getGrammarTopic(id);
    setSelected(full);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">✏️ Grammar</h1>
        <p className="text-gray-400 text-sm mt-1">Master German grammar rules from A1 to C1</p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 flex-wrap">
        {['', ...LEVELS].map(l => (
          <button
            key={l || 'all'}
            onClick={() => setLevel(l)}
            className={`badge cursor-pointer transition-all ${
              level === l
                ? l ? `badge-${l.toLowerCase()}` : 'bg-gray-700 text-white border-gray-600'
                : 'bg-gray-800/50 text-gray-500 border-gray-700 hover:text-gray-300'
            }`}
          >
            {l || 'All Levels'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading grammar topics…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => openTopic(topic.id)}
              className={`card text-left border ${LEVEL_BG[topic.level]} hover:scale-[1.02] transition-all cursor-pointer`}
            >
              <span className={`text-xs font-bold ${LEVEL_COLORS[topic.level]}`}>{topic.level}</span>
              <h3 className="font-semibold text-white mt-1 text-lg">{topic.title}</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{topic.description}</p>
              <span className="text-xs text-gray-500 mt-3 inline-block">Click to learn more →</span>
            </button>
          ))}
        </div>
      )}

      {/* Topic Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="card w-full max-w-2xl my-8 animate-bounce-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`badge badge-${selected.level.toLowerCase()} mb-2`}>{selected.level}</span>
                <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost p-2 rounded-lg shrink-0">✕</button>
            </div>

            <p className="text-gray-300 mb-4">{selected.description}</p>

            {selected.content && (
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">📘 Explanation</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.content}</p>
              </div>
            )}

            {selected.examples && selected.examples.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-400 mb-2">📝 Examples</h3>
                <ul className="space-y-2">
                  {selected.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-gray-600 mt-0.5">•</span>
                      <span className="text-gray-300 font-mono bg-gray-800 px-2 py-1 rounded">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => setSelected(null)} className="btn-secondary w-full mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
