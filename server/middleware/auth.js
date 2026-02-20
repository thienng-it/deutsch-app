import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  // Authentication was removed on the frontend.
  // We'll temporarily assign a static user (ID 1) to all requests
  // so that the backend can still function without requiring a JWT token.
  req.user = {
    id: 1,
    username: 'student',
    displayName: 'Learner',
    currentLevel: 'A1'
  };

  next();
}
