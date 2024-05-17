const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('docente', {
    docente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    docente_nombres: DataTypes.STRING(100),
    docente_apellidos: DataTypes.STRING(100),
    docente_tipoidentificacion: {
      type: DataTypes.STRING(30),
      defaultValue: '1',
      validate: {
        isIn: [['CC', 'TE', 'PAS', 'CE']]
      }
    },
    docente_identificacion: DataTypes.STRING(10),
    docente_tipo: {
      type: DataTypes.STRING(30),
      validate: {
        isIn: [['TECNICO', 'PROFESIONAL']]
      }
    },
    docente_tipocontrato: {
      type: DataTypes.STRING(30),
      validate: {
        isIn: [['PT', 'CNT']]
      }
    },
    docente_area: DataTypes.STRING(100),
    docente_activo: DataTypes.BOOLEAN
  });
};
