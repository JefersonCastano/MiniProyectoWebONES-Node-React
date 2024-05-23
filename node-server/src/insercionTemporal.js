
const {Usuario, Docente, Ambiente, PeriodoAcademico, Competencia} = require('./repository/models/index');
const ambienteService = require('./services/ambienteService');


const newCompetencias = [{
  programa_id: null,
  competencia_tipo: 'GENERICA',
  competencia_nombre: 'Competencia 1',
  competencia_activo: true
},{
  programa_id: null,
  competencia_tipo: 'GENERICA',
  competencia_nombre: 'Competencia 2',
  competencia_activo: true
}
];

const newPeriodoAcademico = {
  periodo_fecha_ini: new Date('2024-01-01'),
  periodo_fecha_fin: new Date('2024-4-30'),
  periodo_nombre: '2024-I',
  periodo_activo: true
};

const newAmbiente = {
  ambiente_nombre: 'Aula 101',
  ambiente_ubicacion: 'Edificio A',
  ambiente_capacidad: 30,
  ambiente_activo: true,
  ambiente_tipo: 'PRESENCIAL'
};

const nuevoDocente1 = {
  docente_nombres: 'Pepe Andres',
  docente_apellidos: 'Perez Pelaez',
  docente_tipoidentificacion: 'CC',
  docente_identificacion: '1234567890',
  docente_tipo: 'TECNICO',
  docente_tipocontrato: 'PT',
  docente_area: 'Matemáticas',
  docente_activo: true
};

const nuevoUsuario1 = {
  usuario_id: 1,
  docente_id: null,
  usuario_nombre: 'coor',
  usuario_clave: 'coor',
  usuario_tipo: 'COORDINADOR'
};

const nuevoUsuario2 = {
  usuario_id: 2,
  docente_id: 1,
  usuario_nombre: 'pepe',
  usuario_clave: 'pepe',
  usuario_tipo: 'DOCENTE'
};

PeriodoAcademico.create(newPeriodoAcademico)
  .then(periodoAcademico => {
    console.log('Nuevo periodo academico creado:', periodoAcademico);
  })
  .catch(error => {
    console.error('Error al crear el periodo academico:', error);
  });

ambienteService.createAmbiente(newAmbiente).then(ambiente => {
    console.log('Nuevo ambiente creado:', ambiente);
  })
  .catch(error => {
    console.error('Error al crear el ambiente:', error);
  });

Competencia.bulkCreate(newCompetencias)
  .then(competencia => {
    console.log('Nueva competencia creada:', competencia);
  })
  .catch(error => {
    console.error('Error al crear la competencia:', error);
  });

Docente.create(nuevoDocente1)
  .then(docente => {
    console.log('Nuevo docente creado:', docente);
  })
  .catch(err => {
    console.error('Error al crear el docente:', err);
  });


Usuario.create(nuevoUsuario1)
  .then(usuario => {
    console.log('Nuevo usuario creado:', usuario);
  })
  .catch(err => {
    console.error('Error al crear el usuario:', err);
  });

Usuario.create(nuevoUsuario2)
  .then(usuario => {
    console.log('Nuevo usuario creado:', usuario);
  })
  .catch(err => {
    console.error('Error al crear el usuario:', err);
  });