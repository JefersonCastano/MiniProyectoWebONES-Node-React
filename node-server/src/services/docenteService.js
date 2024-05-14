const docenteRepo = require('../repository/docenteRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createDocente = async (newDocente) => {
    try {
        const createdDocente = await docenteRepo.createDocente(newDocente);
        return createdDocente;
    } catch (error) {
        throw error;
    }
};

const updateDocente = async (docenteId, docenteChanges) => {
    try {
        const docenteExists = await docenteRepo.docenteExists(docenteId);
        if (!docenteExists) {
            throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
        }

        const updated = await docenteRepo.updateDocente(docenteId, docenteChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteDocente = async (docenteId) => {
    try {
        const docenteExists = await docenteRepo.docenteExists(docenteId);
        if (!docenteExists) {
            throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
        }
        const deleted = await docenteRepo.deleteDocente(docenteId);
        return deleted;
    } catch (error) {
        throw error;
    }
};

const getDocenteById = async (docenteId) => {
    try {
        const docente = await docenteRepo.getDocenteById(docenteId);
        return docente;
    } catch (error) {
        throw error;
    }
};

module.exports = { createDocente, updateDocente, deleteDocente, getDocenteById };