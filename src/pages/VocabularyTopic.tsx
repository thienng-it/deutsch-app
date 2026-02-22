import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { contentApi } from '../api/content';
import { progressApi } from '../api/progress';
import type { VocabItem } from '../types';
import { LEVELS } from '../types';

export default function VocabularyTopicPage() {
  const { topic } = useParams<{ topic: string }>();
  const [searchParams] = useSearchParams();
  const isAllWords = topic?.toLowerCase() === 'all';
  const initialCategory = isAllWords ? '' : (topic || '');
  const initialSearch = searchParams.get('q') || '';

  const [items, setItems] = useState<VocabItem[]>([]);
  const [total, setTotal] = useState(0);
  const [level, setLevel] = useState('');
  const [category] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<VocabItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const LIMIT = 30;

  /* ── Audio ──────────────────────────────────────────────────────── */
  const playAudio = (text: string, id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const de = voices.filter(v => v.lang.startsWith('de'));
    if (de.length) u.voice = de.find(v => /Premium|Google|Siri|Anna/.test(v.name)) || de[0];
    u.onstart = () => setPlayingItem(id);
    u.onend = () => setPlayingItem(null);
    u.onerror = () => setPlayingItem(null);
    window.speechSynthesis.speak(u);
  };

  /* ── Data Loading ──────────────────────────────────────────────── */
  const load = (currentOffset: number, isLoadMore = false) => {
    setLoading(true);
    contentApi.getVocabulary({
      level: level || undefined,
      category: category || undefined,
      search: search || undefined,
      limit: LIMIT,
      offset: currentOffset,
    })
      .then(d => {
        setItems(isLoadMore ? prev => {
          const ids = new Set(prev.map(p => p.id));
          return [...prev, ...d.items.filter(i => !ids.has(i.id))];
        } : d.items);
        setTotal(d.total);
      })
      .catch(() => { if (!isLoadMore) { setItems([]); setTotal(0); } })
      .finally(() => setLoading(false));
  };

  useEffect(() => { setOffset(0); load(0, false); }, [level, category, search]);

  const markMastered = async (item: VocabItem) => {
    await progressApi.updateProgress({ contentType: 'vocabulary', contentId: item.id, level: item.level, score: 100, completed: true });
  };

  /* ── Add Word State ────────────────────────────────────────────── */
  const [newWord, setNewWord] = useState({
    german: '', phonetic: '', english: '', level: 'A1', category: '', exampleSentence: '',
    partOfSpeech: '', gender: '', plural: '', conjugation: '', synonyms: '', antonyms: '', relatedWords: '', grammarNotes: '',
  });
  const [addError, setAddError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    try {
      await contentApi.addVocabulary(newWord);
      setNewWord({ german: '', phonetic: '', english: '', level: 'A1', category: '', exampleSentence: '', partOfSpeech: '', gender: '', plural: '', conjugation: '', synonyms: '', antonyms: '', relatedWords: '', grammarNotes: '' });
      setShowAdd(false);
      setOffset(0);
      load(0, false);
    } catch { setAddError('Failed to add word'); }
  };

  /* ── Gender Color Helper ───────────────────────────────────────── */
  const genderColor = (g: string | null) => {
    if (g === 'der') return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300';
    if (g === 'die') return 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300';
    if (g === 'das') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300';
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mb-8">
        <Link to="/vocabulary" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Topics
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
              {isAllWords ? 'All Vocabulary' : `${topic}`}
            </h1>
            {total > 0 && (
              <p className="text-slate-500 mt-1">{total.toLocaleString()} words</p>
            )}
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Word
          </button>
        </div>
      </div>

      {/* ── Toolbar: Search + Level + View Toggle ──────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            className="input w-full pl-10 py-2.5 bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
            placeholder="Search German or English…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Level Pills */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1.5">
          <button
            onClick={() => setLevel('')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!level ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >All</button>
          {LEVELS.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${level === l ? `badge badge-${l.toLowerCase()} shadow-sm` : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >{l}</button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            title="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" /></svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            title="List view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>
          </button>
        </div>
      </div>

      {/* ── Add Word Modal ─────────────────────────────────────────── */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in" onClick={() => setShowAdd(false)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add New Word</h2>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">German *</label>
                  <input required className="input w-full text-lg font-bold" placeholder="z.B. Apfel" value={newWord.german} onChange={e => setNewWord(p => ({ ...p, german: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">English *</label>
                  <input required className="input w-full text-lg" placeholder="Apple" value={newWord.english} onChange={e => setNewWord(p => ({ ...p, english: e.target.value }))} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Level</label>
                  <select className="input w-full text-sm font-bold" value={newWord.level} onChange={e => setNewWord(p => ({ ...p, level: e.target.value }))}>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gender</label>
                  <select className="input w-full text-sm" value={newWord.gender} onChange={e => setNewWord(p => ({ ...p, gender: e.target.value }))}>
                    <option value="">—</option>
                    <option value="der">der</option>
                    <option value="die">die</option>
                    <option value="das">das</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Part of Speech</label>
                  <select className="input w-full text-sm" value={newWord.partOfSpeech} onChange={e => setNewWord(p => ({ ...p, partOfSpeech: e.target.value }))}>
                    <option value="">—</option>
                    <option value="Noun">Noun</option>
                    <option value="Verb">Verb</option>
                    <option value="Adjective">Adj</option>
                    <option value="Adverb">Adv</option>
                    <option value="Preposition">Prep</option>
                    <option value="Expression">Expr</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                  <input className="input w-full text-sm" placeholder="Food" value={newWord.category} onChange={e => setNewWord(p => ({ ...p, category: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phonetic</label>
                  <input className="input w-full text-sm font-mono" placeholder="[ˈapfəl]" value={newWord.phonetic} onChange={e => setNewWord(p => ({ ...p, phonetic: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Example Sentence</label>
                <input className="input w-full text-sm" placeholder="Ich esse einen Apfel." value={newWord.exampleSentence} onChange={e => setNewWord(p => ({ ...p, exampleSentence: e.target.value }))} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Plural</label>
                  <input className="input w-full text-sm" placeholder="Äpfel" value={newWord.plural} onChange={e => setNewWord(p => ({ ...p, plural: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Conjugation</label>
                  <input className="input w-full text-sm" placeholder="isst, aß, gegessen" value={newWord.conjugation} onChange={e => setNewWord(p => ({ ...p, conjugation: e.target.value }))} />
                </div>
              </div>

              {addError && (
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">❌ {addError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors">Save Word</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Detail Modal ──────────────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-fade-in" onClick={() => setSelectedItem(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 pt-5 pb-4 z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge badge-${selectedItem.level.toLowerCase()} text-[10px]`}>{selectedItem.level}</span>
                    {selectedItem.category && <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{selectedItem.category}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{selectedItem.german}</h2>
                    <button
                      onClick={() => playAudio(selectedItem.german, `modal-${selectedItem.id}`)}
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${playingItem === `modal-${selectedItem.id}` ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-blue-500 hover:text-white'}`}
                    >
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                  <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-1">{selectedItem.english}</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedItem.phonetic && <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{selectedItem.phonetic}</span>}
                {selectedItem.part_of_speech && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">{selectedItem.part_of_speech}</span>}
                {selectedItem.gender && <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${genderColor(selectedItem.gender)}`}>{selectedItem.gender}</span>}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 flex-1">
              {/* Info grid */}
              {(selectedItem.plural || selectedItem.conjugation || selectedItem.synonyms || selectedItem.antonyms || selectedItem.related_words) && (
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'Plural', value: selectedItem.plural },
                    { label: 'Conjugation', value: selectedItem.conjugation },
                    { label: 'Synonyms', value: selectedItem.synonyms },
                    { label: 'Antonyms', value: selectedItem.antonyms },
                    { label: 'Related', value: selectedItem.related_words, span: true },
                  ].filter(d => d.value).map(d => (
                    <div key={d.label} className={`bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl ${d.span ? 'col-span-2' : ''}`}>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{d.label}</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{d.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grammar note */}
              {selectedItem.grammar_notes && (
                <div className="flex gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <span className="text-lg">📝</span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Grammar Note</div>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{selectedItem.grammar_notes}</p>
                  </div>
                </div>
              )}

              {/* Example */}
              {selectedItem.example_sentence && (
                <div className="flex gap-2.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <span className="text-lg">💬</span>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">Example</div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 italic leading-relaxed mb-2">"{selectedItem.example_sentence}"</p>
                    <button
                      onClick={() => playAudio(selectedItem.example_sentence!, `modal-ex-${selectedItem.id}`)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${playingItem === `modal-ex-${selectedItem.id}` ? 'bg-blue-600 text-white' : 'bg-blue-200 dark:bg-blue-800/60 text-blue-700 dark:text-blue-200 hover:bg-blue-300 dark:hover:bg-blue-700'}`}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Play
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 pt-2 flex gap-3">
              <button
                onClick={() => { markMastered(selectedItem); setSelectedItem(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Mark Mastered
              </button>
              <button onClick={() => setSelectedItem(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Word Cards ─────────────────────────────────────────────── */}
      {loading && items.length === 0 ? (
        <div className="py-20 flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading vocabulary…</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── Grid View ──── */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group text-left p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 relative"
            >
              {/* Top row: level + audio */}
              <div className="flex items-center justify-between mb-3">
                <span className={`badge badge-${item.level.toLowerCase()} text-[9px] px-2 py-0.5`}>{item.level}</span>
                <button
                  onClick={e => playAudio(item.german, `card-${item.id}`, e)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${playingItem === `card-${item.id}` ? 'bg-blue-600 text-white shadow-md scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-blue-500 hover:text-white'}`}
                >
                  <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>

              {/* German word */}
              <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 leading-tight mb-1 break-words">
                {item.german}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.gender && <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${genderColor(item.gender)}`}>{item.gender}</span>}
                {item.part_of_speech && <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{item.part_of_speech}</span>}
                {item.phonetic && <span className="text-[10px] font-mono text-slate-400">{item.phonetic}</span>}
              </div>

              {/* English */}
              <p className="text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">{item.english}</p>

              {/* Example preview */}
              {item.example_sentence && (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic line-clamp-1 mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                  "{item.example_sentence}"
                </p>
              )}

              {/* Mastered button (hover) */}
              <div
                onClick={e => { e.stopPropagation(); markMastered(item); }}
                className="absolute top-3 right-12 w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                title="Mark mastered"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* ── List View ──── */
        <div className="space-y-2">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group w-full text-left flex items-center gap-4 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all"
            >
              {/* Audio */}
              <button
                onClick={e => playAudio(item.german, `list-${item.id}`, e)}
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${playingItem === `list-${item.id}` ? 'bg-blue-600 text-white shadow-md scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-blue-500 hover:text-white'}`}
              >
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>

              {/* Word */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 truncate">{item.german}</span>
                  {item.gender && <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${genderColor(item.gender)}`}>{item.gender}</span>}
                  {item.part_of_speech && <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hidden sm:inline">{item.part_of_speech}</span>}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{item.english}</p>
              </div>

              {/* Level badge */}
              <span className={`badge badge-${item.level.toLowerCase()} text-[9px] px-2 py-0.5 shrink-0`}>{item.level}</span>

              {/* Arrow hint */}
              <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && !loading && (
        <div className="py-16 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <span className="text-4xl block mb-3">📖</span>
          <p className="font-semibold text-lg text-slate-600 dark:text-slate-300">No words found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Load More */}
      {items.length < total && (
        <div className="text-center mt-10">
          <button
            onClick={() => { const next = offset + LIMIT; setOffset(next); load(next, true); }}
            disabled={loading}
            className="px-8 py-2.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />Loading…</span>
            ) : (
              `Load More · ${total - items.length} remaining`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
