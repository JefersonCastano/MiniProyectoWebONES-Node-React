const horarioService = require("../services/horarioServiceFacade");
const messagesEs = require("../utils/messagesEs");

const getHorarioByPerAndDocId = async (req, res) => {
    const {
        params: { perId, docId },
      } = req;
    
      if (!perId || !docId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'" },
        });
        return;
      }
    
      try {
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

  if (
    !body.periodo_id ||
    !body.docente_id ||
    !body.horario_franjas
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: messagesEs.errors.MISSING_REQUIRED_FIELDS + "'periodo_id', 'docente_id', 'horario_franjas'",
      },
    });
  }

  const newHorario = {
    periodo_id: body.periodo_id,
    docente_id: body.docente_id,
    horario_franjas: body.horario_franjas
  };

  try {
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
    
      if (!perId || !docId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'" },
        });
        return;
      }
    
      try {
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
    
      if (!perId || !docId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':perId', 'docId'" },
        });
        return;
      }

      try {
        await horarioService.deleteHorario(perId, docId);
        res.status(200).send({ status: "OK" });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};

module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };