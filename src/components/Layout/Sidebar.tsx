import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const learnItems = [
  { to: '/', icon: '📅', label: 'Learning Plan' },
  { to: '/vocabulary', icon: '📖', label: 'Vocabulary' },
  { to: '/grammar', icon: '✏️', label: 'Grammar' },
  { to: '/prepositions', icon: '📍', label: 'Prepositions' },
];

const moreItems = [
  { to: '/games', icon: '🎮', label: 'Games' },
  { to: '/progress', icon: '📈', label: 'Progress' },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
    ${collapsed ? 'justify-center' : ''}
    ${isActive
      ? 'bg-red-600/20 text-red-400 border border-red-600/30 shadow-sm shadow-red-900/10'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/60'}
  `;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30
      bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
      flex flex-col transform transition-all duration-300 ease-in-out
      lg:relative lg:translate-x-0 lg:z-auto
      ${collapsed ? 'lg:w-[68px]' : 'lg:w-60'}
      ${open ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0">🇩🇪</span>
          {!collapsed && (
            <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
              Deutsch<span className="text-red-500">App</span>
            </span>
          )}
        </div>
        <button onClick={onClose} className="lg:hidden btn-ghost p-1.5 rounded-lg" aria-label="Close menu">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-1.5">
            Learn
          </p>
        )}
        {learnItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onClose}
            className={linkClass} title={collapsed ? item.label : undefined}>
            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}

        <div className={`${collapsed ? 'my-2 mx-1' : 'my-2 mx-2'}`}>
          <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>

        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-1.5">
            More
          </p>
        )}
        {moreItems.map(item => (
          <NavLink key={item.to} to={item.to} onClick={onClose}
            className={linkClass} title={collapsed ? item.label : undefined}>
            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle — desktop only */}
      <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggleCollapse}
          className={`hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all duration-200
            ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Hide sidebar</span>}
        </button>

        {!collapsed && (
          <div className="px-3 py-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Deutsch Learning App
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
