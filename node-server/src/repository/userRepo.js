const { Usuario } = require('./models/index');
const bcrypt = require('bcryptjs');

const validateUserCredentials = async (loginData) => {
  try {
    const user = await Usuario.findOne({ where: { usuario_nombre: loginData.username } });
    console.log(user);
    if(user == null) return false;
    return bcrypt.compareSync(loginData.password, user.usuario_clave);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getUserData = async (username) => {
  try {
    const user = await Usuario.findOne({ where: { usuario_nombre: username } });
    return {
      id: user.docente_id,
      username: user.usuario_nombre,
      role: user.usuario_tipo,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createUser = async (newUser) => {
  try {
    const user = await Usuario.create({
      usuario_nombre: newUser.username,
      docente_id: newUser.docente_id,
      usuario_clave: newUser.password,
      usuario_tipo: newUser.role
    });
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}
module.exports = 
{ 
  validateUserCredentials, 
  getUserData, 
  createUser
}