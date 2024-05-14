const docenteService = require("./docenteService");
const messagesEs = require("../utils/messagesEs");
const HttpError = require("../utils/HttpError");

const createDocente = async (newDocente) => {
    try {
        const createdDocente = await docenteService.createDocente(newDocente);
        return createdDocente;
    } catch (error) {
        throw error;
    }
};

const updateDocente = async (docenteId, docenteChanges) => {
    try {
        const updatedDocente = await docenteService.updateDocente(docenteId, docenteChanges);
        return updatedDocente;
    } catch (error) {
        throw error;
    }
};

const deleteDocente = async (docenteId) => {
    try {
        const deletedDocente = await docenteService.deleteDocente(docenteId);
        return deletedDocente;
    } catch (error) {
        throw error;
    }
};

const getDocenteById = async (docenteId) => {
    try {
        const docente = await docenteService.getDocenteById(docenteId);
        return docente;
    } catch (error) {
        throw error;
    }
};

module.exports = { createDocente, updateDocente, deleteDocente, getDocenteById };