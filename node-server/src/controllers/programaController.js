const programaService = require('../services/programaService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createPrograma = async (req, res) => {
    const { body } = req;

    try {
        if (
            !body.programa_id ||
            !body.programa_nombre
        ) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'programa_id', 'programa_nombre'");
        }

        const newPrograma = {
            programa_id: body.programa_id,
            programa_nombre: body.programa_nombre
        };

        const createdPrograma = await programaService.createPrograma(newPrograma);
        res.send({ status: "OK", data: createdPrograma });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updatePrograma = async (req, res) => {
    const {
        params: { programaId },
        body,
    } = req;

    try {
        if (!programaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':programaId'");
        }

        const programaChanges = {
            programa_id: body.programa_id,
            programa_nombre: body.programa_nombre
        };

        const updated = await programaService.updatePrograma(programaId, programaChanges);
        res.send({ status: "OK", data: updated });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateProgramaState = async (req, res) => {
    const {
        params: { programaId },
        body,
    } = req;

    try {
        if (!programaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':programaId'");
        }

        const updated = await programaService.updateProgramaState(programaId, body.programa_activo);
        res.send({ status: "OK", data: updated });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getProgramaById = async (req, res) => {
    const {
        params: { programaId },
    } = req;
    try {
        if (!programaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':programaId'");
        }
        const programa = await programaService.getProgramaById(programaId);
        res.send({ status: "OK", data: programa });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllProgramas = async (req, res) => {
    try {
        const programas = await programaService.getAllProgramas();
        res.send({ status: "OK", data: programas });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { createPrograma, updatePrograma, getProgramaById, getAllProgramas, updateProgramaState };