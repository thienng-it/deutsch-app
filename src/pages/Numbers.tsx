import { useState } from 'react';
const NUMBERS_0_12 = [
    { num: 0, word: 'null' },
    { num: 1, word: 'eins' },
    { num: 2, word: 'zwei' },
    { num: 3, word: 'drei' },
    { num: 4, word: 'vier' },
    { num: 5, word: 'fünf' },
    { num: 6, word: 'sechs' },
    { num: 7, word: 'sieben' },
    { num: 8, word: 'acht' },
    { num: 9, word: 'neun' },
    { num: 10, word: 'zehn' },
    { num: 11, word: 'elf' },
    { num: 12, word: 'zwölf' },
];

const NUMBERS_13_19 = [
    { num: 13, word: 'dreizehn', breakdown: 'drei + zehn' },
    { num: 14, word: 'vierzehn', breakdown: 'vier + zehn' },
    { num: 15, word: 'fünfzehn', breakdown: 'fünf + zehn' },
    { num: 16, word: 'sechzehn', breakdown: 'sech(s) + zehn', exception: true },
    { num: 17, word: 'siebzehn', breakdown: 'sieb(en) + zehn', exception: true },
    { num: 18, word: 'achtzehn', breakdown: 'acht + zehn' },
    { num: 19, word: 'neunzehn', breakdown: 'neun + zehn' },
];

const TENS = [
    { num: 10, word: 'zehn' },
    { num: 20, word: 'zwanzig', exception: true },
    { num: 30, word: 'dreißig', exception: true },
    { num: 40, word: 'vierzig' },
    { num: 50, word: 'fünfzig' },
    { num: 60, word: 'sechzig', exception: true },
    { num: 70, word: 'siebzig', exception: true },
    { num: 80, word: 'achtzig' },
    { num: 90, word: 'neunzig' },
];

const BIG_NUMBERS = [
    { num: '100', word: 'hundert' },
    { num: '1.000', word: 'tausend' },
    { num: '1.000.000', word: 'eine Million' },
];

export default function NumbersPage() {
    const [playingItem, setPlayingItem] = useState<string | null>(null);

    const playAudio = (text: string, id: string) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.85;

        const voices = window.speechSynthesis.getVoices();
        const germanVoices = voices.filter(v => v.lang.startsWith('de'));
        if (germanVoices.length > 0) {
            const bestVoice = germanVoices.find(v => v.name.includes('Premium') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Anna')) || germanVoices[0];
            utterance.voice = bestVoice;
        }

        utterance.onstart = () => setPlayingItem(id);
        utterance.onend = () => setPlayingItem(null);
        utterance.onerror = () => setPlayingItem(null);

        window.speechSynthesis.speak(utterance);
    };

    const renderNumberCard = (item: any, size: 'sm' | 'md' = 'sm') => {
        const isPlaying = playingItem === `num-${item.num}`;

        return (
            <div
                key={item.num}
                onClick={() => playAudio(item.word, `num-${item.num}`)}
                className={`card-hover group relative flex items-center gap-4 cursor-pointer transition-all duration-300 ${size === 'sm' ? 'p-4' : 'p-6'}
                    ${isPlaying ? 'ring-2 ring-blue-500 scale-105 bg-blue-50/50 dark:bg-blue-900/20' : ''}
                `}
            >
                <div className={`font-extrabold flex items-center justify-center shrink-0 transition-all duration-300 rounded-xl
                    ${size === 'sm' ? 'w-12 h-12 text-xl' : 'w-16 h-16 text-2xl'}
                    ${isPlaying
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40'
                        : 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40'}
                `}>
                    {isPlaying ? (
                        <svg className="w-5 h-5 ml-0.5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    ) : (
                        item.num
                    )}
                </div>
                <div>
                    <p className={`font-bold transition-colors
                        ${size === 'sm' ? 'text-lg' : 'text-xl'}
                        ${isPlaying ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}
                    `}>
                        {item.word}
                    </p>

                    {item.breakdown && (
                        <p className="text-xs font-mono text-slate-500 mt-1">
                            {item.breakdown}
                        </p>
                    )}

                    {item.exception && (
                        <span className="absolute top-2 right-2 flex w-2 h-2 rounded-full bg-yellow-400 shadow-sm" title="Irregular pattern" />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">🔢 Die Zahlen</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Learn how to count in German — notice the patterns and exceptions
                </p>
            </div>

            <section>
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">The Foundation (0-12)</h2>
                    <p className="text-sm text-slate-500 mt-1">These numbers must be memorized as they form the base for all other numbers.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {NUMBERS_0_12.map(item => renderNumberCard(item, 'sm'))}
                </div>
            </section>

            <section className="bg-slate-50 dark:bg-slate-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Teens (13-19)</h2>
                        <p className="text-sm text-slate-500 mt-1">Formed by adding "-zehn" to the base number. Note the spelling changes for 16 and 17.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {NUMBERS_13_19.map(item => renderNumberCard(item, 'md'))}
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Tens (10-90)</h2>
                        <p className="text-sm text-slate-500 mt-1">Usually formed by adding "-zig". Watch out for 20, 30, 60, and 70.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {TENS.map(item => renderNumberCard(item, 'sm'))}
                </div>
            </section>

            <section className="bg-blue-50/50 dark:bg-blue-900/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 border-y border-blue-100 dark:border-blue-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Compound Numbers (21-99)</h2>
                            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                                In German, counting from 21 to 99 is done "backwards" compared to English. You say the <strong>ones</strong> first, then "und" (and), then the <strong>tens</strong>. All written as one single word.
                            </p>

                            <div
                                onClick={() => playAudio('einundzwanzig', 'compound-21')}
                                className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-300
                            ${playingItem === 'compound-21' ? 'ring-2 ring-blue-500 scale-[1.02] shadow-xl shadow-blue-500/10' : 'hover:scale-[1.02] hover:shadow-md'}
                        `}
                            >
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">21</span>
                                </div>
                                <div className="flex justify-center items-center gap-2 text-lg md:text-xl font-mono text-slate-700 dark:text-slate-300">
                                    <span className="text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">ein</span>
                                    <span className="text-slate-400">+</span>
                                    <span className="text-green-500 font-bold bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">und</span>
                                    <span className="text-slate-400">+</span>
                                    <span className="text-purple-500 font-bold bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-lg">zwanzig</span>
                                </div>
                                <div className="text-center mt-6">
                                    <span className="font-bold text-2xl text-slate-900 dark:text-white">einundzwanzig</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-72 shrink-0">
                            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Large Numbers</h2>
                            <div className="space-y-4">
                                {BIG_NUMBERS.map(item => (
                                    <div
                                        key={item.num}
                                        onClick={() => playAudio(item.word, `big-${item.num}`)}
                                        className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm cursor-pointer transition-all duration-300
                                            ${playingItem === `big-${item.num}` ? 'ring-2 ring-blue-500 scale-[1.02] bg-blue-50/50 dark:bg-blue-900/20' : 'hover:scale-[1.02] hover:shadow-md'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                                                ${playingItem === `big-${item.num}`
                                                    ? 'bg-blue-500 text-white animate-pulse'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-100 dark:group-hover:text-blue-500'}
                                            `}>
                                                <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </button>
                                            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{item.num}</span>
                                        </div>
                                        <span className={`font-bold transition-colors ${playingItem === `big-${item.num}` ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                            {item.word}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
