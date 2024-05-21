const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('programa', {
    programa_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    programa_nombre: DataTypes.STRING(50)
  });
};
