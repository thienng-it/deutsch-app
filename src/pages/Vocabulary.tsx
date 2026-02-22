import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentApi } from '../api/content';

export default function VocabularyPage() {
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    contentApi.getCategoriesWithCounts()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/vocabulary/all?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const getTopicStyle = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('family')) return { icon: '👨‍👩‍👧‍👦', gradient: 'from-rose-500 to-pink-600' };
    if (c.includes('kitchen') || c.includes('food')) return { icon: '🍳', gradient: 'from-orange-500 to-amber-600' };
    if (c.includes('restaurant')) return { icon: '🍽️', gradient: 'from-amber-500 to-yellow-600' };
    if (c.includes('travel')) return { icon: '✈️', gradient: 'from-sky-500 to-cyan-600' };
    if (c.includes('housing')) return { icon: '🏠', gradient: 'from-teal-500 to-emerald-600' };
    if (c.includes('work') || c.includes('career')) return { icon: '💼', gradient: 'from-indigo-500 to-violet-600' };
    if (c.includes('emotion')) return { icon: '🤔', gradient: 'from-purple-500 to-fuchsia-600' };
    if (c.includes('environment')) return { icon: '🌍', gradient: 'from-emerald-500 to-green-600' };
    if (c.includes('society')) return { icon: '🤝', gradient: 'from-blue-500 to-indigo-600' };
    if (c.includes('formal') || c.includes('academic')) return { icon: '🎓', gradient: 'from-slate-500 to-gray-600' };
    if (c.includes('verb')) return { icon: '🏃', gradient: 'from-fuchsia-500 to-pink-600' };
    if (c.includes('health') || c.includes('body')) return { icon: '🏥', gradient: 'from-red-500 to-rose-600' };
    if (c.includes('sport')) return { icon: '⚽', gradient: 'from-lime-500 to-green-600' };
    if (c.includes('tech') || c.includes('computer')) return { icon: '💻', gradient: 'from-cyan-500 to-blue-600' };
    if (c.includes('nature') || c.includes('animal')) return { icon: '🌿', gradient: 'from-green-500 to-teal-600' };
    if (c.includes('city') || c.includes('place')) return { icon: '🏙️', gradient: 'from-violet-500 to-purple-600' };
    if (c.includes('time') || c.includes('date')) return { icon: '🕐', gradient: 'from-amber-500 to-orange-600' };
    if (c.includes('money') || c.includes('finance')) return { icon: '💰', gradient: 'from-yellow-500 to-amber-600' };
    if (c.includes('school') || c.includes('education')) return { icon: '📖', gradient: 'from-blue-500 to-sky-600' };
    if (c.includes('basic') || c.includes('greeting') || c.includes('number') || c.includes('color')) return { icon: '⭐', gradient: 'from-yellow-400 to-orange-500' };
    return { icon: '📚', gradient: 'from-slate-500 to-slate-600' };
  };

  const totalWords = categories.reduce((a, b) => a + b.count, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
          Wortschatz
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {totalWords > 0
            ? `${totalWords.toLocaleString()} words across ${categories.length} topics`
            : 'Build your German vocabulary, one topic at a time.'}
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">🔍</span>
          <input
            className="input w-full pl-12 pr-28 py-3.5 text-base rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm focus:shadow-md transition-shadow"
            placeholder="Search any word..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Browse All Banner */}
      <div className="mb-8">
        <Link
          to="/vocabulary/all"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🔠
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">Browse All Words</h2>
            <p className="text-blue-100 text-sm">Search, filter, and explore the entire dictionary</p>
          </div>
          <svg className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Section Divider */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Topics</h2>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Topics Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading topics...</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ category: cat, count }) => {
            const style = getTopicStyle(cat);
            return (
              <Link
                key={cat}
                to={`/vocabulary/${encodeURIComponent(cat)}`}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat}
                  </h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {count > 0 ? `${count} words` : 'Explore →'}
                  </p>
                </div>
                <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}

          {categories.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-slate-200 dark:border-slate-800 border-dashed">
              <span className="text-4xl mb-3 block">📭</span>
              <p className="font-medium text-lg text-slate-600 dark:text-slate-300">No topics found yet.</p>
              <p className="text-sm text-slate-400 mt-1">Start adding vocabulary to see topics appear.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
