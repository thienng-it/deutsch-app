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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-2 pointer-events-none safe-area-pb">
            {/* Inner island container */}
            <nav className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20
                flex items-stretch overflow-hidden">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex-1 relative flex flex-col items-center justify-center py-2.5 gap-1 text-[11px] font-medium transition-all duration-300 ease-out group
                            ${isActive
                                ? 'text-red-500 bg-red-50/50 dark:bg-red-950/20'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {/* Active subtle indicator line */}
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-b-full transition-colors duration-300 ${isActive ? 'bg-red-500' : 'bg-transparent'}`} />

                                <span className={`text-xl leading-none transition-transform duration-300 group-hover:scale-110 group-active:scale-95 ${isActive ? '-translate-y-0.5 drop-shadow-[0_2px_4px_rgba(239,68,68,0.3)]' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-wide">
                                    {item.label}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
