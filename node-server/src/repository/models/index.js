'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('./../../../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Ambiente = require('./Ambiente')(sequelize);
const Competencia = require('./Competencia')(sequelize);
const Docente = require('./Docente')(sequelize);
const FranjaHorario = require('./FranjaHorario')(sequelize);
const PeriodoAcademico = require('./PeriodoAcademico')(sequelize);
const Programa = require('./Programa')(sequelize);
const Usuario = require('./Usuario')(sequelize);

Competencia.belongsTo(Programa, { foreignKey: 'programa_id' });
FranjaHorario.belongsTo(Ambiente, { foreignKey: 'ambiente_id' });
FranjaHorario.belongsTo(Docente, { foreignKey: 'docente_id' });
FranjaHorario.belongsTo(PeriodoAcademico, { foreignKey: 'periodo_id' });
FranjaHorario.belongsTo(Competencia, { foreignKey: 'competencia_id' });
Usuario.belongsTo(Docente, { foreignKey: 'docente_id' });

console.log("syncing");
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Ambiente,
  Competencia,
  Docente,
  FranjaHorario,
  PeriodoAcademico,
  Programa,
  Usuario
};
