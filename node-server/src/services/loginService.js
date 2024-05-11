const secret = 'ones';
const jwt = require('jsonwebtoken');
const { validateCredentials, getUserData} = require('../repository/user');

const loginUser = (loginData) => {
    try {
        if (!validateCredentials(loginData)) {
            throw new Error("Credentials are not valid");
        }
        const user = getUserData(loginData.username);
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

module.exports = loginUser;