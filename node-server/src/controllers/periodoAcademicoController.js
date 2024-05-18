const periodoAcademicoService = require('../services/periodoAcademicoService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const getPeriodoAcademicoById = async (req, res) => {
  const {
    params: { periodoId },
  } = req;
  try {
    if (!periodoId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':periodoId'");
    }
    const periodo = await periodoAcademicoService.getPeriodoAcademicoById(periodoId);
    res.send({ status: "OK", data: periodo });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
}

const getAllPeriodosAcademicos = async (req, res) => {
  try {
    const periodos = await periodoAcademicoService.getAllPeriodosAcademicos();
    res.send({ status: "OK", data: periodos });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createPeriodoAcademico = async (req, res) => {
  const { body } = req;

  try {
    if (
      !body.periodo_id ||
      !body.periodo_fecha_ini ||
      !body.periodo_fecha_fin ||
      !body.periodo_nombre
    ) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'periodo_id', 'periodo_fecha_ini', 'periodo_fecha_fin', 'periodo_nombre'");
    }

    const newPeriodo = {
        periodo_id: body.periodo_id,
        periodo_fecha_ini: body.periodo_fecha_ini,
        periodo_fecha_fin: body.periodo_fecha_fin,
        periodo_nombre: body.periodo_nombre
    };

    const createdPeriodo = await periodoAcademicoService.createPeriodoAcademico(newPeriodo);
    res.send({ status: "OK", data: createdPeriodo });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updatePeriodoAcademico = async (req, res) => {
  const {
    params: { periodoId },
    body
  } = req;

  try {
    if (!periodoId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':periodoId'");
    }

    if (
      !body.periodo_id ||
      !body.periodo_fecha_ini ||
      !body.periodo_fecha_fin ||
      !body.periodo_nombre
    ) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'periodo_id', 'periodo_fecha_ini', 'periodo_fecha_fin', 'periodo_nombre'");
    }

    const periodoChanges = {
        periodo_fecha_ini: body.periodo_fecha_ini,
        periodo_fecha_fin: body.periodo_fecha_fin,
        periodo_nombre: body.periodo_nombre,
        periodo_activo: body.periodo_activo
    };

    const updated = await periodoAcademicoService.updatePeriodoAcademico(periodoId, periodoChanges);
    res.send({ status: "OK", data: updated });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updatePeriodoAcademicoState = async (req, res) => {
  const {
    params: { periodoId },
    body
  } = req;

  try {
    if (!periodoId || !body.hasOwnProperty("periodo_activo")) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':periodoId', 'periodo_activo'");
    }

    const newState = body.periodo_activo;
    const updated = await periodoAcademicoService.updatePeriodoAcademicoState(periodoId, newState);
    res.send({ status: "OK", data: updated });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deletePeriodoAcademico = async (req, res) => {
  const {
    params: { periodoId },
  } = req;
  try {
    if (!periodoId) {
      throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':periodoId'");
    }

    const deleted = await periodoAcademicoService.deletePeriodoAcademico(periodoId);
    res.send({ status: "OK", data: deleted });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
    getPeriodoAcademicoById,
    getAllPeriodosAcademicos,
    createPeriodoAcademico,
    updatePeriodoAcademico,
    deletePeriodoAcademico,
    updatePeriodoAcademicoState
};