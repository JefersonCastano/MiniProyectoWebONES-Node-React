const { Competencia } = require('./models/index');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const competenciaExists = async (competenciaId) => {
    try {
        const competencia = await Competencia.findOne({
            where: { competencia_id: competenciaId }
        });
        return competencia !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createCompetencia = async (newCompetencia) => {
    try {
        const createdCompetencia = await Competencia.create(newCompetencia);
        return createdCompetencia;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateCompetencia = async (competenciaId, competenciaChanges) => {
    try {
        const [updated] = await Competencia.update(competenciaChanges, {
            where: { competencia_id: competenciaId }
        });
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateCompetenciaState = async (competenciaId, newState) => {
    try {
        const [updated] = await Competencia.update(
            { competencia_activo: newState },
            { where: { competencia_id: competenciaId } }
        );
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteCompetencia = async (competenciaId) => {
    try {
        const deleted = await Competencia.destroy({
            where: { competencia_id: competenciaId }
        });
        if (deleted) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getCompetenciaById = async (competenciaId) => {
    try {
        const competencia = await Competencia.findByPk(competenciaId);
        if (competencia) {
            return competencia;
        }
        throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAllCompetencias = async () => {
    try {
        const competencias = await Competencia.findAll({
            order: [['competencia_nombre', 'ASC'], ['competencia_activo', 'DESC']]
        });
        return competencias;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    competenciaExists,
    createCompetencia,
    updateCompetencia,
    deleteCompetencia,
    getCompetenciaById,
    getAllCompetencias,
    updateCompetenciaState
};