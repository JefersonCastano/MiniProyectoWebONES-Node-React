const secret = 'ones';
const jwt = require('jsonwebtoken');
const messagesEs = require("../utils/messagesEs");
const { validateUserCredentials, getUserData, createUser } = require('../repository/userRepo');
const HttpError = require('../utils/HttpError');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const secretKey = 'ones';



const loginUser = async (loginData) => {
  loginData.password = decrypt(loginData.password);
  try {
    const isValid = await validateUserCredentials(loginData);
    if (!isValid) {
      throw new HttpError(400, messagesEs.errors.CREDENTIALS_NOT_VALID);
    }

    const user = await getUserData(loginData.username);
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret);
    const loginResponse = {
      id: user.id,
      username: user.username,
      role: user.role,
      token: token
    };

    return loginResponse;
  } catch (error) {
    throw error;
  }
};

const createDocenteUser = async (docenteFirstName, docenteLastName, docenteId, docenteIdentificacion) => {
  const userName = docenteFirstName.substring(0,3).toLowerCase() + docenteLastName.substring(0,3).toLowerCase() + docenteIdentificacion;
  const hashedPassword = await bcrypt.hash(docenteIdentificacion, 10);

  const newUser = {
    username: userName,
    docente_id: docenteId,
    password: hashedPassword,
    role: 'DOCENTE'
  };

  try {
    const user = await createUser(newUser);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw error;
  }
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}


module.exports = { loginUser, createDocenteUser, getUserByToken };