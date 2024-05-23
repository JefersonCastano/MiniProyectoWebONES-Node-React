const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('usuario', {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    docente_id: DataTypes.INTEGER,
    usuario_nombre: {
      type: DataTypes.STRING(100),
      unique: true
    },
    usuario_clave: DataTypes.STRING(100),
    usuario_tipo: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: [['COORDINADOR', 'DOCENTE']]
      }
    }
  });
};
