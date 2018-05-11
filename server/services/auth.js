const jwt = require('jsonwebtoken');
const { secret } = require('../config');
/**
 * Middleware to verify that the request contains a valid JWT
 */
exports.isAuthenticated = function (req, res, next) {
  const token = req.headers.authorization || req.headers.Authorization;

  if (!token) {
    return res.status(422).json({
      error: 'Login token not found. Please log in.',
    });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Login token has expired. Please log in again.' });
    }

    req.user = decodedToken;
    next();
  });
};

exports.isTeacher = function (req, res, next) {
  if (req.user.role !== 'Teacher') {
    return res.status(403).json({
      error: 'Not authorized',
    });
  }
  next();
};

exports.isStudent = function (req, res, next) {
  if (req.user.role !== 'Student') {
    return res.status(403).json({
      error: 'Not authorized',
    });
  }
  next();
};
