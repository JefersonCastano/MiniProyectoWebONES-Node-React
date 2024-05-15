const docenteService = require('../services/docenteService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const getDocenteById = async (req, res) => {
  const {
    params: { docId },
  } = req;
  try {
    if (!docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':docId'");
    }
    const docente = await docenteService.getDocenteById(docId);
    res.send({ status: "OK", data: docente });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
}

const createDocente = async (req, res) => {
  const { body } = req;

  try {
    if (
      !body.docente_nombres ||
      !body.docente_apellidos ||
      !body.docente_tipoidentificacion ||
      !body.docente_identificacion ||
      !body.docente_tipo ||
      !body.docente_tipocontrato ||
      !body.docente_area ||
      !body.docente_activo
    ) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'docente_id', 'docente_nombres', 'docente_apellidos', 'docente_tipoidentificacion', 'docente_identificacion', 'docente_tipocontrato', 'docente_area', 'docente_activo'");   
    }

    const newDocente = {
        docente_nombres: body.docente_nombres,
        docente_apellidos: body.docente_apellidos,
        docente_tipoidentificacion: body.docente_tipoidentificacion,
        docente_identificacion: body.docente_identificacion,
        docente_tipo: body.docente_tipo,
        docente_tipocontrato: body.docente_tipocontrato,
        docente_area: body.docente_area,
        docente_activo: body.docente_activo
    };

    const createdDocente = await docenteService.createDocente(newDocente);
    res.status(200).send({ status: "OK", data: createdDocente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateDocente = async (req, res) => {
  const {
    body,
    params: { docId },
  } = req;
  try {
    if (!docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':docId'");
    }

    const updatedDocente = {
        docente_nombres: body.docente_nombres,
        docente_apellidos: body.docente_apellidos,
        docente_tipoidentificacion: body.docente_tipoidentificacion,
        docente_identificacion: body.docente_identificacion,
        docente_tipo: body.docente_tipo,
        docente_tipocontrato: body.docente_tipocontrato,
        docente_area: body.docente_area,
        docente_activo: body.docente_activo
    };

    const docente = await docenteService.updateDocente(docId, updatedDocente);
    res.send({ status: "OK", data: docente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteDocente = async (req, res) => {
  const {
    params: { docId },
  } = req;
  try {
    if (!docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':docId'");
    }
    const docente = await docenteService.deleteDocente(docId);
    res.send({ status: "OK", data: docente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getDocenteById,
  createDocente,
  updateDocente,
  deleteDocente,
};
