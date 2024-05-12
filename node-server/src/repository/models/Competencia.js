const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('competencia', {
    competencia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    programa_id: DataTypes.INTEGER,
    competencia_tipo: {
      type: DataTypes.STRING(10),
      validate: {
        isIn: [['GENERICA', 'ESPECIFICA']]
      }
    },
    competencia_nombre: DataTypes.STRING(50),
    competencia_activo: DataTypes.BOOLEAN
  });
};
