const {FranjaHorario} = require('./repository/models/index');

const newFranjasHorario = [
    {
      periodo_id: 1,
      ambiente_id: 'AMB1',
      franja_dia: 2,
      franja_hora_inicio: 8,
      docente_id: 1,
      competencia_id: "COMP1",
      franja_hora_fin: 10,
      franja_duracion: 2
    },
    {
      periodo_id: 1,
      ambiente_id: 'AMB1',
      franja_dia: 2,
      franja_hora_inicio: 10,
      docente_id: 1,
      competencia_id: "COMP2",
      franja_hora_fin: 12,
      franja_duracion: 2
    }
  ];
  
  FranjaHorario.bulkCreate(newFranjasHorario)
  .then(franjasHorario => {
    console.log('Nuevas franjas horario creadas:', franjasHorario);
  })
  .catch(error => {
    console.error('Error al crear las franjas horario:', error);
  });