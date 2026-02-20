const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.ts');
let content = fs.readFileSync(curriculumPath, 'utf8');

const startMarker = 'const A1_CH7: ChapterDef = {';
const endMarker = 'const A1_CH8: ChapterDef = {';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers');
    process.exit(1);
}

const newA1CH7 = `const A1_CH7: ChapterDef = {
    id: 'a1_ch7', level: 'A1',
    title: 'Chapter 7: Hobbys & Fähigkeiten',
    subtitle: 'Du kannst wirklich toll ...!',
    days: [
        {
            num: 1, title: 'Vocabulary: Hobbys', skills: {
                listening: {
                    instruction: 'Listen to the audio. Review the vocabulary first, then answer the questions.',
                    content: \`🎧 Topic: Hobbys & Freizeit (Level Course, Chapter 7)

📝 Vocabulary to listen for:
• kochen = to cook
• tanzen = to dance
• Schach spielen = to play chess
• Musik hören = to listen to music
• Ski fahren = to ski
• im Internet surfen = to surf the internet

🎯 Task: Identify the hobbies mentioned by the speakers.\`,
                    question: 'Q1: What hobbies do you hear?',
                    answer: 'Listen again — the speakers mention singing, cooking, and playing chess.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'Which of the following means "to ski"?', options: ['kochen', 'Schach spielen', 'Ski fahren', 'tanzen'], correctAnswer: 2 },
                        { type: 'fillBlank', prompt: 'Im Internet ___.', correctAnswer: 'surfen', acceptableAnswers: ['Surfen'] },
                        { type: 'multipleChoice', prompt: 'What does "Schach spielen" mean?', options: ['To play football', 'To play chess', 'To play tennis', 'To dance'], correctAnswer: 1 }
                    ],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 2.mp3', extraAudio: [
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8 1.mp3' },
                        { label: 'Extra Audio', path: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8 2.mp3' }
                    ]
                },
                speaking: {
                    instruction: 'Practice talking about your hobbies.',
                    content: \`Dialogue — Meine Hobbys:
A: Was machst du gern in der Freizeit?
B: Ich koche gern. Und du?
A: Ich treffe gern Freunde. Mein Hobby ist Fußball.
B: Fährst du gern Ski?
A: Nein, ich kann nicht Ski fahren.

💡 Tip: Use "Ich ... gern" (e.g., Ich lese gern).\`
                },
                reading: {
                    instruction: 'Read the text and answer the questions.',
                    content: \`Freizeit (Free Time):

Oft gehe ich spazieren. Ich höre gern Musik. Ich liebe die Natur. Ich mache sehr gern Ausflüge. Mein Hobby ist Fußball. Mein Lieblingskomponist ist Johann Sebastian Bach. Anna kocht gern und spielt am Wochenende Schach.\`,
                    question: 'Q1: What does the person like to hear?\\nQ2: What is the person\\'s hobby?',
                    answer: 'A1: Musik\\nA2: Fußball',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Das Hobby ist Tennis.', options: ['Richtig', 'Falsch'], correctAnswer: 1 },
                        { type: 'fillBlank', prompt: 'Anna ___ gern Schach.', correctAnswer: 'spielt', acceptableAnswers: ['Spielt'] }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: \`Exercise 1: Write down 3 of your hobbies.
Exercise 2: Write "I like to cook" in German.\`,
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
                    instruction: 'Listen to the audio regarding abilities.',
                    content: \`🎧 Topic: The verb "können" (Level Course, Chapter 7)

📝 Conjugation of können (can/be able to):
• ich kann      • wir können
• du kannst     • ihr könnt
• er/sie kann   • sie/Sie können

🎯 Task: Listen for what the speakers can or cannot do.\`,
                    question: 'Q1: Can the person play the guitar well?',
                    answer: 'Yes, they can play the guitar very well.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'Which is correct for "ich"?', options: ['können', 'kannst', 'kann'], correctAnswer: 2 },
                        { type: 'fillBlank', prompt: 'Du ___ wirklich toll tanzen.', correctAnswer: 'kannst', acceptableAnswers: ['Kannst'] }
                    ],
                    audioPath: 'German/Menschen/A1/Menschen_A1_1_KB_Audio/Lektion 7, 8.mp3'
                },
                speaking: {
                    instruction: 'Practice using "können".',
                    content: \`Practice sentences aloud:
1. Ich kann ein bisschen Schach spielen.
2. Kannst du gut Tennis spielen?
3. Sie können aber toll Ski fahren!
4. Wir können gar nicht singen.\`
                },
                reading: {
                    instruction: 'Read the short dialogue.',
                    content: \`A: Kannst du gut Gitarre spielen?
B: Nein, ich kann gar nicht Gitarre spielen. Aber ich kann gut singen!
A: Wow! Du kannst wirklich toll singen.\`,
                    question: 'What can person B do well?',
                    answer: 'Singen (singing).',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Person B kann gut Gitarre spielen.', options: ['Richtig', 'Falsch'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write sentences with "können".',
                    content: \`Complete the sentences with the correct form of können:
1. Ich ___ gut malen.
2. ___ du Schach spielen?
3. Anna und Tom ___ sehr gut kochen.\`,
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
                    content: \`🎧 Topic: Compliments (Level Course, Chapter 7)

📝 Compliments:
• Du kannst ja super tanzen! = You can dance really great!
• Du kannst wirklich toll kochen. = You can cook really well.
• Deine Augen sind sehr schön. = Your eyes are very beautiful.

🎯 Task: Identify the compliments given.\`,
                    question: 'Q1: What is complimented?',
                    answer: 'Dancing, cooking, and eyes are complimented.',
                    exercises: [
                        { type: 'trueFalse', prompt: 'The word "toll" means "terrible".', options: ['Richtig', 'Falsch'], correctAnswer: 1, explanation: 'Toll means great/fantastic.' }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice making and receiving compliments.',
                    content: \`Roleplay:
A: Wow! Du kannst wirklich toll malen!
B: Vielen Dank! / Oh, danke! / Danke sehr!\`
                },
                reading: {
                    instruction: 'Read the short situation.',
                    content: \`Dinner Party:
Lisa is eating at Markus's house. Markus has cooked dinner.
Lisa: Hmm, das ist lecker! Du kannst ja super kochen!
Markus: Oh, danke sehr. Das freut mich.\`,
                    question: 'Who cooked dinner?',
                    answer: 'Markus.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'How does Markus respond to the compliment?', options: ['Er ist wütend.', 'Er sagt "Danke sehr".', 'Er sagt "Nein".'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write a compliment.',
                    content: \`Write three compliments in German for a friend.\`,
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
                    content: \`🎧 Topic: Asking for Permission (Level Course, Chapter 7)

📝 Phrases:
• Kann ich mal telefonieren? = Can I make a phone call?
• Kann ich hier rauchen? = Can I smoke here?
• Kann ich das Auto haben? = Can I have the car?

🎯 Task: Listen to the questions and responses.\`,
                    question: 'Q1: What does the person ask to use?',
                    answer: 'The car and the phone.',
                    exercises: [
                        { type: 'fillBlank', prompt: 'Kann ich mal ___? (make a call)', correctAnswer: 'telefonieren', acceptableAnswers: ['Telefonieren'] }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Practice asking for permission and replying.',
                    content: \`A: Kann ich mal telefonieren?
B: Ja, klar. / Ja, natürlich. / Ja, gern. (OR: Nein, nicht so gern.)\`
                },
                reading: {
                    instruction: 'Read the dialogue.',
                    content: \`In a café:
Kunde: Entschuldigung, kann ich hier rauchen?
Kellner: Nein, das ist hier leider verboten.
Kunde: Oh, okay.\`,
                    question: 'Is smoking allowed?',
                    answer: 'No.',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Rauchen ist erlaubt (allowed).', options: ['Richtig', 'Falsch'], correctAnswer: 1 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: \`Exercise: Translate "Can I make a phone call?"\`,
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
                    content: \`🎧 Topic: Modul 3 Review

Task: Listen to the dialogue again and identify the hobbies and abilities mentioned.
This is the final day of Chapter 7.\`,
                    question: 'What abilities are discussed?',
                    answer: 'Various hobbies and the use of the modal verb "können" are reviewed.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'Which verb is used for "can/be able to"?', options: ['haben', 'sein', 'können'], correctAnswer: 2 }
                    ],
                    audioPath: undefined
                },
                speaking: {
                    instruction: 'Give a short presentation.',
                    content: \`Presentation (say aloud):
"Hallo, ich bin [Name]. Meine Hobbys sind Kochen und Musik hören. 
Ich kann sehr gut tanzen, aber ich kann gar nicht Schach spielen."\`
                },
                reading: {
                    instruction: 'Read the summary of Modul 3.',
                    content: \`In this chapter, we learned about hobbies (Hobbys), compliments (Komplimente), and how to express ability (Fähigkeit) using the modal verb "können".\`,
                    question: 'T/F 1: "können" is a modal verb.',
                    answer: '1: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: 'Komplimente means Compliments.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write a full paragraph about your free time.',
                    content: \`Write 4 sentences:
- 2 hobbies you have.
- 1 thing you can do well.
- 1 thing you cannot do at all.\`,
                    answer: 'I can read your paragraph and give feedback based on the chapter vocabulary.',
                    exercises: [
                        { type: 'fillBlank', prompt: 'Ich ___ nicht Ski fahren.', correctAnswer: 'kann', acceptableAnswers: ['Kann'] }
                    ]
                }
            }
        }
    ]
};

`;

const finalContent = content.substring(0, startIndex) + newA1CH7 + content.substring(endIndex);

fs.writeFileSync(curriculumPath, finalContent);
console.log('Successfully injected real content for A1_CH7!');
