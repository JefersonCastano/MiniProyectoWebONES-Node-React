const programaRepo = require('../repository/programaRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createPrograma = async (newPrograma) => {
    try {
        const createdPrograma = await programaRepo.createPrograma(newPrograma);
        return createdPrograma;
    } catch (error) {
        throw error;
    }
};

const updatePrograma = async (programaId, programaChanges) => {
    try {
        const programaExists = await programaRepo.programaExists(programaId);
        if (!programaExists) {
            throw new HttpError(404, messagesEs.errors.PROGRAMA_NOT_FOUND);
        }

        const updated = await programaRepo.updatePrograma(programaId, programaChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const updateProgramaState = async (programaId, newState) => {
    try {
        const programaExists = await programaRepo.programaExists(programaId);
        if (!programaExists) {
            throw new HttpError(404, messagesEs.errors.PROGRAMA_NOT_FOUND);
        }

        const updated = await programaRepo.updateProgramaState(programaId, newState);
        return updated;
    } catch (error) {
        throw error;
    }
};

const getProgramaById = async (programaId) => {
    try {
        const programa = await programaRepo.getProgramaById(programaId);
        return programa;
    } catch (error) {
        throw error;
    }
};

const getAllProgramas = async () => {
    try {
        const programas = await programaRepo.getAllProgramas();
        return programas;
    } catch (error) {
        throw error;
    }
};

module.exports = { createPrograma, updatePrograma, getProgramaById, getAllProgramas, updateProgramaState };