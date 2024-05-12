const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ambiente', {
    ambiente_id: {
      type: DataTypes.STRING(6),
      primaryKey: true
    },
    ambiente_nombre: DataTypes.STRING(100),
    ambiente_ubicacion: DataTypes.STRING(100),
    ambiente_capacidad: DataTypes.INTEGER,
    ambiente_activo: DataTypes.BOOLEAN,
    ambiente_tipo: {
      type: DataTypes.STRING(10),
      validate: {
        isIn: [['PRESENCIAL', 'VIRTUAL']]
      }
    }
  });
};
