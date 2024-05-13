const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('franja_horario', {
    ambiente_id: {
      type: DataTypes.STRING(6),
      primaryKey: true
    },
    periodo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    franja_dia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      isIn: [[1, 2, 3, 4, 5, 6]]
    },
    franja_hora_inicio: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    docente_id:DataTypes.INTEGER,
    competencia_id: DataTypes.STRING(10),
    franja_hora_fin: DataTypes.INTEGER,
    franja_duracion: DataTypes.INTEGER
  });
};
