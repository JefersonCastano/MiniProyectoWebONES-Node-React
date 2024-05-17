const jwt = require('jsonwebtoken');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');
const secret = 'ones';

const authenticate = function (req, res, next) {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw new HttpError(500, messagesEs.errors.AUTHORIZATION_HEADER_MISSING);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new HttpError(500, messagesEs.errors.TOKEN_MISSING);
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || messagesEs.errors.TOKEN_NOT_VALID } });
  }
  return next();
};

module.exports = authenticate;