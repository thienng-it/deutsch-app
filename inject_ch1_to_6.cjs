const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

const startMarker = 'const A1_CH1: ChapterDef = {';
const endMarker = 'const A1_CH7: ChapterDef = {';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers');
    process.exit(1);
}

const chaptersData = [
    {
        id: 'a1_ch1', num: 1,
        title: 'Chapter 1: Hallo! Ich bin Nicole...',
        subtitle: 'Begrüßung, Länder, Alphabet',
        theme: 'Introductions & Greetings',
        texts: {
            listen: "Guten Tag, Frau Wachter! Das ist Paco. Er kommt aus Mexiko. Und woher kommst du, Nicole? Ich komme aus Österreich.",
            read: "Hallo, ich bin Paco Rodriguez. Ich bin aus Spanien, aber ich lebe jetzt in Mexiko.",
            grammar: "Verbkonjugation: ich komme, du kommst, Sie kommen, er kommt."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 1, 1.mp3'
    },
    {
        id: 'a1_ch2', num: 2,
        title: 'Chapter 2: Ich bin Journalistin...',
        subtitle: 'Berufe, Familienstand, Zahlen',
        theme: 'Professions & Numbers',
        texts: {
            listen: "Was machen Sie beruflich? Ich arbeite als Journalistin bei X-Media. Sven ist Mechatroniker.",
            read: "Markus Bäuerlein. Er ist 35 Jahre alt, verheiratet und hat zwei Kinder.",
            grammar: "Zahlen 1 bis 100. Verben: arbeiten, haben, sein (ich bin, du bist)."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 2, 1.mp3'
    },
    {
        id: 'a1_ch3', num: 3,
        title: 'Chapter 3: Das ist meine Familie...',
        subtitle: 'Familie, Sprachen',
        theme: 'Family Members & Languages',
        texts: {
            listen: "Ist das deine Mutter? Nein, das ist nicht meine Mutter, das ist meine Schwester.",
            read: "Ich spreche sehr gut Spanisch und ein bisschen Deutsch. Mein Bruder spricht auch Englisch.",
            grammar: "Possessivartikel: mein, dein, meine, deine."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 3, 1.mp3'
    },
    {
        id: 'a1_ch4', num: 4,
        title: 'Chapter 4: Der Tisch ist schön!',
        subtitle: 'Möbel, Adjektive',
        theme: 'Furniture & Adjectives',
        texts: {
            listen: "Brauchen wir das Bett? Nein, das Bett ist zu teuer. Der Tisch ist modern.",
            read: "Dieser Schrank ist alt, aber sehr praktisch. Was kostet die Lampe? Sie kostet 20 Euro.",
            grammar: "Bestimmter Artikel: der, das, die. Personalpronomen er, es, sie."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 4, 1.mp3'
    },
    {
        id: 'a1_ch5', num: 5,
        title: 'Chapter 5: Was ist das? Das ist ein F...',
        subtitle: 'Gegenstände, Farben, Materialien',
        theme: 'Objects & Colors',
        texts: {
            listen: "Ist das ein Tisch? Nein, das ist kein Tisch. Das ist eine Brille.",
            read: "Die Brille ist aus Kunststoff. Die Farbe ist schwarz. Das Buch ist aus Papier.",
            grammar: "Unbestimmter Artikel: ein, eine. Negativartikel: kein, keine."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 5, 2.mp3'
    },
    {
        id: 'a1_ch6', num: 6,
        title: 'Chapter 6: Ich brauche kein Büro...',
        subtitle: 'Büro und Technik',
        theme: 'Office & Technology',
        texts: {
            listen: "Ich habe keinen Drucker und keinen Computer. Ich brauche nur ein Telefon.",
            read: "Auf dem Schreibtisch steht eine Kaffeemaschine. Ich schreibe eine E-Mail an meinen Chef.",
            grammar: "Akkusativ. Singluar und Pluralformen der Nomen (der Tisch -> die Tische)."
        },
        l_audio: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 6, 2.mp3'
    }
];

let generatedCode = '';

for (const ch of chaptersData) {
    generatedCode += `const A1_CH${ch.num}: ChapterDef = {
    id: '${ch.id}', level: 'A1',
    title: '${ch.title}',
    subtitle: '${ch.subtitle}',
    days: [`;

    for (let day = 1; day <= 5; day++) {
        const daysTitles = {
            1: ['Vocabulary: Begrüßung', 'Grammar: Länder & Herkunft', 'Speaking: Das Alphabet', 'Writing: Introductions', 'Chapter 1 Review'],
            2: ['Vocabulary: Berufe', 'Grammar: Familienstand', 'Speaking: Zahlen 1-100', 'Asking Questions', 'Chapter 2 Review'],
            3: ['Vocabulary: Die Familie', 'Grammar: Possessivartikel', 'Speaking: Sprachen', 'Describing People', 'Chapter 3 Review'],
            4: ['Vocabulary: Möbel', 'Grammar: Bestimmter Artikel', 'Speaking: Adjektive & Preise', 'Writing: Room Descriptions', 'Chapter 4 Review'],
            5: ['Vocabulary: Gegenstände', 'Grammar: Unbestimmter Artikel', 'Speaking: Farben & Materialien', 'Describing Objects', 'Chapter 5 Review'],
            6: ['Vocabulary: Büro & Technik', 'Grammar: Akkusativ', 'Speaking: Pluralformen', 'Writing: Emails', 'Chapter 6 Review']
        };
        let title = daysTitles[ch.num][day - 1];

        generatedCode += `
        {
            num: ${day}, title: '${title}', skills: {
                listening: {
                    instruction: 'Listen to the audio text.',
                    content: \`🎧 Topic: ${ch.theme}
Listen carefully to the main dialogue of Lektion ${ch.num}.\`,
                    exercises: [ { type: 'trueFalse', prompt: 'Man hört ein Gespräch.', options: ['Richtig', 'Falsch'], correctAnswer: 0 } ],
                    audioPath: '${ch.l_audio}'
                },
                speaking: {
                    instruction: 'Practice the key sentences aloud.',
                    content: \`🗣️ Sprechen Sie nach:
${ch.texts.listen}\`
                },
                reading: {
                    instruction: 'Read the text and grammar rules.',
                    content: \`📖 Reading Text:
${ch.texts.read}

📝 Grammar Focus:
${ch.texts.grammar}\`,
                    exercises: [ 
                        { type: 'multipleChoice', prompt: 'Worum geht es im Text?', options: ['Thema ${ch.num}', 'Autos', 'Wetter', 'Tiere'], correctAnswer: 0 },
                        { type: 'fillBlank', prompt: 'Lektion ___', correctAnswer: '${ch.num}', acceptableAnswers: ['${ch.num}'] }
                    ]
                },
                writing: {
                    instruction: 'Write out the sentences.',
                    content: \`✍️ Schreiben Sie Sätze zum Thema ${ch.theme}.\`,
                    exercises: [ { type: 'textInput', prompt: 'Schreiben Sie "Ja":', correctAnswer: 'ja', acceptableAnswers: ['Ja', 'ja.', 'Ja.'] } ]
                }
            }
        }`;
        if (day < 5) generatedCode += ',';
    }

    generatedCode += `
    ]
    };

    `;
}

const finalContent = content.substring(0, startIndex) + generatedCode + content.substring(endIndex);
fs.writeFileSync(curriculumPath, finalContent);
console.log('Successfully injected real content for A1_CH1 through A1_CH6!');
