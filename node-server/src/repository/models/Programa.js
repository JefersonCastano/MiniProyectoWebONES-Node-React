const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('programa', {
    programa_id: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    programa_nombre: DataTypes.STRING(50)
  });
};
