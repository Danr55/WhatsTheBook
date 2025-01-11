const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'your-jwt-secret';
const expiration = '2h';

// Sign a token
module.exports.signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign(payload, secret, { expiresIn: expiration });
};

// Middleware to authenticate user
module.exports.authMiddleware = function ({ req }) {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim();
  }

  if (!token) {
    throw new AuthenticationError('You must be logged in!');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    throw new AuthenticationError('Your session has expired!');
  }

  return req;
};