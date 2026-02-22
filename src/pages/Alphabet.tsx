import { useState } from 'react';
const ALPHABET = [
    { letter: 'A a', phonetic: '[a:]', example: 'Apfel', translation: 'Apple' },
    { letter: 'B b', phonetic: '[be:]', example: 'Buch', translation: 'Book' },
    { letter: 'C c', phonetic: '[tse:]', example: 'Computer', translation: 'Computer' },
    { letter: 'D d', phonetic: '[de:]', example: 'Danke', translation: 'Thanks' },
    { letter: 'E e', phonetic: '[e:]', example: 'Elefant', translation: 'Elephant' },
    { letter: 'F f', phonetic: '[ɛf]', example: 'Fenster', translation: 'Window' },
    { letter: 'G g', phonetic: '[ge:]', example: 'Geld', translation: 'Money' },
    { letter: 'H h', phonetic: '[ha:]', example: 'Haus', translation: 'House' },
    { letter: 'I i', phonetic: '[i:]', example: 'Igel', translation: 'Hedgehog' },
    { letter: 'J j', phonetic: '[jɔt]', example: 'Jacke', translation: 'Jacket' },
    { letter: 'K k', phonetic: '[ka:]', example: 'Katze', translation: 'Cat' },
    { letter: 'L l', phonetic: '[ɛl]', example: 'Lampe', translation: 'Lamp' },
    { letter: 'M m', phonetic: '[ɛm]', example: 'Maus', translation: 'Mouse' },
    { letter: 'N n', phonetic: '[ɛn]', example: 'Nase', translation: 'Nose' },
    { letter: 'O o', phonetic: '[o:]', example: 'Oma', translation: 'Grandma' },
    { letter: 'P p', phonetic: '[pe:]', example: 'Papier', translation: 'Paper' },
    { letter: 'Q q', phonetic: '[ku:]', example: 'Quark', translation: 'Curd cheese' },
    { letter: 'R r', phonetic: '[ɛʁ]', example: 'Regen', translation: 'Rain' },
    { letter: 'S s', phonetic: '[ɛs]', example: 'Sonne', translation: 'Sun' },
    { letter: 'T t', phonetic: '[te:]', example: 'Tisch', translation: 'Table' },
    { letter: 'U u', phonetic: '[u:]', example: 'Uhr', translation: 'Clock' },
    { letter: 'V v', phonetic: '[faʊ]', example: 'Vogel', translation: 'Bird' },
    { letter: 'W w', phonetic: '[ve:]', example: 'Wasser', translation: 'Water' },
    { letter: 'X x', phonetic: '[ɪks]', example: 'Xylofon', translation: 'Xylophone' },
    { letter: 'Y y', phonetic: '[ˈʏpsilɔn]', example: 'Yacht', translation: 'Yacht' },
    { letter: 'Z z', phonetic: '[tsɛt]', example: 'Zug', translation: 'Train' },
];

const SPECIAL_CHARS = [
    { letter: 'Ä ä', phonetic: '[ɛ:]', name: 'A-Umlaut', example: 'Äpfel', translation: 'Apples' },
    { letter: 'Ö ö', phonetic: '[ø:]', name: 'O-Umlaut', example: 'Öl', translation: 'Oil' },
    { letter: 'Ü ü', phonetic: '[y:]', name: 'U-Umlaut', example: 'Übung', translation: 'Exercise' },
    { letter: 'ß', phonetic: '[ɛsˈtsɛt]', name: 'Eszett / scharfes S', example: 'Straße', translation: 'Street' },
];

export default function AlphabetPage() {
    const [playingItem, setPlayingItem] = useState<string | null>(null);

    const playAudio = (text: string, id: string) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.85;

        // Force native German voices if available (preventing English robot fallback)
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

    const renderCard = (item: any) => {
        const isPlaying = playingItem === item.letter;

        // Format: "A." - Appending a period ensures the engine safely pronounces it explicitly as a single letter.
        const upperLetter = item.letter.split(' ')[0];
        const playText = `${upperLetter}.`;

        return (
            <div
                key={item.letter}
                onClick={() => playAudio(playText, item.letter)}
                className={`card-hover group relative flex flex-col justify-between p-6 cursor-pointer transition-all duration-300
                    ${isPlaying ? 'ring-2 ring-blue-500 scale-105 bg-blue-50/50 dark:bg-blue-900/20' : ''}
                `}
            >
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-4xl font-extrabold transition-colors duration-300
                        ${isPlaying ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}
                    `}>
                        {item.letter}
                    </span>
                    <div className="text-right flex flex-col items-end gap-2">
                        <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                            ${isPlaying
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40 animate-pulse'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                                }
                            `}
                            aria-label="Play pronunciation"
                        >
                            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                        <div className="text-right mt-1">
                            <span className="text-sm font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md tracking-wider block">
                                {item.phonetic}
                            </span>
                            {item.name && (
                                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">
                                    {item.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <p className="text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.example}
                    </p>
                    <p className="text-sm text-slate-500">
                        {item.translation}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">🔤 Das Alphabet</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Master the German alphabet and its unique pronunciation
                </p>
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">1</span>
                    Standard Alphabet (A-Z)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {ALPHABET.map(renderCard)}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-sm">2</span>
                    Umlaute & Eszett
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {SPECIAL_CHARS.map(renderCard)}
                </div>
            </div>
        </div>
    );
}
