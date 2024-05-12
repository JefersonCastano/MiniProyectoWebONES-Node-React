
const {Usuario, Docente} = require('./repository/models/index');

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


