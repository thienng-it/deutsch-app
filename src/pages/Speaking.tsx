import { Link } from 'react-router-dom';

export default function SpeakingPage() {
    const features = [
        { icon: '🎤', title: 'Pronunciation', desc: 'Listen and repeat exercises with native audio' },
        { icon: '💬', title: 'Conversations', desc: 'Practice everyday dialogue scenarios' },
        { icon: '📝', title: 'Vocab Drills', desc: 'Speak vocabulary words and get instant feedback' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                    🗣️ Speaking Practice
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Practice pronunciation and conversation skills
                </p>
            </div>

            {/* Coming soon hero */}
            <div className="card text-center py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
                <div className="relative">
                    <div className="text-6xl mb-4 animate-bounce-in">🗣️</div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Coming Soon</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                        Speaking exercises with pronunciation guides and conversation practice are being developed.
                    </p>
                </div>
            </div>

            {/* Preview features */}
            <div className="grid sm:grid-cols-3 gap-4">
                {features.map(f => (
                    <div key={f.title} className="card text-center py-6 opacity-60">
                        <div className="text-3xl mb-2">{f.icon}</div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{f.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{f.desc}</p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
