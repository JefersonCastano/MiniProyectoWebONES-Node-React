const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('periodo_academico', {
    periodo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    periodo_fecha_ini: DataTypes.DATE,
    periodo_fecha_fin: DataTypes.DATE,
    periodo_nombre: {
      type: DataTypes.STRING(50),
      unique: true
    },
    periodo_activo: DataTypes.BOOLEAN
  });
};
