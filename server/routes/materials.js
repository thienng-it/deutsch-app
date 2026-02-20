import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MATERIALS_ROOT = path.join(__dirname, '../../Materials');

const router = express.Router();

// Recursively build a tree of the materials folder
function buildTree(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip hidden files

    const fullPath = path.join(dirPath, entry.name);
    const rel = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      result.push({
        type: 'folder',
        name: entry.name,
        path: rel,
        children: buildTree(fullPath, rel),
      });
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const isAudio = ['.mp3', '.wav', '.ogg', '.m4a'].includes(ext);
      const isPdf = ext === '.pdf';

      if (isAudio || isPdf) {
        const stats = fs.statSync(fullPath);
        result.push({
          type: isAudio ? 'audio' : 'pdf',
          name: entry.name,
          path: rel,
          url: `/materials/${rel.split('/').map(s => encodeURIComponent(s)).join('/')}`,
          size: stats.size,
          ext,
        });
      }
    }
  }

  return result;
}

// Get materials tree
router.get('/tree', authenticateToken, (req, res) => {
  try {
    if (!fs.existsSync(MATERIALS_ROOT)) {
      return res.json({ tree: [], message: 'Materials folder not found' });
    }
    const tree = buildTree(MATERIALS_ROOT);
    res.json({ tree });
  } catch (err) {
    console.error('Materials tree error:', err);
    res.status(500).json({ error: 'Could not read materials folder' });
  }
});

// List audio files for a specific textbook/level
router.get('/audio', authenticateToken, (req, res) => {
  const { folderPath } = req.query;

  if (!folderPath) {
    return res.status(400).json({ error: 'folderPath required' });
  }

  // Security: prevent path traversal
  const safePath = path.normalize(folderPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const targetDir = path.join(MATERIALS_ROOT, safePath);

  if (!targetDir.startsWith(MATERIALS_ROOT)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!fs.existsSync(targetDir)) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  const files = fs.readdirSync(targetDir)
    .filter(f => ['.mp3', '.wav', '.ogg', '.m4a'].includes(path.extname(f).toLowerCase()))
    .map(f => ({
      name: f,
      url: `/materials/${[...safePath.split('/'), f].filter(Boolean).map(s => encodeURIComponent(s)).join('/')}`,
      path: path.join(safePath, f),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  res.json({ files, count: files.length });
});

// Get stats (total audio files, PDFs, etc.)
router.get('/stats', authenticateToken, (req, res) => {
  let audioCount = 0;
  let pdfCount = 0;

  function countFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      if (e.isDirectory()) {
        countFiles(path.join(dir, e.name));
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (['.mp3', '.wav', '.ogg', '.m4a'].includes(ext)) audioCount++;
        if (ext === '.pdf') pdfCount++;
      }
    }
  }

  countFiles(MATERIALS_ROOT);
  res.json({ audioFiles: audioCount, pdfFiles: pdfCount });
});

export default router;
