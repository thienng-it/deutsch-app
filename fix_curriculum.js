const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'curriculum.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to find lines within extraAudio arrays that have path not starting with German/Menschen
// Specifically: { label: ..., path: 'German/NotMenschen/...' },
const lines = content.split('\n');
const newLines = lines.filter(line => {
    // If it's an extraAudio line
    const isExtraAudioItem = line.match(/^\s*\{\s*label:.*path:\s*'German\/(?!Menschen)/);
    return !isExtraAudioItem;
});

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Filtered non-Menschen audio from curriculum.ts');
