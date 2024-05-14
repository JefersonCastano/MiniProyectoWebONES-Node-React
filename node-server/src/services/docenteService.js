const docenteRepo = require('../repository/docenteRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createDocente = async (newDocente) => {
    try {
        await validateDocente(newDocente);

        const createdDocente = await docenteRepo.createDocente(newDocente);
        return createdDocente;
    } catch (error) {
        throw error;
    }
};

const updateDocente = async (docenteId, docenteChanges) => {
    try {
        await validateDocente(docenteChanges);

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

const validateDocente = async (docente) => {
    //Todos los campos son requeridos
    if (!docente.docente_nombre || !docente.docente_apellido || !docente.docente_tipocontrato) {
        throw new HttpError(400, messagesEs.errors.MISSING_FIELDS);
    }

    //Tipo de contrato valido
    if (docente.docente_tipocontrato !== "TC" && docente.docente_tipocontrato !== "PT") {
        throw new HttpError(400, messagesEs.errors.INVALID_CONTRACT_TYPE);
    }

    //Validar que el docente no exista
    const docenteExists = await docenteRepo.docenteExists(docente.docente_id);
    if (docenteExists) {
        throw new HttpError(400, messagesEs.errors.DOCENTE_EXISTS);
    }
};

module.exports = { createDocente, updateDocente, deleteDocente, getDocenteById };