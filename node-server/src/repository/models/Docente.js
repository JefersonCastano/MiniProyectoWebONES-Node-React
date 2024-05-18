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
      defaultValue: 'CC',
      validate: {
        isIn: [['CC', 'TE', 'PAS', 'CE']]
      }
    },
    docente_identificacion: {
      type: DataTypes.STRING(10),
      unique: true
    },
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
    docente_activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
