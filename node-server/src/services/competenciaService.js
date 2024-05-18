const competenciaRepo = require('../repository/competenciaRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createCompetencia = async (newCompetencia) => {
    try {
        const competenciaExists = await competenciaRepo.competenciaExists(newCompetencia.competencia_id);
        if (competenciaExists) {
            throw new HttpError(404, messagesEs.errors.COMPETENCIA_ALREADY_EXISTS(newCompetencia.competencia_id));
        }

        const createdCompetencia = await competenciaRepo.createCompetencia(newCompetencia);
        return createdCompetencia;
    } catch (error) {
        throw error;
    }
};

const updateCompetencia = async (competenciaId, competenciaChanges) => {
    try {
        const competenciaExists = await competenciaRepo.competenciaExists(competenciaId);
        if (!competenciaExists) {
            throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
        }

        const updated = await competenciaRepo.updateCompetencia(competenciaId, competenciaChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const updateCompetenciaState = async (competenciaId, newState) => {
    try {
        const competenciaExists = await competenciaRepo.competenciaExists(competenciaId);
        if (!competenciaExists) {
            throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
        }

        const updated = await competenciaRepo.updateCompetenciaState(competenciaId, newState);
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteCompetencia = async (competenciaId) => {
    try {
        const competenciaExists = await competenciaRepo.competenciaExists(competenciaId);
        if (!competenciaExists) {
            throw new HttpError(404, messagesEs.errors.COMPETENCIA_NOT_FOUND);
        }
        const deleted = await competenciaRepo.deleteCompetencia(competenciaId);
        return deleted;
    } catch (error) {
        throw error;
    }
};

const getCompetenciaById = async (competenciaId) => {
    try {
        const competencia = await competenciaRepo.getCompetenciaById(competenciaId);
        return competencia;
    } catch (error) {
        throw error;
    }
};

const getAllCompetencias = async () => {
    try {
        const competencias = await competenciaRepo.getAllCompetencias();
        return competencias;
    } catch (error) {
        throw error;
    }
};

const isCompetenciaActive = async (competenciaId) => {
    try {
        const competencia = await getCompetenciaById(competenciaId);
        return competencia.competencia_activo;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createCompetencia, 
    updateCompetencia, 
    deleteCompetencia, 
    getCompetenciaById, 
    getAllCompetencias,
    isCompetenciaActive,
    updateCompetenciaState
};