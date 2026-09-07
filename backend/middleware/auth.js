function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ message: 'Not logged in' });
}

function isAdmin(req, res, next) {
  if (req.session && req.session.role === 'admin') return next();
  return res.status(403).json({ message: 'Admins only' });
}

module.exports = { isAuthenticated, isAdmin };