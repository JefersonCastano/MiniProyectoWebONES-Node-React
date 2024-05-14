const horarioService = require("../services/horarioServiceFacade");
const messagesEs = require("../utils/messagesEs");
const HttpError = require("../utils/HttpError");

const getHorarioByPerAndDocId = async (req, res) => {
  const {
    params: { perId, docId },
  } = req;
  try {
    if (!perId || !docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'");
    }
    const horario = await horarioService.getHorarioByPerAndDocId(perId, docId);
    res.send({ status: "OK", data: horario });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createHorario = async (req, res) => {
  const { body } = req;

  try {

    if (
      !body.periodo_id ||
      !body.docente_id ||
      !body.horario_franjas
    ) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'periodo_id', 'docente_id', 'horario_franjas'");
    }

    const newHorario = {
      periodo_id: body.periodo_id,
      docente_id: body.docente_id,
      horario_franjas: body.horario_franjas
    };


    const createdHorario = await horarioService.createHorario(newHorario);
    res.status(200).send({ status: "OK", data: createdHorario });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateHorario = async (req, res) => {
  const {
    body,
    params: { perId, docId },
  } = req;
  try {
    if (!perId || !docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'");
    }


    const updatedHorario = await horarioService.updateHorario(perId, docId, body);
    res.status(200).send({ status: "OK", data: updatedHorario });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteHorario = async (req, res) => {
  const {
    params: { perId, docId },
  } = req;
  try {
    if (!perId || !docId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'");
    }


    await horarioService.deleteHorario(perId, docId);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };