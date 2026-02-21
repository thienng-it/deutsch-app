// Curriculum data — chapter-by-chapter with 4 skills per day
export type SkillKey = 'listening' | 'speaking' | 'reading' | 'writing';
export const SKILL_KEYS: SkillKey[] = ['listening', 'speaking', 'reading', 'writing'];
export const SKILL_META: Record<SkillKey, { icon: string; label: string }> = {
    listening: { icon: '🎧', label: 'Listening' },
    speaking: { icon: '🗣️', label: 'Speaking' },
    reading: { icon: '📖', label: 'Reading' },
    writing: { icon: '✍️', label: 'Writing' },
};

// Interactive exercise types
export type QuestionType = 'multipleChoice' | 'textInput' | 'fillBlank' | 'trueFalse' | 'ordering';

export interface InteractiveQuestion {
    type: QuestionType;
    prompt: string;
    options?: string[];             // For multipleChoice, trueFalse, ordering
    correctAnswer: string | number; // Index for MC/TF, string for textInput/fillBlank
    acceptableAnswers?: string[];   // Alternative correct answers (case-insensitive)
    explanation?: string;           // Shown after answering
}

export interface SkillActivity {
    instruction: string;
    content: string;
    question?: string;       // Legacy — kept for backward compat
    answer?: string;         // Legacy — kept for backward compat
    exercises?: InteractiveQuestion[]; // NEW — interactive exercises
    audioPath?: string;      // path relative to /materials/
    extraAudio?: { label: string; path: string }[];
}

export interface DayDef {
    num: number;
    title: string;
    skills: Record<SkillKey, SkillActivity>;
}

export interface ChapterDef {
    id: string;
    level: string;
    title: string;
    subtitle: string;
    days: DayDef[];
    recommendedMaterial?: { book: string; path: string };
    imagePaths?: string[]; // textbook reference images for this chapter
}

// Progress helpers (localStorage)
const PROGRESS_KEY = 'deutsch_chapter_progress';
export type DayProgress = Partial<Record<SkillKey, boolean>>;
export type AllProgress = Record<string, DayProgress>;

