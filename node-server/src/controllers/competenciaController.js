const competenciaService = require('../services/competenciaService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createCompetencia = async (req, res) => {
    const { body } = req;

    try {
        if (
            !body.competencia_id ||
            !body.programa_id ||
            !body.competencia_tipo ||
            !body.competencia_nombre ||
            !body.competencia_activo
        ) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'competencia_id', 'programa_id', 'competencia_tipo', 'competencia_nombre', 'competencia_activo'");
        }

        const newCompetencia = {
            competencia_id: body.competencia_id,
            programa_id: body.programa_id,
            competencia_tipo: body.competencia_tipo,
            competencia_nombre: body.competencia_nombre,
            competencia_activo: body.competencia_activo
        };

        const createdCompetencia = await competenciaService.createCompetencia(newCompetencia);
        res.send({ status: "OK", data: createdCompetencia });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateCompetencia = async (req, res) => {
    const {
        params: { competenciaId },
        body,
    } = req;

    try {
        if (!competenciaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId'");
        }

        const competenciaChanges = {
            competencia_id: body.competencia_id,
            programa_id: body.programa_id,
            competencia_tipo: body.competencia_tipo,
            competencia_nombre: body.competencia_nombre,
            competencia_activo: body.competencia_activo
        };

        const updated = await competenciaService.updateCompetencia(competenciaId, competenciaChanges);
        res.send({ status: "OK", data: updated });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteCompetencia = async (req, res) => {
    const { competenciaId } = req.params;

    try {
        if (!competenciaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId'");
        }

        const deleted = await competenciaService.deleteCompetencia(competenciaId);
        res.send({ status: "OK", data: deleted });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getCompetenciaById = async (req, res) => {
    const { competenciaId } = req.params;

    try {
        if (!competenciaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId'");
        }

        const competencia = await competenciaService.getCompetenciaById(competenciaId);
        res.send({ status: "OK", data: competencia });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getAllCompetencias = async (req, res) => {
    try {
        const competencias = await competenciaService.getAllCompetencias();
        res.send({ status: "OK", data: competencias });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { createCompetencia, updateCompetencia, deleteCompetencia, getCompetenciaById, getAllCompetencias };