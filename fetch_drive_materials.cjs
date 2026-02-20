/**
 * fetch_drive_materials.cjs
 *
 * Runs at BUILD TIME in GitHub Actions (never in the browser).
 * Reads GOOGLE_API_KEY + DRIVE_FOLDER_ID from the environment,
 * fetches the folder tree from Google Drive API v3,
 * and writes public/materials.json.
 *
 * The browser bundle never sees the API key or folder ID.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GOOGLE_API_KEY;
const FOLDER_ID = process.env.DRIVE_FOLDER_ID;

if (!API_KEY || !FOLDER_ID) {
    console.warn('⚠️  GOOGLE_API_KEY or DRIVE_FOLDER_ID not set — writing empty materials.json');
    const outDir = require('path').join(__dirname, 'public');
    if (!require('fs').existsSync(outDir)) require('fs').mkdirSync(outDir, { recursive: true });
    require('fs').writeFileSync(require('path').join(outDir, 'materials.json'), JSON.stringify({ tree: [] }, null, 2));
    process.exit(0); // Don't block the build
}

const AUDIO_MIMES = new Set([
    'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/aac', 'audio/flac',
]);
const PDF_MIMES = new Set(['application/pdf']);
const FOLDER_MIME = 'application/vnd.google-apps.folder';

function get(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function listChildren(folderId) {
    const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const fields = encodeURIComponent('files(id,name,mimeType)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=1000&key=${API_KEY}&orderBy=name`;
    const data = await get(url);
    return data.files || [];
}

async function buildTree(folderId, depth = 0, maxDepth = 3) {
    const children = await listChildren(folderId);
    const result = [];
    for (const f of children) {
        if (f.mimeType === FOLDER_MIME) {
            const sub = depth < maxDepth ? await buildTree(f.id, depth + 1, maxDepth) : [];
            result.push({ id: f.id, name: f.name, type: 'folder', children: sub });
        } else {
            const isAudio = AUDIO_MIMES.has(f.mimeType);
            const isPdf = PDF_MIMES.has(f.mimeType);
            // We store only the file ID — the URL is constructed client-side from the ID
            // (file IDs alone don't expose folder structure or allow browsing)
            result.push({
                id: f.id,
                name: f.name,
                type: isAudio ? 'audio' : isPdf ? 'pdf' : 'file',
            });
        }
    }
    return result;
}

(async () => {
    console.log('Fetching Google Drive folder tree…');
    const tree = await buildTree(FOLDER_ID, 0, 3);

    const outDir = path.join(__dirname, 'public');
    const outFile = path.join(outDir, 'materials.json');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify({ tree }, null, 2));

    // Count files
    function count(nodes) {
        let audio = 0, pdf = 0;
        for (const n of nodes) {
            if (n.type === 'audio') audio++;
            else if (n.type === 'pdf') pdf++;
            if (n.children) { const s = count(n.children); audio += s.audio; pdf += s.pdf; }
        }
        return { audio, pdf };
    }
    const { audio, pdf } = count(tree);
    console.log(`✅ Wrote public/materials.json — ${audio} audio files, ${pdf} PDFs`);
})();
