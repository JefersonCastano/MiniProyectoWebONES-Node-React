const { Programa } = require('./models/index');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const programaExists = async (programaId) => {
    try {
        const programa = await Programa.findOne({
            where: { programa_id: programaId }
        });
        return programa !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createPrograma = async (newPrograma) => {
    try {
        const createdPrograma = await Programa.create(newPrograma);
        return createdPrograma;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updatePrograma = async (programaId, programaChanges) => {
    try {
        const [updated] = await Programa.update(programaChanges, {
            where: { programa_id: programaId }
        });
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.PROGRAMA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateProgramaState = async (programaId, newState) => {
    try {
        const [updated] = await Programa.update(
            { programa_activo: newState },
            { where: { programa_id: programaId } }
        );
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.PROGRAMA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getProgramaById = async (programaId) => {
    try {
        const programa = await Programa.findByPk(programaId);
        if (programa) {
            return programa;
        }
        throw new HttpError(404, messagesEs.errors.PROGRAMA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAllProgramas = async () => {
    try {
        const programas = await Programa.findAll({
            order: [['programa_nombre', 'ASC']]
        });
        return programas;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { programaExists, createPrograma, updatePrograma, getProgramaById, getAllProgramas, updateProgramaState };