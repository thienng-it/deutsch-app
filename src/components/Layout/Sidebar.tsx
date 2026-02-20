import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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
  { to: '/listening', icon: '🎧', label: 'Listening' },
  { to: '/prepositions', icon: '📍', label: 'Prepositions' },
  { to: '/materials', icon: '📁', label: 'Materials' },
];

const moreItems = [
  { to: '/games', icon: '🎮', label: 'Games' },
  { to: '/progress', icon: '📈', label: 'Progress' },
  { to: '/profile', icon: '👤', label: 'Profile' },
];

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const { user } = useAuth();

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
      ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
      ${open ? 'translate-x-0 w-64' : '-translate-x-full'}
    `}>
      {/* Logo */}
      <div className={`h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 shrink-0`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0">🇩🇪</span>
          {!collapsed && (
            <span className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
              Deutsch<span className="text-red-500">App</span>
            </span>
          )}
        </div>
        <button onClick={onClose} className="lg:hidden btn-ghost p-1 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User info — shown only when expanded */}
      {user && !collapsed && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
              {user.displayName[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.displayName}</p>
              <span className={`badge badge-${user.currentLevel.toLowerCase()}`}>{user.currentLevel}</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed user avatar */}
      {user && collapsed && (
        <div className="flex justify-center py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm text-white">
            {user.displayName[0].toUpperCase()}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">
            Learn
          </p>
        )}
        {learnItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={linkClass}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}

        {/* Divider */}
        <div className={`${collapsed ? 'my-3 mx-2' : 'my-3 mx-3'}`}>
          <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>

        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-2">
            More
          </p>
        )}
        {moreItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={linkClass}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block px-2 py-3 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggleCollapse}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium
            text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-800/60
            transition-all duration-200
            ${collapsed ? 'justify-center' : ''}
          `}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-4 h-4 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Hide sidebar</span>}
        </button>
      </div>

      {/* Footer — expanded only */}
      {!collapsed && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Local · Private
          </div>
        </div>
      )}
    </aside>
  );
}
