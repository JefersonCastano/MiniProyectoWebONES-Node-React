const competenciaRepo = require('../repository/competenciaRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createCompetencia = async (newCompetencia) => {
    try {
        if(newCompetencia.competencia_tipo === 'GENERICA'){
            newCompetencia.programa_id = null;
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

        if(competenciaChanges.competencia_tipo === 'GENERICA'){
            competenciaChanges.programa_id = null;
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

const getCompetenciasGenericas = async () => {
    try {
        const competencias = await competenciaRepo.getCompetenciasGenericas();
        return competencias;
    } catch (error) {
        throw error;
    }
};

const getCompetenciasByPrograma = async (programaId) => {
    try {
        const competencias = await competenciaRepo.getCompetenciasByPrograma(programaId);
        if(competencias.length === 0){
            throw new HttpError(404, messagesEs.errors.NO_PROGRAMA_COMPETENCIAS);
        }
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
    getCompetenciaById, 
    getAllCompetencias,
    isCompetenciaActive,
    updateCompetenciaState,
    getCompetenciasGenericas,
    getCompetenciasByPrograma
};