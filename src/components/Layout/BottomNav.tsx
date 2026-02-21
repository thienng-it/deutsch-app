import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/', icon: '🏠', label: 'Home', end: true },
    { to: '/vocabulary', icon: '📖', label: 'Vocab' },
    { to: '/grammar', icon: '✏️', label: 'Grammar' },
    { to: '/games', icon: '🎮', label: 'Games' },
    { to: '/reading', icon: '📚', label: 'Reading' },
];

export default function BottomNav() {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30
      bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800
      flex items-stretch safe-area-pb">
            {navItems.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                        `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors
            ${isActive
                            ? 'text-red-500'
                            : 'text-gray-500 dark:text-gray-400'}`
                    }
                >
                    <span className="text-xl leading-none">{item.icon}</span>
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}
