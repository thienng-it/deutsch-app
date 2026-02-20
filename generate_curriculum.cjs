const fs = require('fs');
const path = require('path');

const materialsBase = path.join(__dirname, 'Materials', 'German', 'Menschen');
const curriculumPath = path.join(__dirname, 'src', 'data', 'curriculum.ts');

// We will keep A1_CH1 to A1_CH6 as they are (rich content)
// We will generate A1_CH7 to B1_CH24 dynamically.

// A helper to walk dir and get all mp3s
function getAllAudioFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            getAllAudioFiles(path.join(dir, file), fileList);
        } else if (file.toLowerCase().endsWith('.mp3')) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const allAudioPaths = getAllAudioFiles(materialsBase);

// Categorize audio files by Level and Chapter Number
// A1 has 24 chapters (1-24)
// A2 has 24 chapters (1-24)
// B1 has 24 chapters (1-24)

// We want to map each audio file to { level, chapter, relativePath }
const audioMap = {
    A1: Array.from({ length: 25 }, () => []),
    A2: Array.from({ length: 25 }, () => []),
    B1: Array.from({ length: 25 }, () => [])
};

const lektionRegex = /Lektion\s*(\d+)/i;

for (const fullPath of allAudioPaths) {
    const relPath = path.relative(__dirname, fullPath); // e.g., Materials/German/Menschen/A1/.../Lektion 1, 1.mp3
    // Make relative to Materials/ for the curriculum path
    const audioCurriculumPath = relPath.replace('Materials/', '').replace(/\\/g, '/');

    let level = null;
    if (audioCurriculumPath.includes('/A1/')) level = 'A1';
    else if (audioCurriculumPath.includes('/A2/')) level = 'A2';
    else if (audioCurriculumPath.includes('/B1/')) level = 'B1';

    if (!level) continue;

    const match = audioCurriculumPath.match(lektionRegex);
    if (match) {
        let chapter = parseInt(match[1], 10);

        // A1 Chapters 1-12 are in A1.1, 13-24 are in A1.2
        // Same for A2 and B1
        // Ensure chapter is 1-24
        if (chapter >= 1 && chapter <= 24) {
            audioMap[level][chapter].push(audioCurriculumPath);
        }
    }
}

// Generate Chapter strings
function generateChapterString(level, chapterNum) {
    const id = `${level.toLowerCase()}_ch${chapterNum}`;
    const varName = `${level}_CH${chapterNum}`;

    // Get audio files for this chapter
    const audios = audioMap[level][chapterNum] || [];
    // Sort audios generically
    audios.sort();

    // Try to get 5 distinct primary audios for 5 days
    // If fewer than 5, we'll reuse or leave undefined for some days
    let primaryAudios = audios.slice(0, 5);
    while (primaryAudios.length < 5) {
        primaryAudios.push(''); // blank if nothing found
    }

    // Any remaining audios can be extra
    const extraAudios = audios.slice(5).map(a => `{ label: 'Extra Audio', path: '${a}' }`);
    const extraAudioStr = extraAudios.length > 0 ? `, extraAudio: [\n                            ${extraAudios.join(',\n                            ')}\n                        ]` : '';

    return `const ${varName}: ChapterDef = {
    id: '${id}', level: '${level}',
    title: 'Chapter ${chapterNum}: ${level} Lektion ${chapterNum}',
    subtitle: '${level} Course, Chapter ${chapterNum}',
    days: [
${[1, 2, 3, 4, 5].map(day => `        {
            num: ${day}, title: 'Day ${day} Section', skills: {
                listening: {
                    instruction: 'Listen to the audio recording for this chapter and answer the questions.',
                    content: '🎧 Topic: ${level} Lektion ${chapterNum}\\n\\nTask: Listen to the audio and understand the context. This is the generated content for Chapter ${chapterNum}.',
                    question: 'Q1: What is the main idea of this recording?\\nQ2: What specific details are mentioned?',
                    answer: 'Listen again to find the details. This is an auto-generated placeholder.',
                    exercises: [
                        { type: 'multipleChoice', prompt: 'What is the topic of the audio?', options: ['Topic A', 'Topic B', 'Topic C'], correctAnswer: 0 }
                    ],
                    ${primaryAudios[day - 1] ? `audioPath: '${primaryAudios[day - 1]}'${day === 1 ? extraAudioStr : ''}` : `audioPath: undefined`}
                },
                speaking: {
                    instruction: 'Practice speaking loud with the context.',
                    content: 'Role-play or repeat the dialogue based on the listening exercise for Chapter ${chapterNum}.'
                },
                reading: {
                    instruction: 'Read the summary text carefully.',
                    content: 'Reading Text: You are reading the auto-generated text for ${level} Chapter ${chapterNum}. It contains important vocabulary.',
                    question: 'T/F 1: The text mentions key details.\\nT/F 2: The vocabulary is new.',
                    answer: '1: Richtig\\n2: Richtig',
                    exercises: [
                        { type: 'trueFalse', prompt: ' The text is about chapter ${chapterNum}.', options: ['Richtig', 'Falsch'], correctAnswer: 0 }
                    ]
                },
                writing: {
                    instruction: 'Write out your summary.',
                    content: 'Exercise 1: Write down 5 sentences regarding the audio and reading text.',
                    answer: 'Write your own responses based on the chapter.',
                    exercises: [
                        { type: 'textInput', prompt: 'Type a sample sentence from the chapter:', correctAnswer: 'sample', acceptableAnswers: ['Sample'] }
                    ]
                }
            }
        }`).join(',\n')}
    ]
};`;
}

// Read existing curriculum to keep everything before A1_CH7
let curContent = fs.readFileSync(curriculumPath, 'utf8');

// The marker where we start stripping old content is: `const A1_CH7: ChapterDef = {`
const marker = 'const A1_CH7: ChapterDef = {';
const markerIdx = curContent.indexOf(marker);

if (markerIdx === -1) {
    console.error('Could not find A1_CH7 marker. Make sure the curriculum has A1_CH7.');
    process.exit(1);
}

let newContent = curContent.substring(0, markerIdx);

// Now generate all chapters from A1_CH7 up to B1_CH24
const generatedVars = [];

// A1
for (let i = 7; i <= 24; i++) {
    newContent += generateChapterString('A1', i) + '\n\n';
    generatedVars.push(`A1_CH${i}`);
}

// A2
for (let i = 1; i <= 24; i++) {
    newContent += generateChapterString('A2', i) + '\n\n';
    generatedVars.push(`A2_CH${i}`);
}

// B1
for (let i = 1; i <= 24; i++) {
    newContent += generateChapterString('B1', i) + '\n\n';
    generatedVars.push(`B1_CH${i}`);
}

// Ensure the export array captures everything
// The first 6 are existing A1_CH1 .. A1_CH6
const allVars = [
    'A1_CH1', 'A1_CH2', 'A1_CH3', 'A1_CH4', 'A1_CH5', 'A1_CH6',
    ...generatedVars
];

newContent += `export const CURRICULUM: ChapterDef[] = [\n  ${allVars.join(', ')}\n];\n`;

fs.writeFileSync(curriculumPath, newContent);
console.log('Successfully regenerated curriculum.ts with accurate audio mapping to 72 chapters (Day 1-5 format)!');
