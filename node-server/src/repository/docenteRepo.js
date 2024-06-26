const { Docente } = require('./models/index');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const docenteExists = async (docenteId) => {
    try {
        const docente = await Docente.findOne({
            where: { docente_id: docenteId }
        });
        return docente !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createDocente = async (newDocente) => {
    try {
        const createdDocente = await Docente.create(newDocente);
        return createdDocente;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateDocente = async (docenteId, docenteChanges) => {
    try {
        const [updated] = await Docente.update(docenteChanges, {
            where: { docente_id: docenteId }
        });
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateDocenteState = async (docenteId, newState) => {
    try {
        const [updated] = await Docente.update(
            { docente_activo: newState },
            { where: { docente_id: docenteId } }
        );
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getDocenteById = async (docenteId) => {
    try {
        const docente = await Docente.findByPk(docenteId);
        if (docente) {
            return docente;
        }
        throw new HttpError(404, messagesEs.errors.DOCENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const docenteIdentificacionAlreadyExists = async (docenteIdentificacion) => {
    try {
        const docente = await Docente.findOne({
            where: { docente_identificacion: docenteIdentificacion }
        });
        return docente !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAllDocentes = async () => {
    try {
        const docentes = await Docente.findAll({
            order: [['docente_activo', 'DESC'], ['docente_apellidos', 'ASC']]
        });
        return docentes;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { 
    docenteExists, 
    createDocente,
    updateDocente,
    updateDocenteState, 
    getDocenteById,
    docenteIdentificacionAlreadyExists, 
    getAllDocentes 
};
