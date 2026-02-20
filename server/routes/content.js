import express from 'express';
import db from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ── Vocabulary ────────────────────────────────────────────────────────────────

// Get vocabulary list (optionally filtered by level/category)
router.get('/vocabulary', authenticateToken, (req, res) => {
  const { level, category, search, limit = 50, offset = 0 } = req.query;

  let query = 'SELECT * FROM vocabulary WHERE 1=1';
  const params = [];

  if (level) { query += ' AND level = ?'; params.push(level); }
  if (category) { query += ' AND category = ?'; params.push(category); }
  if (search) { query += ' AND (german LIKE ? OR english LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }

  const total = db.prepare(query.replace('SELECT *', 'SELECT COUNT(*) as count')).get(...params);
  query += ' ORDER BY level, category, german LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  const items = db.prepare(query).all(...params);
  res.json({ items, total: total.count, limit: parseInt(limit), offset: parseInt(offset) });
});

// Get vocabulary categories
router.get('/vocabulary/categories', authenticateToken, (req, res) => {
  const { level } = req.query;
  let query = 'SELECT DISTINCT category FROM vocabulary WHERE category IS NOT NULL';
  const params = [];
  if (level) { query += ' AND level = ?'; params.push(level); }
  query += ' ORDER BY category';
  const categories = db.prepare(query).all(...params);
  res.json(categories.map(c => c.category));
});

// Get a single vocabulary item
router.get('/vocabulary/:id', authenticateToken, (req, res) => {
  const item = db.prepare('SELECT * FROM vocabulary WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Vocabulary item not found' });
  res.json(item);
});

// Add vocabulary item
router.post('/vocabulary', authenticateToken, (req, res) => {
  const { german, english, level, category, exampleSentence } = req.body;
  if (!german || !english || !level) {
    return res.status(400).json({ error: 'german, english, and level are required' });
  }
  const result = db.prepare(`
    INSERT INTO vocabulary (german, english, level, category, example_sentence)
    VALUES (?, ?, ?, ?, ?)
  `).run(german, english, level, category || null, exampleSentence || null);

  res.status(201).json({ id: result.lastInsertRowid, german, english, level, category, exampleSentence });
});

// ── Prepositions ──────────────────────────────────────────────────────────────

router.get('/prepositions', authenticateToken, (req, res) => {
  const { level } = req.query;
  let query = 'SELECT * FROM prepositions WHERE 1=1';
  const params = [];
  if (level) { query += ' AND level = ?'; params.push(level); }
  query += ' ORDER BY level, word';
  res.json(db.prepare(query).all(...params));
});

// ── Grammar ───────────────────────────────────────────────────────────────────

router.get('/grammar', authenticateToken, (req, res) => {
  const { level } = req.query;
  let query = 'SELECT id, title, level, description FROM grammar_topics WHERE 1=1';
  const params = [];
  if (level) { query += ' AND level = ?'; params.push(level); }
  query += ' ORDER BY level, id';
  res.json(db.prepare(query).all(...params));
});

router.get('/grammar/:id', authenticateToken, (req, res) => {
  const topic = db.prepare('SELECT * FROM grammar_topics WHERE id = ?').get(req.params.id);
  if (!topic) return res.status(404).json({ error: 'Grammar topic not found' });
  res.json({
    ...topic,
    examples: topic.examples ? JSON.parse(topic.examples) : [],
    exercises: topic.exercises ? JSON.parse(topic.exercises) : [],
  });
});

// ── Lessons ───────────────────────────────────────────────────────────────────

router.get('/lessons', authenticateToken, (req, res) => {
  const { level } = req.query;
  let query = 'SELECT id, title, level, category, description, order_index FROM lessons WHERE 1=1';
  const params = [];
  if (level) { query += ' AND level = ?'; params.push(level); }
  query += ' ORDER BY level, order_index';
  res.json(db.prepare(query).all(...params));
});

router.get('/lessons/:id', authenticateToken, (req, res) => {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

// ── Game Data ─────────────────────────────────────────────────────────────────

// Get randomized vocabulary for games
router.get('/games/vocab-set', authenticateToken, (req, res) => {
  const { level, category, count = 10 } = req.query;

  let query = 'SELECT * FROM vocabulary WHERE 1=1';
  const params = [];
  if (level) { query += ' AND level = ?'; params.push(level); }
  if (category) { query += ' AND category = ?'; params.push(category); }
  query += ' ORDER BY RANDOM() LIMIT ?';
  params.push(parseInt(count));

  const items = db.prepare(query).all(...params);
  res.json(items);
});

// Get all levels with counts
router.get('/levels', authenticateToken, (req, res) => {
  const levels = db.prepare(`
    SELECT level,
      COUNT(*) as vocab_count
    FROM vocabulary
    GROUP BY level
    ORDER BY level
  `).all();
  res.json(levels);
});

export default router;
