import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, (req, res) => {
  const user = db.prepare(`
    SELECT id, username, display_name, current_level, created_at, last_login
    FROM users WHERE id = ?
  `).get(req.user.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  // Get stats
  const totalSessions = db.prepare('SELECT COUNT(*) as count FROM learning_sessions WHERE user_id = ?').get(req.user.id);
  const totalVocab = db.prepare('SELECT COUNT(*) as count FROM progress WHERE user_id = ? AND content_type = "vocabulary" AND completed = 1').get(req.user.id);
  const achievements = db.prepare('SELECT * FROM achievements WHERE user_id = ? ORDER BY earned_at DESC').all(req.user.id);

  res.json({
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    currentLevel: user.current_level,
    createdAt: user.created_at,
    lastLogin: user.last_login,
    stats: {
      totalSessions: totalSessions.count,
      vocabularyMastered: totalVocab.count,
      achievements: achievements.length,
    },
    achievements,
  });
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { displayName, currentLevel } = req.body;
  const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1'];

  if (currentLevel && !validLevels.includes(currentLevel)) {
    return res.status(400).json({ error: 'Invalid level. Must be A1, A2, B1, B2, or C1' });
  }

  db.prepare(`
    UPDATE users SET
      display_name = COALESCE(?, display_name),
      current_level = COALESCE(?, current_level)
    WHERE id = ?
  `).run(displayName || null, currentLevel || null, req.user.id);

  const updated = db.prepare('SELECT id, username, display_name, current_level FROM users WHERE id = ?').get(req.user.id);

  res.json({
    id: updated.id,
    username: updated.username,
    displayName: updated.display_name,
    currentLevel: updated.current_level,
  });
});

// Change password
router.put('/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const valid = await bcrypt.compare(currentPassword, user.password);

  if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

  const hashed = await bcrypt.hash(newPassword, 12);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.user.id);

  res.json({ message: 'Password updated successfully' });
});

// Get user stats / leaderboard for 2 users
router.get('/leaderboard', authenticateToken, (req, res) => {
  const users = db.prepare(`
    SELECT u.id, u.display_name, u.current_level,
      COUNT(DISTINCT ls.id) as total_sessions,
      COALESCE(SUM(ls.score), 0) as total_score,
      COUNT(DISTINCT CASE WHEN p.completed = 1 THEN p.id END) as items_mastered
    FROM users u
    LEFT JOIN learning_sessions ls ON ls.user_id = u.id
    LEFT JOIN progress p ON p.user_id = u.id
    GROUP BY u.id
    ORDER BY total_score DESC
  `).all();

  res.json(users.map(u => ({
    id: u.id,
    displayName: u.display_name,
    currentLevel: u.current_level,
    totalSessions: u.total_sessions,
    totalScore: u.total_score,
    itemsMastered: u.items_mastered,
    isCurrentUser: u.id === req.user.id,
  })));
});

export default router;
