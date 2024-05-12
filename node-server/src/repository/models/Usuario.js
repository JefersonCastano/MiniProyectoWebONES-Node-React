const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('usuario', {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    docente_id: DataTypes.INTEGER,
    usuario_nombre: DataTypes.STRING(100),
    usuario_clave: DataTypes.STRING(50),
    usuario_tipo: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [['COORDINADOR', 'DOCENTE']]
      }
    }
  });
};