export function getProgress(): AllProgress {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
    catch { return {}; }
}
export function markSkillDone(chapterId: string, day: number, skill: SkillKey) {
    const p = getProgress();
    const key = `${chapterId}_day${day}`;
    p[key] = { ...p[key], [skill]: true };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

// ─── A1 Curriculum ──────────────────────────────────────
const A1_CH1: ChapterDef = {
    id: 'a1_ch1', level: 'A1',
    title: 'Chapter 1: Hallo! Ich bin Nicole...',
    subtitle: 'Begrüßung, Länder, Alphabet',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_9.jpg', 'German/Menschen/A1/Images/KB1_page_10.jpg', 'German/Menschen/A1/Images/KB1_page_11.jpg', 'German/Menschen/A1/Images/KB1_page_12.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Begrüßung', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.

📝 Grammar Focus:
Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 1', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '1', acceptableAnswers: ['1'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Introductions & Greetings.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Länder & Herkunft', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.

📝 Grammar Focus:
Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 1', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '1', acceptableAnswers: ['1'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Introductions & Greetings.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Das Alphabet', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.

📝 Grammar Focus:
Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 1', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '1', acceptableAnswers: ['1'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Introductions & Greetings.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Writing: Introductions', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.

📝 Grammar Focus:
Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 1', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '1', acceptableAnswers: ['1'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Introductions & Greetings.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 1 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.

📝 Grammar Focus:
Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 1', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '1', acceptableAnswers: ['1'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Introductions & Greetings.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH2: ChapterDef = {
    id: 'a1_ch2', level: 'A1',
    title: 'Chapter 2: Ich bin Journalistin...',
    subtitle: 'Berufe, Familienstand, Zahlen',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_13.jpg', 'German/Menschen/A1/Images/KB1_page_14.jpg', 'German/Menschen/A1/Images/KB1_page_15.jpg', 'German/Menschen/A1/Images/KB1_page_16.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Berufe', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.

📝 Grammar Focus:
Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 2', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '2', acceptableAnswers: ['2'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Professions & Numbers.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Familienstand', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.

📝 Grammar Focus:
Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 2', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '2', acceptableAnswers: ['2'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Professions & Numbers.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Zahlen 1-100', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.

📝 Grammar Focus:
Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 2', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '2', acceptableAnswers: ['2'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Professions & Numbers.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Asking Questions', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.

📝 Grammar Focus:
Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 2', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '2', acceptableAnswers: ['2'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Professions & Numbers.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 2 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.

📝 Grammar Focus:
Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 2', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '2', acceptableAnswers: ['2'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Professions & Numbers.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH3: ChapterDef = {
    id: 'a1_ch3', level: 'A1',
    title: 'Chapter 3: Das ist meine Familie...',
    subtitle: 'Familie, Sprachen',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_17.jpg', 'German/Menschen/A1/Images/KB1_page_18.jpg', 'German/Menschen/A1/Images/KB1_page_19.jpg', 'German/Menschen/A1/Images/KB1_page_20.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Die Familie', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.

📝 Grammar Focus:
Possessivartikel: mein, dein, meine, deine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 3', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '3', acceptableAnswers: ['3'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Family Members & Languages.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Possessivartikel', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.

📝 Grammar Focus:
Possessivartikel: mein, dein, meine, deine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 3', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '3', acceptableAnswers: ['3'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Family Members & Languages.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Sprachen', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.

📝 Grammar Focus:
Possessivartikel: mein, dein, meine, deine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 3', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '3', acceptableAnswers: ['3'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Family Members & Languages.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Describing People', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.

📝 Grammar Focus:
Possessivartikel: mein, dein, meine, deine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 3', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '3', acceptableAnswers: ['3'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Family Members & Languages.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 3 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.

📝 Grammar Focus:
Possessivartikel: mein, dein, meine, deine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 3', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '3', acceptableAnswers: ['3'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Family Members & Languages.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH4: ChapterDef = {
    id: 'a1_ch4', level: 'A1',
    title: 'Chapter 4: Der Tisch ist schön!',
    subtitle: 'Möbel, Adjektive',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_23.jpg', 'German/Menschen/A1/Images/KB1_page_24.jpg', 'German/Menschen/A1/Images/KB1_page_25.jpg', 'German/Menschen/A1/Images/KB1_page_26.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Möbel', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.

📝 Grammar Focus:
Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 4', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '4', acceptableAnswers: ['4'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Furniture & Adjectives.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Bestimmter Artikel', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.

📝 Grammar Focus:
Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 4', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '4', acceptableAnswers: ['4'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Furniture & Adjectives.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Adjektive & Preise', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.

📝 Grammar Focus:
Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 4', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '4', acceptableAnswers: ['4'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Furniture & Adjectives.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Writing: Room Descriptions', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.

📝 Grammar Focus:
Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 4', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '4', acceptableAnswers: ['4'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Furniture & Adjectives.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 4 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.

📝 Grammar Focus:
Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 4', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '4', acceptableAnswers: ['4'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Furniture & Adjectives.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH5: ChapterDef = {
    id: 'a1_ch5', level: 'A1',
    title: 'Chapter 5: Was ist das? Das ist ein F...',
    subtitle: 'Gegenstände, Farben, Materialien',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_27.jpg', 'German/Menschen/A1/Images/KB1_page_28.jpg', 'German/Menschen/A1/Images/KB1_page_29.jpg', 'German/Menschen/A1/Images/KB1_page_30.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Gegenstände', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.

📝 Grammar Focus:
Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 5', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '5', acceptableAnswers: ['5'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Objects & Colors.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Unbestimmter Artikel', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.

📝 Grammar Focus:
Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 5', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '5', acceptableAnswers: ['5'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Objects & Colors.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Farben & Materialien', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.

📝 Grammar Focus:
Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 5', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '5', acceptableAnswers: ['5'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Objects & Colors.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Describing Objects', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.

📝 Grammar Focus:
Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 5', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '5', acceptableAnswers: ['5'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Objects & Colors.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 5 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.

📝 Grammar Focus:
Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine.`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 5', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '5', acceptableAnswers: ['5'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Objects & Colors.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH6: ChapterDef = {
    id: 'a1_ch6', level: 'A1',
    title: 'Chapter 6: Ich brauche kein Büro...',
    subtitle: 'Büro und Technik',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_31.jpg', 'German/Menschen/A1/Images/KB1_page_32.jpg', 'German/Menschen/A1/Images/KB1_page_33.jpg', 'German/Menschen/A1/Images/KB1_page_34.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Büro & Technik', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.

📝 Grammar Focus:
Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 6', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '6', acceptableAnswers: ['6'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Office & Technology.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: Akkusativ', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.

📝 Grammar Focus:
Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 6', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '6', acceptableAnswers: ['6'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Office & Technology.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Pluralformen', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.

📝 Grammar Focus:
Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 6', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '6', acceptableAnswers: ['6'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Office & Technology.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 4, title: 'Writing: Emails', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.

📝 Grammar Focus:
Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 6', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '6', acceptableAnswers: ['6'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Office & Technology.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 6 Review', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: `🗣️ Sprechen Sie nach:
Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: `📖 Reading Text:
Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.

📝 Grammar Focus:
Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische).`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema 6', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '6', acceptableAnswers: ['6'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: `✍️ Schreiben Sie Sätze zum Thema Office & Technology.`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }
    ]
    };

    const A1_CH7: ChapterDef = {
    id: 'a1_ch7', level: 'A1',
    title: 'Chapter 7: Hobbys & Fähigkeiten',
    subtitle: 'Du kannst wirklich toll ...!',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_37.jpg', 'German/Menschen/A1/Images/KB1_page_38.jpg', 'German/Menschen/A1/Images/KB1_page_39.jpg', 'German/Menschen/A1/Images/KB1_page_40.jpg'],
    days: [
        {
            num: 1, title: 'Vocabulary: Hobbys', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What hobbies do you hear?',
                    answer: 'Listen again — the speakers mention singing, cooking, and playing chess.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 2.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8 2.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice talking about your hobbies.',
                    content: `Dialogue — Meine Hobbys:
A: Was machst du gern in der Freizeit?
B: Ich koche gern. Und du?
A: Ich treffe gern Freunde. Mein Hobby ist Fußball.
B: Fährst du gern Ski?
A: Nein, ich kann nicht Ski fahren.

💡 Tip: Use "Ich ... gern" (e.g., Ich lese gern).`
                },
                reading: {
                    instruction: 'Read the text and answer the questions.',
                    content: `Freizeit (Free Time):

Oft gehe ich spazieren. Ich höre gern Musik. Ich liebe die Natur. Ich mache sehr gern Ausflüge. Mein Hobby ist Fußball. Mein Lieblingskomponist ist Johann Sebastian Bach. Anna kocht gern und spielt am Wochenende Schach.`,
                    question: 'Q1: What does the person like to hear?\nQ2: What is the person\'s hobby?',
                    answer: 'A1: Musik\nA2: Fußball',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Das Hobby ist Tennis.', options: ['Richtig', 'Falsch'], correctAnswer: 1 },
                        { type: 'fillBlank', prompt: 'Anna ___ gern Schach.', correctAnswer: 'spielt', acceptableAnswers: ['Spielt'] }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: `Exercise 1: Write down 3 of your hobbies.
Exercise 2: Write "I like to cook" in German.`,
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type "I like to cook" in German:', correctAnswer: 'ich koche gern', acceptableAnswers: ['Ich koche gern.'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Grammar: können', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: Can the person play the guitar well?',
                    answer: 'Yes, they can play the guitar very well.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8.mp3'
                },
                speaking: {
                    instruction: 'Practice using "können".',
                    content: `Practice sentences aloud:
1. Ich kann ein bisschen Schach spielen.
2. Kannst du gut Tennis spielen?
3. Sie können aber toll Ski fahren!
4. Wir können gar nicht singen.`
                },
                reading: {
                    instruction: 'Read the short dialogue.',
                    content: `A: Kannst du gut Gitarre spielen?
B: Nein, ich kann gar nicht Gitarre spielen. Aber ich kann gut singen!
A: Wow! Du kannst wirklich toll singen.`,
                    question: 'What can person B do well?',
                    answer: 'Singen (singing).',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Person B kann gut Gitarre spielen.', options: ['Richtig', 'Falsch'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write sentences with "können".',
                    content: `Complete the sentences with the correct form of können:
1. Ich ___ gut malen.
2. ___ du Schach spielen?
3. Anna und Tom ___ sehr gut kochen.`,
                    answer: '1. kann, 2. Kannst, 3. können',
                    exercises: [
                        { type: 'textInput', prompt: 'Translate: Can you play chess? (informal)', correctAnswer: 'kannst du schach spielen', acceptableAnswers: ['Kannst du Schach spielen?', 'kannst du Schach spielen'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Speaking: Making Compliments', skills: {
                listening: {
                    instruction: 'Listen to people giving compliments.',
                    content: `🎧 Topic: Compliments (Level Course, Chapter 7)

📝 Compliments:
• Du kannst ja super tanzen! = You can dance really great!
• Du kannst wirklich toll kochen. = You can cook really well.
• Deine Augen sind sehr schön. = Your eyes are very beautiful.

🎯 Task: Identify the compliments given.`,
                    question: 'Q1: What is complimented?',
                    answer: 'Dancing, cooking, and eyes are complimented.',
                    exercises: [
                        { type: 'trueFalse', prompt: 'The word "toll" means "terrible".', options: ['Richtig', 'Falsch'], correctAnswer: 1, explanation: 'Toll means great/fantastic.' }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice making and receiving compliments.',
                    content: `Roleplay:
A: Wow! Du kannst wirklich toll malen!
B: Vielen Dank! / Oh, danke! / Danke sehr!`
                },
                reading: {
                    instruction: 'Read the short situation.',
                    content: `Dinner Party:
Lisa is eating at Markus's house. Markus has cooked dinner.
Lisa: Hmm, das ist lecker! Du kannst ja super kochen!
Markus: Oh, danke sehr. Das freut mich.`,
                    question: 'Who cooked dinner?',
                    answer: 'Markus.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'How does Markus respond to the compliment?', options: ['Er ist wütend.', 'Er sagt "Danke sehr".', 'Er sagt "Nein".'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write a compliment.',
                    content: `Write three compliments in German for a friend.`,
                    answer: 'Du kannst wirklich toll kochen. Du kannst super Gitarre spielen. Deine Augen sind sehr schön.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type "You can cook really great":', correctAnswer: 'du kannst wirklich toll kochen', acceptableAnswers: ['Du kannst ja super kochen.'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Asking for Permission', skills: {
                listening: {
                    instruction: 'Listen to requests using "Kann ich...".',
                    content: `🎧 Topic: Asking for Permission (Level Course, Chapter 7)

📝 Phrases:
• Kann ich mal telefonieren? = Can I make a phone call?
• Kann ich hier rauchen? = Can I smoke here?
• Kann ich das Auto haben? = Can I have the car?

🎯 Task: Listen to the questions and responses.`,
                    question: 'Q1: What does the person ask to use?',
                    answer: 'The car and the phone.',
                    exercises: [
                        { type: 'fillBlank', prompt: 'Kann ich mal ___? (make a call)', correctAnswer: 'telefonieren', acceptableAnswers: ['Telefonieren'] }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice asking for permission and replying.',
                    content: `A: Kann ich mal telefonieren?
B: Ja, klar. / Ja, natürlich. / Ja, gern. (OR: Nein, nicht so gern.)`
                },
                reading: {
                    instruction: 'Read the dialogue.',
                    content: `In a café:
Kunde: Entschuldigung, kann ich hier rauchen?
Kellner: Nein, das ist hier leider verboten.
Kunde: Oh, okay.`,
                    question: 'Is smoking allowed?',
                    answer: 'No.',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Rauchen ist erlaubt (allowed).', options: ['Richtig', 'Falsch'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: `Exercise: Translate "Can I make a phone call?"`,
                    answer: 'Kann ich mal telefonieren?',
                    exercises: [
                        { type: 'textInput', prompt: 'Translate: Can I smoke here?', correctAnswer: 'kann ich hier rauchen', acceptableAnswers: ['Kann ich hier rauchen?'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Chapter 7 Review', skills: {
                listening: {
                    instruction: 'Consolidate Chapter 7 listening.',
                    content: `🎧 Topic: Modul 3 Review

Task: Listen to the dialogue again and identify the hobbies and abilities mentioned.
This is the final day of Chapter 7.`,
                    question: 'What abilities are discussed?',
                    answer: 'Various hobbies and the use of the modal verb "können" are reviewed.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'Which verb is used for "can/be able to"?', options: ['haben', 'sein', 'können'], correctAnswer: 2 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Give a short presentation.',
                    content: `Presentation (say aloud):
"Hallo, ich bin [Name]. Meine Hobbys sind Kochen und Musik hören. 
Ich kann sehr gut tanzen, aber ich kann gar nicht Schach spielen."`
                },
                reading: {
                    instruction: 'Read the summary of Modul 3.',
                    content: `In this chapter, we learned about hobbies (Hobbys), compliments (Komplimente), and how to express ability (Fähigkeit) using the modal verb "können".`,
                    question: 'T/F 1: "können" is a modal verb.',
                    answer: '1: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Komplimente means Compliments.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write a full paragraph about your free time.',
                    content: `Write 4 sentences:
- 2 hobbies you have.
- 1 thing you can do well.
- 1 thing you cannot do at all.`,
                    answer: 'I can read your paragraph and give feedback based on the chapter vocabulary.',
                    exercises: [
                        { type: 'fillBlank', prompt: 'Ich ___ nicht Ski fahren.', correctAnswer: 'kann', acceptableAnswers: ['Kann'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH8: ChapterDef = {
    id: 'a1_ch8', level: 'A1',
    title: 'Chapter 8: A1 Lektion 8',
    subtitle: 'A1 Course, Chapter 8',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_41.jpg', 'German/Menschen/A1/Images/KB1_page_42.jpg', 'German/Menschen/A1/Images/KB1_page_43.jpg', 'German/Menschen/A1/Images/KB1_page_44.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 8, Aussprache, 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 8, 5a.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 8, Aussprache, 3 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 8, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 8, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 8, 2a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH9: ChapterDef = {
    id: 'a1_ch9', level: 'A1',
    title: 'Chapter 9: A1 Lektion 9',
    subtitle: 'A1 Course, Chapter 9',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_45.jpg', 'German/Menschen/A1/Images/KB1_page_46.jpg', 'German/Menschen/A1/Images/KB1_page_47.jpg', 'German/Menschen/A1/Images/KB1_page_48.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 9, Aussprache, 1 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 9, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 9, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH10: ChapterDef = {
    id: 'a1_ch10', level: 'A1',
    title: 'Chapter 10: A1 Lektion 10',
    subtitle: 'A1 Course, Chapter 10',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_51.jpg', 'German/Menschen/A1/Images/KB1_page_52.jpg', 'German/Menschen/A1/Images/KB1_page_53.jpg', 'German/Menschen/A1/Images/KB1_page_54.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Aussprache, 1 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Hoeren, 1 und 2 2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Hoeren, 1 und 2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 10.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 4a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 4b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 4c.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 10, 5.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 10, Hoeren, 1 und 2 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH11: ChapterDef = {
    id: 'a1_ch11', level: 'A1',
    title: 'Chapter 11: A1 Lektion 11',
    subtitle: 'A1 Course, Chapter 11',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_55.jpg', 'German/Menschen/A1/Images/KB1_page_56.jpg', 'German/Menschen/A1/Images/KB1_page_57.jpg', 'German/Menschen/A1/Images/KB1_page_58.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 11, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 11, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH12: ChapterDef = {
    id: 'a1_ch12', level: 'A1',
    title: 'Chapter 12: A1 Lektion 12',
    subtitle: 'A1 Course, Chapter 12',
    imagePaths: ['German/Menschen/A1/Images/KB1_page_59.jpg', 'German/Menschen/A1/Images/KB1_page_60.jpg', 'German/Menschen/A1/Images/KB1_page_61.jpg', 'German/Menschen/A1/Images/KB1_page_62.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 12, Aussprache, 1 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 12, 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 12, 3a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 12, 4a 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 12, 4a.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 12, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 12, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 12, Basistraining, 2a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_AB_Audio/01 Lektion 12, Basistraining, 2b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH13: ChapterDef = {
    id: 'a1_ch13', level: 'A1',
    title: 'Chapter 13: A1 Lektion 13',
    subtitle: 'A1 Course, Chapter 13',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_9.jpg', 'German/Menschen/A1/Images/KB2_page_10.jpg', 'German/Menschen/A1/Images/KB2_page_11.jpg', 'German/Menschen/A1/Images/KB2_page_12.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 13, Aussprache, 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/1 Lektion 13, 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/2 Lektion 13, 4.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 13, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 13, Aussprache, 3 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 13, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 13, HoÌˆren, 1 und 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH14: ChapterDef = {
    id: 'a1_ch14', level: 'A1',
    title: 'Chapter 14: A1 Lektion 14',
    subtitle: 'A1 Course, Chapter 14',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_13.jpg', 'German/Menschen/A1/Images/KB2_page_14.jpg', 'German/Menschen/A1/Images/KB2_page_15.jpg', 'German/Menschen/A1/Images/KB2_page_16.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 14, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 14, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 14, Basistraining, 11 und 12.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH15: ChapterDef = {
    id: 'a1_ch15', level: 'A1',
    title: 'Chapter 15: A1 Lektion 15',
    subtitle: 'A1 Course, Chapter 15',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_17.jpg', 'German/Menschen/A1/Images/KB2_page_18.jpg', 'German/Menschen/A1/Images/KB2_page_19.jpg', 'German/Menschen/A1/Images/KB2_page_20.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 15, Aussprache, 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/11 Lektion 15, 1b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/9 Lektion 15, 1b.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 15, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 15, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 15, Basistraining, 1 a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 15, Basistraining, 5.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH16: ChapterDef = {
    id: 'a1_ch16', level: 'A1',
    title: 'Chapter 16: A1 Lektion 16',
    subtitle: 'A1 Course, Chapter 16',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_23.jpg', 'German/Menschen/A1/Images/KB2_page_24.jpg', 'German/Menschen/A1/Images/KB2_page_25.jpg', 'German/Menschen/A1/Images/KB2_page_26.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 16, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 16, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 16, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH17: ChapterDef = {
    id: 'a1_ch17', level: 'A1',
    title: 'Chapter 17: A1 Lektion 17',
    subtitle: 'A1 Course, Chapter 17',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_27.jpg', 'German/Menschen/A1/Images/KB2_page_28.jpg', 'German/Menschen/A1/Images/KB2_page_29.jpg', 'German/Menschen/A1/Images/KB2_page_30.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 17, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH18: ChapterDef = {
    id: 'a1_ch18', level: 'A1',
    title: 'Chapter 18: A1 Lektion 18',
    subtitle: 'A1 Course, Chapter 18',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_31.jpg', 'German/Menschen/A1/Images/KB2_page_32.jpg', 'German/Menschen/A1/Images/KB2_page_33.jpg', 'German/Menschen/A1/Images/KB2_page_34.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 18, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 18, Aussprache, 3 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 18, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 18, HoÌˆren, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH19: ChapterDef = {
    id: 'a1_ch19', level: 'A1',
    title: 'Chapter 19: A1 Lektion 19',
    subtitle: 'A1 Course, Chapter 19',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_37.jpg', 'German/Menschen/A1/Images/KB2_page_38.jpg', 'German/Menschen/A1/Images/KB2_page_39.jpg', 'German/Menschen/A1/Images/KB2_page_40.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 19, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 19, Aussprache, 4 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 19, Aussprache, 4.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/23 Lektion 19, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/28 Lektion 19, 8a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH20: ChapterDef = {
    id: 'a1_ch20', level: 'A1',
    title: 'Chapter 20: A1 Lektion 20',
    subtitle: 'A1 Course, Chapter 20',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_41.jpg', 'German/Menschen/A1/Images/KB2_page_42.jpg', 'German/Menschen/A1/Images/KB2_page_43.jpg', 'German/Menschen/A1/Images/KB2_page_44.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 20, Aussprache, 1 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 20, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 20, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/31 Lektion 20, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH21: ChapterDef = {
    id: 'a1_ch21', level: 'A1',
    title: 'Chapter 21: A1 Lektion 21',
    subtitle: 'A1 Course, Chapter 21',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_45.jpg', 'German/Menschen/A1/Images/KB2_page_46.jpg', 'German/Menschen/A1/Images/KB2_page_47.jpg', 'German/Menschen/A1/Images/KB2_page_48.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 21, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 21, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 21, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 21, Basistraining, 11 und 12.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/32 Lektion 21, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH22: ChapterDef = {
    id: 'a1_ch22', level: 'A1',
    title: 'Chapter 22: A1 Lektion 22',
    subtitle: 'A1 Course, Chapter 22',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_51.jpg', 'German/Menschen/A1/Images/KB2_page_52.jpg', 'German/Menschen/A1/Images/KB2_page_53.jpg', 'German/Menschen/A1/Images/KB2_page_54.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 22, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 22, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/34 Lektion 22, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/35 Lektion 22, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/36 Lektion 22, 8a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH23: ChapterDef = {
    id: 'a1_ch23', level: 'A1',
    title: 'Chapter 23: A1 Lektion 23',
    subtitle: 'A1 Course, Chapter 23',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_55.jpg', 'German/Menschen/A1/Images/KB2_page_56.jpg', 'German/Menschen/A1/Images/KB2_page_57.jpg', 'German/Menschen/A1/Images/KB2_page_58.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 23, Aussprache, 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/38 Lektion 23, 3b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/39 Lektion 23, 3b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/40 Lektion 23, 3b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/41 Lektion 23, 3b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/42 Lektion 23, 6a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/43 Lektion 23, 6a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/44 Lektion 23, 6a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/45 Lektion 23, 6a.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 23, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 23, Basistraining, 6.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 23, HoÌˆren, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/37 Lektion 23, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A1_CH24: ChapterDef = {
    id: 'a1_ch24', level: 'A1',
    title: 'Chapter 24: A1 Lektion 24',
    subtitle: 'A1 Course, Chapter 24',
    imagePaths: ['German/Menschen/A1/Images/KB2_page_59.jpg', 'German/Menschen/A1/Images/KB2_page_60.jpg', 'German/Menschen/A1/Images/KB2_page_61.jpg', 'German/Menschen/A1/Images/KB2_page_62.jpg'],
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Aussprache, 1.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Basistraining, 5c.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Basistraining, 5d.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Basistraining, 6a.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_2_KB_Audio/46 Lektion 24, 1.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Aussprache, 4.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Basistraining, 5a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A1/Menschen_A1_2_AB_Audio/Lektion 24, Basistraining, 5b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH1: ChapterDef = {
    id: 'a2_ch1', level: 'A2',
    title: 'Chapter 1: A2 Lektion 1',
    subtitle: 'A2 Course, Chapter 1',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/02-Lektion1-1(1).mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/04-Lektion1-3c.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/05-Lektion1-5-7(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/05-Lektion1-5-7.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/02-Lektion1-1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/03-Lektion1-3b(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/03-Lektion1-3b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/04-Lektion1-3c(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH2: ChapterDef = {
    id: 'a2_ch2', level: 'A2',
    title: 'Chapter 2: A2 Lektion 2',
    subtitle: 'A2 Course, Chapter 2',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/06-Lektion2-2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/06-Lektion2-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/07-Lektion2-3(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/07-Lektion2-3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 2\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 2.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH3: ChapterDef = {
    id: 'a2_ch3', level: 'A2',
    title: 'Chapter 3: A2 Lektion 3',
    subtitle: 'A2 Course, Chapter 3',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/08-Lektion3-2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/08-Lektion3-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH4: ChapterDef = {
    id: 'a2_ch4', level: 'A2',
    title: 'Chapter 4: A2 Lektion 4',
    subtitle: 'A2 Course, Chapter 4',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/10-Lektion4-1(1).mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/12-Lektion4-4_2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/13-Lektion4-4_3(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/13-Lektion4-4_3.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/14-Lektion4-8(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/14-Lektion4-8.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/10-Lektion4-1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/11-Lektion4-4_1(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/11-Lektion4-4_1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/12-Lektion4-4_2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH5: ChapterDef = {
    id: 'a2_ch5', level: 'A2',
    title: 'Chapter 5: A2 Lektion 5',
    subtitle: 'A2 Course, Chapter 5',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/15-Lektion5-2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/15-Lektion5-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH6: ChapterDef = {
    id: 'a2_ch6', level: 'A2',
    title: 'Chapter 6: A2 Lektion 6',
    subtitle: 'A2 Course, Chapter 6',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/16-Lektion6-2(1).mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/18-Lektion6-5_2.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/16-Lektion6-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/17-Lektion6-5_1(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/17-Lektion6-5_1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/18-Lektion6-5_2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH7: ChapterDef = {
    id: 'a2_ch7', level: 'A2',
    title: 'Chapter 7: A2 Lektion 7',
    subtitle: 'A2 Course, Chapter 7',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/20-Lektion7_2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/20-Lektion7_2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/21-Lektion7_3(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/21-Lektion7_3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 7\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 7.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH8: ChapterDef = {
    id: 'a2_ch8', level: 'A2',
    title: 'Chapter 8: A2 Lektion 8',
    subtitle: 'A2 Course, Chapter 8',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/22-Lektion8_1a(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/22-Lektion8_1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH9: ChapterDef = {
    id: 'a2_ch9', level: 'A2',
    title: 'Chapter 9: A2 Lektion 9',
    subtitle: 'A2 Course, Chapter 9',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/23-Lektion9_1(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/23-Lektion9_1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH10: ChapterDef = {
    id: 'a2_ch10', level: 'A2',
    title: 'Chapter 10: A2 Lektion 10',
    subtitle: 'A2 Course, Chapter 10',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/25-Lektion10-2(1).mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/27-Lektion10-5.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/28-Lektion10-8(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/28-Lektion10-8.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/25-Lektion10-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/26-Lektion10-3(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/26-Lektion10-3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/27-Lektion10-5(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH11: ChapterDef = {
    id: 'a2_ch11', level: 'A2',
    title: 'Chapter 11: A2 Lektion 11',
    subtitle: 'A2 Course, Chapter 11',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/29-Lektion11-1(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/29-Lektion11-1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH12: ChapterDef = {
    id: 'a2_ch12', level: 'A2',
    title: 'Chapter 12: A2 Lektion 12',
    subtitle: 'A2 Course, Chapter 12',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/30-Lektion12-2(1).mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/32-Lektion12-5_2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/33-Lektion12-5_3(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/33-Lektion12-5_3.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/34-Lektion12-5_4(1).mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/34-Lektion12-5_4.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/30-Lektion12-2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/31-Lektion12-5_1(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/31-Lektion12-5_1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Kursbuch A2.1/Kursbuch A2.1/32-Lektion12-5_2(1).mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH13: ChapterDef = {
    id: 'a2_ch13', level: 'A2',
    title: 'Chapter 13: A2 Lektion 13',
    subtitle: 'A2 Course, Chapter 13',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/02 Lektion 13, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/03 Lektion 13, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/04 Lektion 13, Aussprache, 3a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/05 Lektion 13, Aussprache, 3b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH14: ChapterDef = {
    id: 'a2_ch14', level: 'A2',
    title: 'Chapter 14: A2 Lektion 14',
    subtitle: 'A2 Course, Chapter 14',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/06 Lektion 14, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/07 Lektion 14, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/08 Lektion 14, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH15: ChapterDef = {
    id: 'a2_ch15', level: 'A2',
    title: 'Chapter 15: A2 Lektion 15',
    subtitle: 'A2 Course, Chapter 15',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/09 Lektion 15, Hoeren, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/10 Lektion 15, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/11 Lektion 15, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH16: ChapterDef = {
    id: 'a2_ch16', level: 'A2',
    title: 'Chapter 16: A2 Lektion 16',
    subtitle: 'A2 Course, Chapter 16',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/12 Lektion 16, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/13 Lektion 16, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH17: ChapterDef = {
    id: 'a2_ch17', level: 'A2',
    title: 'Chapter 17: A2 Lektion 17',
    subtitle: 'A2 Course, Chapter 17',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/14 Lektion 17, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/15 Lektion 17, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH18: ChapterDef = {
    id: 'a2_ch18', level: 'A2',
    title: 'Chapter 18: A2 Lektion 18',
    subtitle: 'A2 Course, Chapter 18',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/16 Lektion 18, Hoeren, 2a.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/21 Lektion 18, Aussprache, 2.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/22 Lektion 18, Aussprache, 3.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/17 Lektion 18, Hoeren, 2b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/18 Lektion 18, Hoeren, 2c.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/19 Lektion 18, Hoeren, 2d.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/20 Lektion 18, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH19: ChapterDef = {
    id: 'a2_ch19', level: 'A2',
    title: 'Chapter 19: A2 Lektion 19',
    subtitle: 'A2 Course, Chapter 19',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/23 Lektion 19, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/24 Lektion 19, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/25 Lektion 19, Aussprache, 2a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/26 Lektion 19, Aussprache, 2b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH20: ChapterDef = {
    id: 'a2_ch20', level: 'A2',
    title: 'Chapter 20: A2 Lektion 20',
    subtitle: 'A2 Course, Chapter 20',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH21: ChapterDef = {
    id: 'a2_ch21', level: 'A2',
    title: 'Chapter 21: A2 Lektion 21',
    subtitle: 'A2 Course, Chapter 21',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/27 Lektion 21, Basistraining, 12a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/28 Lektion 21, Basistraining, 12b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/29 Lektion 21, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/30 Lektion 21, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/31 Lektion 21, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH22: ChapterDef = {
    id: 'a2_ch22', level: 'A2',
    title: 'Chapter 22: A2 Lektion 22',
    subtitle: 'A2 Course, Chapter 22',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/32 Lektion 22, Hoeren, 1a.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/37 Lektion 22, Aussprache, 1b.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/38 Lektion 22, Aussprache, 3.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/33 Lektion 22, Hoeren, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/34 Lektion 22, Hoeren, 1c.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/35 Lektion 22, Hoeren, 1d.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/36 Lektion 22, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH23: ChapterDef = {
    id: 'a2_ch23', level: 'A2',
    title: 'Chapter 23: A2 Lektion 23',
    subtitle: 'A2 Course, Chapter 23',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/39 Lektion 23, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/40 Lektion 23, Aussprache, 2a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/41 Lektion 23, Aussprache, 2b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const A2_CH24: ChapterDef = {
    id: 'a2_ch24', level: 'A2',
    title: 'Chapter 24: A2 Lektion 24',
    subtitle: 'A2 Course, Chapter 24',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/42 Lektion 24, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/43 Lektion 24, Aussprache, 1 und 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/A2/Menschen_A2_2_AB_Audio/Menschen_A2_2_AB_Audio/44 Lektion 24, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: A2 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for A2 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH1: ChapterDef = {
    id: 'b1_ch1', level: 'B1',
    title: 'Chapter 1: B1 Lektion 1',
    subtitle: 'B1 Course, Chapter 1',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-02 Lektion 1, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-03 Lektion 1, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-04 Lektion 1, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 1\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 1.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 1\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 1.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 1.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 1. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 1.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH2: ChapterDef = {
    id: 'b1_ch2', level: 'B1',
    title: 'Chapter 2: B1 Lektion 2',
    subtitle: 'B1 Course, Chapter 2',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-05 Lektion 2, Basistraining, 8a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-06 Lektion 2, Basistraining, 8b und c.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-07 Lektion 2, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-08 Lektion 2, Aussprache, 2a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-09 Lektion 2, Aussprache, 2b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 2.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 2. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 2.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH3: ChapterDef = {
    id: 'b1_ch3', level: 'B1',
    title: 'Chapter 3: B1 Lektion 3',
    subtitle: 'B1 Course, Chapter 3',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-10 Lektion 3, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-11 Lektion 3, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 3\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 3.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 3.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 3. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 3.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH4: ChapterDef = {
    id: 'b1_ch4', level: 'B1',
    title: 'Chapter 4: B1 Lektion 4',
    subtitle: 'B1 Course, Chapter 4',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-12 Lektion 4, Hoeren, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-13 Lektion 4, Aussprache, 1a und b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 4\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 4.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 4\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 4.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 4\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 4.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 4.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 4. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 4.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH5: ChapterDef = {
    id: 'b1_ch5', level: 'B1',
    title: 'Chapter 5: B1 Lektion 5',
    subtitle: 'B1 Course, Chapter 5',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-14 Lektion 5, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-15 Lektion 5, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 5\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 5.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 5.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 5. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 5.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH6: ChapterDef = {
    id: 'b1_ch6', level: 'B1',
    title: 'Chapter 6: B1 Lektion 6',
    subtitle: 'B1 Course, Chapter 6',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-16 Lektion 6, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-17 Lektion 6, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 6\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 6.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 6\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 6.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 6\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 6.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 6.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 6. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 6.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH7: ChapterDef = {
    id: 'b1_ch7', level: 'B1',
    title: 'Chapter 7: B1 Lektion 7',
    subtitle: 'B1 Course, Chapter 7',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-18 Lektion 7, Basistraining, 8.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-19 Lektion 7, Aussprache, 1a.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-20 Lektion 7, Aussprache, 1b.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 7\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 7.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 7\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 7.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 7.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 7. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 7.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH8: ChapterDef = {
    id: 'b1_ch8', level: 'B1',
    title: 'Chapter 8: B1 Lektion 8',
    subtitle: 'B1 Course, Chapter 8',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the basic training exercises.',
                    content: `🎧 Topic: Basistraining (Vocabulary/Grammar)\nHören Sie die Übung zum Basistraining.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'multipleChoice', prompt: 'Welcher Bereich wird hier geübt?', options: ['Wortschatz / Grammatik', 'Aussprache', 'Ein Dialog'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-21 Lektion 8, Basistraining, 10.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-22 Lektion 8, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 8\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 8.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 8.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 8. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 8.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH9: ChapterDef = {
    id: 'b1_ch9', level: 'B1',
    title: 'Chapter 9: B1 Lektion 9',
    subtitle: 'B1 Course, Chapter 9',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-23 Lektion 9, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-24 Lektion 9, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 9\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 9.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 9.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 9. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 9.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH10: ChapterDef = {
    id: 'b1_ch10', level: 'B1',
    title: 'Chapter 10: B1 Lektion 10',
    subtitle: 'B1 Course, Chapter 10',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-25 Lektion 10, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-26 Lektion 10, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-27 Lektion 10, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 10\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 10.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 10\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 10.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 10.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 10. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 10.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH11: ChapterDef = {
    id: 'b1_ch11', level: 'B1',
    title: 'Chapter 11: B1 Lektion 11',
    subtitle: 'B1 Course, Chapter 11',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-28 Lektion 11, Hoeren, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the dialogue or text passages.',
                    content: `🎧 Topic: Dialog & Hörverstehen\nHören Sie den Dialog oder den Text aus der Lektion.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man hört ein Gespräch oder einen Text.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-29 Lektion 11, Hoeren, 2 und 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-30 Lektion 11, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-31 Lektion 11, Aussprache, 3.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 11\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 11.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 11.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 11. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 11.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH12: ChapterDef = {
    id: 'b1_ch12', level: 'B1',
    title: 'Chapter 12: B1 Lektion 12',
    subtitle: 'B1 Course, Chapter 12',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-32 Lektion 12, Aussprache, 1.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the pronunciation and repeat.',
                    content: `🎧 Topic: Aussprache (Pronunciation)\nHören Sie gut zu und sprechen Sie nach.`,
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [{ type: 'trueFalse', prompt: 'Man übt hier die Aussprache.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }],
                    audioPath: 'German/Menschen/B1/Menschen_B1_1_Arbeitsbuch/1-33 Lektion 12, Aussprache, 2.mp3'
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 12\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 12.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 12\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 12.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 12\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 12.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 12.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 12. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 12.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH13: ChapterDef = {
    id: 'b1_ch13', level: 'B1',
    title: 'Chapter 13: B1 Lektion 13',
    subtitle: 'B1 Course, Chapter 13',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 13\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 13.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 13.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 13. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 13.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH14: ChapterDef = {
    id: 'b1_ch14', level: 'B1',
    title: 'Chapter 14: B1 Lektion 14',
    subtitle: 'B1 Course, Chapter 14',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 14\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 14.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 14.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 14. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 14.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH15: ChapterDef = {
    id: 'b1_ch15', level: 'B1',
    title: 'Chapter 15: B1 Lektion 15',
    subtitle: 'B1 Course, Chapter 15',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 15\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 15.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 15.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 15. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 15.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH16: ChapterDef = {
    id: 'b1_ch16', level: 'B1',
    title: 'Chapter 16: B1 Lektion 16',
    subtitle: 'B1 Course, Chapter 16',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 16\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 16.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 16.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 16. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 16.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH17: ChapterDef = {
    id: 'b1_ch17', level: 'B1',
    title: 'Chapter 17: B1 Lektion 17',
    subtitle: 'B1 Course, Chapter 17',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 17\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 17.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 17.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 17. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 17.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH18: ChapterDef = {
    id: 'b1_ch18', level: 'B1',
    title: 'Chapter 18: B1 Lektion 18',
    subtitle: 'B1 Course, Chapter 18',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 18\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 18.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 18.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 18. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 18.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH19: ChapterDef = {
    id: 'b1_ch19', level: 'B1',
    title: 'Chapter 19: B1 Lektion 19',
    subtitle: 'B1 Course, Chapter 19',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 19\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 19.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 19.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 19. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 19.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH20: ChapterDef = {
    id: 'b1_ch20', level: 'B1',
    title: 'Chapter 20: B1 Lektion 20',
    subtitle: 'B1 Course, Chapter 20',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 20\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 20.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 20.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 20. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 20.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH21: ChapterDef = {
    id: 'b1_ch21', level: 'B1',
    title: 'Chapter 21: B1 Lektion 21',
    subtitle: 'B1 Course, Chapter 21',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 21\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 21.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 21\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 21.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 21\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 21.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 21\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 21.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 21\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 21.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 21.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 21. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 21.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH22: ChapterDef = {
    id: 'b1_ch22', level: 'B1',
    title: 'Chapter 22: B1 Lektion 22',
    subtitle: 'B1 Course, Chapter 22',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 22\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 22.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 22\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 22.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 22\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 22.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 22\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 22.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 22\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 22.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 22.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 22. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 22.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH23: ChapterDef = {
    id: 'b1_ch23', level: 'B1',
    title: 'Chapter 23: B1 Lektion 23',
    subtitle: 'B1 Course, Chapter 23',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 23\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 23.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 23.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 23. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 23.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

const B1_CH24: ChapterDef = {
    id: 'b1_ch24', level: 'B1',
    title: 'Chapter 24: B1 Lektion 24',
    subtitle: 'B1 Course, Chapter 24',
    days: [
        {
            num: 1, title: 'Day 1 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 2, title: 'Day 2 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 3, title: 'Day 3 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 4, title: 'Day 4 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        },
        {
            num: 5, title: 'Day 5 Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: B1 Lektion 24\n\nTask: Listen to the audio and understand the context. This is the generated content for Chapter 24.',
                    question: 'Q1: What is the main idea of this recording?\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter 24.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for B1 Chapter 24. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter 24.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }
    ]
};

export const CURRICULUM: ChapterDef[] = [
    A1_CH1, A1_CH2, A1_CH3, A1_CH4, A1_CH5, A1_CH6, A1_CH7, A1_CH8, A1_CH9, A1_CH10, A1_CH11, A1_CH12, A1_CH13, A1_CH14, A1_CH15, A1_CH16, A1_CH17, A1_CH18, A1_CH19, A1_CH20, A1_CH21, A1_CH22, A1_CH23, A1_CH24, A2_CH1, A2_CH2, A2_CH3, A2_CH4, A2_CH5, A2_CH6, A2_CH7, A2_CH8, A2_CH9, A2_CH10, A2_CH11, A2_CH12, A2_CH13, A2_CH14, A2_CH15, A2_CH16, A2_CH17, A2_CH18, A2_CH19, A2_CH20, A2_CH21, A2_CH22, A2_CH23, A2_CH24, B1_CH1, B1_CH2, B1_CH3, B1_CH4, B1_CH5, B1_CH6, B1_CH7, B1_CH8, B1_CH9, B1_CH10, B1_CH11, B1_CH12, B1_CH13, B1_CH14, B1_CH15, B1_CH16, B1_CH17, B1_CH18, B1_CH19, B1_CH20, B1_CH21, B1_CH22, B1_CH23, B1_CH24
];
