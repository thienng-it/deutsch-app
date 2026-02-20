import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import { progressApi } from '../api/progress';
import type { VocabItem } from '../types';
import { LEVELS, LEVEL_COLORS, LEVEL_BG } from '../types';

export default function VocabularyPage() {
  const [items, setItems]         = useState<VocabItem[]>([]);
  const [total, setTotal]         = useState(0);
  const [level, setLevel]         = useState('');
  const [category, setCategory]   = useState('');
  const [search, setSearch]       = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading]     = useState(false);
  const [offset, setOffset]       = useState(0);
  const [showAdd, setShowAdd]     = useState(false);
  const LIMIT = 30;

  const load = (reset = true) => {
    setLoading(true);
    const off = reset ? 0 : offset;
    if (reset) setOffset(0);
    contentApi.getVocabulary({ level: level || undefined, category: category || undefined, search: search || undefined, limit: LIMIT, offset: off })
      .then(d => {
        setItems(reset ? d.items : prev => [...prev, ...d.items]);
        setTotal(d.total);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [level, category, search]);

  useEffect(() => {
    contentApi.getCategories(level || undefined).then(setCategories);
  }, [level]);

  const markMastered = async (item: VocabItem) => {
    await progressApi.updateProgress({ contentType: 'vocabulary', contentId: item.id, level: item.level, score: 100, completed: true });
  };

  const [newWord, setNewWord] = useState({ german: '', english: '', level: 'A1', category: '', exampleSentence: '' });
  const [addError, setAddError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    try {
      await contentApi.addVocabulary(newWord);
      setNewWord({ german: '', english: '', level: 'A1', category: '', exampleSentence: '' });
      setShowAdd(false);
      load();
    } catch {
      setAddError('Failed to add word');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">📖 Vocabulary</h1>
          <p className="text-gray-400 text-sm mt-1">{total.toLocaleString()} words in your library</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary btn-sm">+ Add Word</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          className="input max-w-xs"
          placeholder="🔍 Search German or English..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="input w-auto" value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select className="input w-auto" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Add word modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md animate-bounce-in">
            <h2 className="text-lg font-bold text-white mb-4">Add New Word</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <input required className="input" placeholder="German word" value={newWord.german} onChange={e => setNewWord(p => ({ ...p, german: e.target.value }))} />
              <input required className="input" placeholder="English translation" value={newWord.english} onChange={e => setNewWord(p => ({ ...p, english: e.target.value }))} />
              <div className="flex gap-2">
                <select className="input" value={newWord.level} onChange={e => setNewWord(p => ({ ...p, level: e.target.value }))}>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <input className="input" placeholder="Category (optional)" value={newWord.category} onChange={e => setNewWord(p => ({ ...p, category: e.target.value }))} />
              </div>
              <input className="input" placeholder="Example sentence (optional)" value={newWord.exampleSentence} onChange={e => setNewWord(p => ({ ...p, exampleSentence: e.target.value }))} />
              {addError && <p className="text-red-400 text-sm">{addError}</p>}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary flex-1">Add Word</button>
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Level tabs */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setLevel('')} className={`badge cursor-pointer ${!level ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-800/50 text-gray-500 border-gray-700 hover:text-gray-300'}`}>
          All
        </button>
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)} className={`badge cursor-pointer badge-${l.toLowerCase()} ${level !== l && 'opacity-50 hover:opacity-100'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Word grid */}
      {loading && items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">Loading vocabulary…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map(item => (
            <div key={item.id} className={`card border ${LEVEL_BG[item.level]} group relative`}>
              <div className="flex items-start justify-between mb-1">
                <span className={`text-xs font-bold ${LEVEL_COLORS[item.level]}`}>{item.level}</span>
                {item.category && <span className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">{item.category}</span>}
              </div>
              <p className="text-xl font-bold text-white mt-1">{item.german}</p>
              <p className="text-gray-300 mt-0.5">{item.english}</p>
              {item.example_sentence && (
                <p className="text-xs text-gray-500 mt-2 italic border-t border-gray-800 pt-2 leading-relaxed">
                  "{item.example_sentence}"
                </p>
              )}
              <button
                onClick={() => markMastered(item)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs btn-ghost py-1 px-2"
                title="Mark as mastered"
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {items.length < total && (
        <div className="text-center">
          <button
            onClick={() => { const newOff = offset + LIMIT; setOffset(newOff); load(false); }}
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? 'Loading…' : `Load More (${total - items.length} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}
