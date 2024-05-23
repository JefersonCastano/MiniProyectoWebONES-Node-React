const competenciaService = require('../services/competenciaService');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createCompetencia = async (req, res) => {
    const { body } = req;

    try {
        if (
            !body.competencia_tipo ||
            !body.competencia_nombre
        ) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'competencia_tipo', 'competencia_nombre'");
        }

        const newCompetencia = {
            programa_id: body.programa_id,
            competencia_tipo: body.competencia_tipo,
            competencia_nombre: body.competencia_nombre
        };

        const createdCompetencia = await competenciaService.createCompetencia(newCompetencia);
        res.send({ status: "OK", data: createdCompetencia });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateCompetencia = async (req, res) => {
    const {
        params: { competenciaId },
        body,
    } = req;

    try {
        if (!competenciaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId'");
        }

        if (
            !body.competencia_tipo ||
            !body.competencia_nombre
        ) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_FIELDS + "'competencia_tipo', 'competencia_nombre'");
        }
        
        const competenciaChanges = {
            programa_id: body.programa_id,
            competencia_tipo: body.competencia_tipo,
            competencia_nombre: body.competencia_nombre
        };

        const updated = await competenciaService.updateCompetencia(competenciaId, competenciaChanges);
        res.send({ status: "OK", data: updated });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateCompetenciaState = async (req, res) => {
    const {
        body,
        params: { competenciaId },
      } = req;

    try {
        if (!competenciaId || !body.hasOwnProperty("competencia_activo")) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId', 'competencia_activo'");
        }

        const newState =  body.competencia_activo;

        const response = await competenciaService.updateCompetenciaState(competenciaId, newState);
        res.send({ status: "OK", data: response });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


const getCompetenciaById = async (req, res) => {
    const { competenciaId } = req.params;

    try {
        if (!competenciaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':competenciaId'");
        }

        const competencia = await competenciaService.getCompetenciaById(competenciaId);
        res.send({ status: "OK", data: competencia });
    }
    catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getAllCompetencias = async (req, res) => {
    try {
        const competencias = await competenciaService.getAllCompetencias();
        res.send({ status: "OK", data: competencias });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getCompetenciasGenericas = async (req, res) => {
    try {
        const competencias = await competenciaService.getCompetenciasGenericas();
        res.send({ status: "OK", data: competencias });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getCompetenciasByPrograma = async (req, res) => {
    const { programaId } = req.params;

    try {
        if (!programaId) {
            throw new HttpError(400, messagesEs.errors.MISSING_REQUIRED_PARAMETERS + "':programaId'");
        }

        const competencias = await competenciaService.getCompetenciasByPrograma(programaId);
        res.send({ status: "OK", data: competencias });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}



module.exports = {
    createCompetencia, 
    updateCompetencia, 
    getCompetenciaById, 
    getAllCompetencias, 
    updateCompetenciaState,
    getCompetenciasGenericas,
    getCompetenciasByPrograma
};