const { Usuario } = require('./models/index');

const validateUserCredentials = async (loginData) => {
  try {
    const user = await Usuario.findOne({ where: { usuario_nombre: loginData.username, usuario_clave: loginData.password } });
    return user != null;
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

module.exports = { validateUserCredentials, getUserData }