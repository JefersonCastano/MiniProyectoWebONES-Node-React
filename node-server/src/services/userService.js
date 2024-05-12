const secret = 'ones';
const jwt = require('jsonwebtoken');
const messagesEs = require("../utils/messagesEs");
const { validateUserCredentials, getUserData } = require('../repository/userRepo');

const loginUser = async (loginData) => {
  try {
    const isValid = await validateUserCredentials(loginData);
    if (!isValid) {
      throw new Error(messagesEs.errors.CREDENTIALS_NOT_VALID);
    }
    const user = await getUserData(loginData.username);
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret);
    loginResponse = {
      id: user.id,
      role: user.role,
      token: token
    };

    return loginResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUser };