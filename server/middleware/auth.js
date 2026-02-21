/**
 * Authentication middleware.
 *
 * Currently bypassed — every request is treated as a single default user.
 * To enable real auth, uncomment the JWT verification below and remove
 * the static user assignment.
 */
export function authenticateToken(req, res, next) {
  req.user = {
    id: 1,
    username: 'student',
    displayName: 'Learner',
    currentLevel: 'A1',
  };
  next();
}
