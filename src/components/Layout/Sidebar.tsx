import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const learnItems = [
  { to: '/', icon: '📊', label: 'Dashboard' },
  { to: '/alphabet', icon: '🔤', label: 'Alphabet' },
  { to: '/numbers', icon: '🔢', label: 'Numbers' },
  { to: '/vocabulary', icon: '📚', label: 'Vocabulary' },
  { to: '/grammar', icon: '✏️', label: 'Grammar' },
  { to: '/reading', icon: '📖', label: 'Reading' },
  { to: '/prepositions', icon: '📍', label: 'Prepositions' },
];

const moreItems = [
  { to: '/games', icon: '🎮', label: 'Games' },
  { to: '/speaking', icon: '🗣️', label: 'Speaking' },
  { to: '/writing', icon: '✍️', label: 'Writing' },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out relative overflow-hidden group
    ${collapsed ? 'justify-center' : ''}
    ${isActive
      ? 'bg-gradient-to-r from-red-500/10 to-transparent text-red-600 dark:text-red-400 border-l-2 border-red-500'
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border-l-2 border-transparent'}
  `;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30
      bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800
      flex flex-col transform transition-all duration-300 ease-in-out shadow-sm
      lg:relative lg:translate-x-0 lg:z-auto
      ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
      ${open ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className={`flex items-center gap-3 min-w-0 transition-opacity duration-300 ${collapsed ? 'opacity-0 lg:hidden' : 'opacity-100'}`}>
          <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">🇩🇪</span>
          <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap text-lg">
            Deutsch<span className="text-red-500">App</span>
          </span>
        </div>
        {collapsed && <div className="hidden lg:flex w-full justify-center"><span className="text-2xl">🇩🇪</span></div>}
        <button onClick={onClose} className="lg:hidden btn-ghost p-2 rounded-xl" aria-label="Close menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {!collapsed && (
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
            Learn
          </p>
        )}
        {learnItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onClose}
            className={linkClass} title={collapsed ? item.label : undefined}>
            <span className="text-lg w-6 text-center shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            {/* Hover highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </NavLink>
        ))}

        <div className={`my-4 mx-3`}>
          <div className="border-t border-slate-200 dark:border-slate-800/60" />
        </div>

        {!collapsed && (
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
            More
          </p>
        )}
        {moreItems.map(item => (
          <NavLink key={item.to} to={item.to} onClick={onClose}
            className={linkClass} title={collapsed ? item.label : undefined}>
            <span className="text-lg w-6 text-center shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle — desktop only */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={onToggleCollapse}
          className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200
            hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 ease-out group
            ${collapsed ? 'justify-center border-transparent' : 'border border-slate-200 dark:border-slate-700 shadow-sm'}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-in-out group-hover:scale-110 ${collapsed ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Hide sidebar</span>}
        </button>

        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              Deutsch Application
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
