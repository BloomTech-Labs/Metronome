const jwt = require('jsonwebtoken');
const { secret } = require('../config');
/**
 * Middleware to verify that the request contains a valid JWT
 */
exports.isAuthenticated = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(422).json({
      error: 'Login token not found. Please log in.',
    });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      res.status(403).json({ error: 'Login token has expired. Please log in again.' });
    }

    req.user = decodedToken;
    next();
  });
};
