import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface NavbarProps { onMenuClick: () => void; }

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800
      flex items-center px-3 sm:px-4 gap-2 sm:gap-3 shrink-0 z-10">

      {/* Mobile hamburger */}
      <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2 rounded-lg" aria-label="Open menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-lg select-none">
        <span className="text-xl">🇩🇪</span>
        <span className="text-gray-900 dark:text-white">
          Deutsch<span className="text-red-500">App</span>
        </span>
      </Link>

      <div className="flex-1" />

      {/* Dark / Light toggle */}
      <button
        onClick={toggleTheme}
        className="btn-ghost p-2 rounded-lg"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </header>
  );
}
