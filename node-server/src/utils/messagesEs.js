module.exports = {
  errors: {
    MISSING_REQUIRED_FIELDS: "Una de las siguientes llaves falta o se encuentra vacía en el cuerpo de la petición: ",
    MISSING_REQUIRED_PARAMETERS: "Uno de los siguientes parámetros no se encuentra en la petición: ",
    CREDENTIALS_NOT_VALID: "Nombre de usuario o contraseña incorrectos",
    HORARIO_NOT_FOUND: "Horario no encontrado",
    HORARIO_ALREADY_EXISTS: "El horario ya existe",
    AUTHORIZATION_HEADER_MISSING: "Se requiere un encabezado de autorización",
    TOKEN_MISSING: "Se requiere un token para la autenticación",
    TOKEN_NOT_VALID: "Token no válido",
    NOT_ACCESS: "No tiene acceso a este recurso",
    WEEK_HOURS_REQUIRED: (requiredHours, assignedHours) => `El docente debe orientar ${requiredHours} horas a la semana. Se han asignado ${assignedHours} horas.`,
    MAX_HOURS_PER_DAY: (maxHours) => `El docente debe orientar máximo ${maxHours} horas por día.`,
    AMBIENTE_NOT_AVAILABLE: (ambienteId, day, startHour, endHour) => `El ambiente ${ambienteId} no está disponible el día ${day} entre ${startHour} y ${endHour}.`,
    PERIODO_NOT_ACTIVE: "El periodo no se encuentra activo",
    DOCENTE_NOT_ACTIVE: "El docente no se encuentra activo",
    AMBIENTE_NOT_ACTIVE: "El ambiente no se encuentra activo",
    COMPETENCIA_NOT_ACTIVE: "La competencia no se encuentra activa",
    DOCENTE_NOT_FOUND: "Docente no encontrado",
    PERIODO_NOT_FOUND: "Periodo académico no encontrado",
    AMBIENTE_NOT_FOUND: "Ambiente no encontrado",
  },
  success: {

  }
};