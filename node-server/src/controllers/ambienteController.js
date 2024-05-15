const ambienteService = require('../services/ambienteService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const getAmbienteById = async (req, res) => {
  const {
    params: { ambId },
  } = req;
  try {
    if (!ambId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':ambId'");
    }
    const ambiente = await ambienteService.getAmbienteById(ambId);
    res.send({ status: "OK", data: ambiente });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
}

const getAllAmbientes = async (req, res) => {
  try {
    const ambientes = await ambienteService.getAllAmbientes();
    res.send({ status: "OK", data: ambientes });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createAmbiente = async (req, res) => {
  const { body } = req;

  try {
    if (
      !body.ambiente_id ||
      !body.ambiente_nombre ||
      !body.ambiente_ubicacion ||
      !body.ambiente_capacidad ||
      !body.ambiente_activo ||
      !body.ambiente_tipo
    ) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'ambiente_id', 'ambiente_nombre', 'ambiente_ubicacion', 'ambiente_capacidad', 'ambiente_activo', 'ambiente_tipo'");   
    }

    const newAmbiente = {
        ambiente_id: body.ambiente_id,
        ambiente_nombre: body.ambiente_nombre,
        ambiente_ubicacion: body.ambiente_ubicacion,
        ambiente_capacidad: body.ambiente_capacidad,
        ambiente_activo: body.ambiente_activo,
        ambiente_tipo: body.ambiente_tipo
    };

    const ambiente = await ambienteService.createAmbiente(newAmbiente);
    res.send({ status: "OK", data: ambiente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAmbiente = async (req, res) => {
  const {
    body,
    params: { ambId },
  } = req;
  try {
    if (!ambId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':ambId'");
    }

    const updatedAmbiente = {
        ambiente_nombre: body.ambiente_nombre,
        ambiente_ubicacion: body.ambiente_ubicacion,
        ambiente_capacidad: body.ambiente_capacidad,
        ambiente_activo: body.ambiente_activo,
        ambiente_tipo: body.ambiente_tipo
    };

    const ambiente = await ambienteService.updateAmbiente(ambId, updatedAmbiente);
    res.send({ status: "OK", data: ambiente });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteAmbiente = async (req, res) => {
  const {
    params: { ambId },
  } = req;
  try {
    if (!ambId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':ambId'");
    }

    const deleted = await ambienteService.deleteAmbiente(ambId);
    res.send({ status: "OK", data: deleted });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { getAmbienteById, getAllAmbientes, createAmbiente, updateAmbiente, deleteAmbiente };