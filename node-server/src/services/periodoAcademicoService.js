const periodoAcademicoRepo = require('../repository/periodoAcademicoRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createPeriodoAcademico = async (newPeriodo) => {
    try {
        const nameExists = await periodoAcademicoRepo.periodoAcademicoNameExists(newPeriodo.periodo_nombre);
        if (nameExists) {
            throw new HttpError(400, messagesEs.errors.PERIODO_NAME_ALREADY_EXISTS(newPeriodo.periodo_nombre));
        }
        const createdPeriodo = await periodoAcademicoRepo.createPeriodoAcademico(newPeriodo);
        return createdPeriodo;
    } catch (error) {
        throw error;
    }
};

const updatePeriodoAcademico = async (periodoId, periodoChanges) => {
    try {
        const currentPeriodo = await periodoAcademicoRepo.getPeriodoAcademicoById(periodoId);
        if (!currentPeriodo) {
            throw new HttpError(404, messagesEs.errors.PERIODO_NOT_FOUND);
        }

        const nameExists = await periodoAcademicoRepo.periodoAcademicoNameExists(periodoChanges.periodo_nombre);
        if (periodoChanges.periodo_nombre != currentPeriodo.periodo_nombre && nameExists) {
            throw new HttpError(400, messagesEs.errors.PERIODO_NAME_ALREADY_EXISTS(periodoChanges.periodo_nombre));
        }

        const updated = await periodoAcademicoRepo.updatePeriodoAcademico(periodoId, periodoChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const updatePeriodoAcademicoState = async (periodoId, newState) => {
    try {
        const periodoExists = await periodoAcademicoRepo.periodoAcademicoExists(periodoId);
        if (!periodoExists) {
            throw new HttpError(404, messagesEs.errors.PERIODO_NOT_FOUND);
        }

        const updated = await periodoAcademicoRepo.updatePeriodoAcademicoState(periodoId, newState);
        return updated;
    } catch (error) {
        throw error;
    }
};

const getPeriodoAcademicoById = async (periodoId) => {
    try {
        const periodo = await periodoAcademicoRepo.getPeriodoAcademicoById(periodoId);
        return periodo;
    } catch (error) {
        throw error;
    }
};

const getAllPeriodosAcademicos = async () => {
    try {
        const periodos = await periodoAcademicoRepo.getAllPeriodosAcademicos();
        return periodos;
    } catch (error) {
        throw error;
    }
};

const isPeriodoAcademicoActive = async (periodoId) => {
    try {
        const periodo = await getPeriodoAcademicoById(periodoId);
        return periodo.periodo_activo;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createPeriodoAcademico, 
    updatePeriodoAcademico,
    getPeriodoAcademicoById, 
    getAllPeriodosAcademicos, 
    isPeriodoAcademicoActive,
    updatePeriodoAcademicoState
};