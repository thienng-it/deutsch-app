import express from 'express';
import db from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all progress for current user
router.get('/', authenticateToken, (req, res) => {
  const progress = db.prepare(`
    SELECT * FROM progress WHERE user_id = ? ORDER BY last_practiced DESC
  `).all(req.user.id);
  res.json(progress);
});

// Get summary stats
router.get('/summary', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const vocabByLevel = db.prepare(`
    SELECT v.level,
      COUNT(*) as total,
      COUNT(CASE WHEN p.completed = 1 THEN 1 END) as mastered
    FROM vocabulary v
    LEFT JOIN progress p ON p.content_id = CAST(v.id AS TEXT)
      AND p.user_id = ?
      AND p.content_type = 'vocabulary'
    GROUP BY v.level
    ORDER BY v.level
  `).all(userId);

  const recentSessions = db.prepare(`
    SELECT * FROM learning_sessions
    WHERE user_id = ?
    ORDER BY started_at DESC
    LIMIT 10
  `).all(userId);

  const streakData = db.prepare(`
    SELECT DATE(started_at) as day, COUNT(*) as sessions
    FROM learning_sessions
    WHERE user_id = ?
    GROUP BY DATE(started_at)
    ORDER BY day DESC
    LIMIT 30
  `).all(userId);

  const totalScore = db.prepare(`
    SELECT COALESCE(SUM(score), 0) as total FROM learning_sessions WHERE user_id = ?
  `).get(userId);

  const gameStats = db.prepare(`
    SELECT session_type, COUNT(*) as count, AVG(score) as avg_score
    FROM learning_sessions
    WHERE user_id = ?
    GROUP BY session_type
  `).all(userId);

  res.json({
    vocabByLevel,
    recentSessions,
    streakData,
    totalScore: totalScore.total,
    gameStats,
  });
});

// Update progress for a content item
router.post('/update', authenticateToken, (req, res) => {
  const { contentType, contentId, level, score, completed } = req.body;

  if (!contentType || !contentId || !level) {
    return res.status(400).json({ error: 'contentType, contentId, and level are required' });
  }

  const existing = db.prepare(`
    SELECT * FROM progress
    WHERE user_id = ? AND content_type = ? AND content_id = ?
  `).get(req.user.id, contentType, String(contentId));

  if (existing) {
    db.prepare(`
      UPDATE progress SET
        score = MAX(score, ?),
        attempts = attempts + 1,
        completed = CASE WHEN ? = 1 THEN 1 ELSE completed END,
        last_practiced = CURRENT_TIMESTAMP
      WHERE user_id = ? AND content_type = ? AND content_id = ?
    `).run(score || 0, completed ? 1 : 0, req.user.id, contentType, String(contentId));
  } else {
    db.prepare(`
      INSERT INTO progress (user_id, content_type, content_id, level, score, attempts, completed)
      VALUES (?, ?, ?, ?, ?, 1, ?)
    `).run(req.user.id, contentType, String(contentId), level, score || 0, completed ? 1 : 0);
  }

  checkAndGrantAchievements(req.user.id);

  res.json({ message: 'Progress updated' });
});

// Log a learning session
router.post('/session', authenticateToken, (req, res) => {
  const { sessionType, duration, score, itemsPracticed } = req.body;

  if (!sessionType) {
    return res.status(400).json({ error: 'sessionType is required' });
  }

  const result = db.prepare(`
    INSERT INTO learning_sessions (user_id, session_type, duration, score, items_practiced, ended_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `).run(req.user.id, sessionType, duration || 0, score || 0, itemsPracticed || 0);

  res.status(201).json({ id: result.lastInsertRowid, message: 'Session logged' });
});

// Get achievements
router.get('/achievements', authenticateToken, (req, res) => {
  const achievements = db.prepare(`
    SELECT * FROM achievements WHERE user_id = ? ORDER BY earned_at DESC
  `).all(req.user.id);
  res.json(achievements);
});

function checkAndGrantAchievements(userId) {
  const existing = db.prepare('SELECT achievement_type FROM achievements WHERE user_id = ?').all(userId);
  const earned = new Set(existing.map(a => a.achievement_type));

  const masteredCount = db.prepare(`
    SELECT COUNT(*) as count FROM progress
    WHERE user_id = ? AND completed = 1 AND content_type = 'vocabulary'
  `).get(userId).count;

  const sessionCount = db.prepare(`
    SELECT COUNT(*) as count FROM learning_sessions WHERE user_id = ?
  `).get(userId).count;

  const grant = (type, name) => {
    if (!earned.has(type)) {
      db.prepare(`
        INSERT INTO achievements (user_id, achievement_type, achievement_name)
        VALUES (?, ?, ?)
      `).run(userId, type, name);
    }
  };

  if (masteredCount >= 1)   grant('first_word',     '🎯 First Word Mastered!');
  if (masteredCount >= 10)  grant('vocab_10',       '📚 10 Words Mastered');
  if (masteredCount >= 50)  grant('vocab_50',       '🌟 50 Words Mastered');
  if (masteredCount >= 100) grant('vocab_100',      '🏆 Vocabulary Champion (100)');
  if (sessionCount >= 1)    grant('first_session',  '🚀 First Learning Session');
  if (sessionCount >= 7)    grant('week_streak',    '🔥 7 Sessions Completed');
  if (sessionCount >= 30)   grant('month_learner',  '💎 30 Sessions Completed');
}

export default router;
