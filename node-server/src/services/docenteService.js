const docenteRepo = require('../repository/docenteRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');
const { createDocenteUser } = require('./userService');

const createDocente = async (newDocente) => {
    try {
        const identificacionExists = await docenteRepo.docenteIdentificacionAlreadyExists(newDocente.docente_identificacion);
        if (identificacionExists) {
            throw new HttpError(400, messagesEs.errors.DOCENTE_IDENTIFICACION_ALREADY_EXISTS);
        }

        const createdDocente = await docenteRepo.createDocente(newDocente);
        await createDocenteUser(createdDocente.docente_nombres, createdDocente.docente_apellidos, createdDocente.docente_id, createdDocente.docente_identificacion);
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

        const identificacionExists = await docenteRepo.docenteIdentificacionAlreadyExists(docenteChanges.docente_identificacion);
        if (identificacionExists) {
            throw new HttpError(400, messagesEs.errors.DOCENTE_IDENTIFICACION_ALREADY_EXISTS);
        }

        const updated = await docenteRepo.updateDocente(docenteId, docenteChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const updateDocenteState = async (docenteId, newState) => {
    try {
        const docenteExists = await docenteRepo.docenteExists(docenteId);
        if (!docenteExists) {
            throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
        }

        const updated = await docenteRepo.updateDocenteState(docenteId, newState);
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

const getAllDocentes = async () => {
    try {
        const docentes = await docenteRepo.getAllDocentes();
        return docentes;
    } catch (error) {
        throw error;
    }
};

const isDocenteActive = async (docenteId) => {
    try {
        const docente = await getDocenteById(docenteId);
        return docente.docente_activo;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createDocente, 
    updateDocente,
    updateDocenteState, 
    deleteDocente, 
    getDocenteById, 
    getAllDocentes,
    isDocenteActive
};