const jwt = require('jsonwebtoken');
const messagesEs = require("../utils/messagesEs");
const secret = 'ones';

const authenticate = function(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send(messagesEs.errors.AUTHORIZATION_HEADER_MISSING);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send(messagesEs.errors.TOKEN_MISSING);
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send(messagesEs.errors.TOKEN_NOT_VALID);
  }
  return next();
};

module.exports = authenticate;