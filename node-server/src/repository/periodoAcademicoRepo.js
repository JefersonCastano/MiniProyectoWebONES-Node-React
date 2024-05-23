const { PeriodoAcademico } = require('./models/index');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const periodoAcademicoExists = async (periodoId) => {
    try {
        const periodo = await PeriodoAcademico.findOne({
            where: { periodo_id: periodoId }
        });
        return periodo !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const periodoAcademicoNameExists = async (periodoNombre) => {
    console.log('periodoNombre', periodoNombre);
    try {
        const periodo = await PeriodoAcademico.findOne({
            where: { periodo_nombre: periodoNombre }
        });
        return periodo !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const createPeriodoAcademico = async (newPeriodo) => {
    try {
        const createdPeriodo = await PeriodoAcademico.create(newPeriodo);
        return createdPeriodo;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updatePeriodoAcademico = async (periodoId, periodoChanges) => {
    try {
        const [updated] = await PeriodoAcademico.update(periodoChanges, {
            where: { periodo_id: periodoId }
        });
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.PERIODO_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updatePeriodoAcademicoState = async (periodoId, newState) => {
    try {
        const [updated] = await PeriodoAcademico.update(
            { periodo_activo: newState },
            { where: { periodo_id: periodoId } }
        );
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.PERIODO_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getPeriodoAcademicoById = async (periodoId) => {
    try {
        const periodo = await PeriodoAcademico.findByPk(periodoId);
        if (periodo) {
            return periodo;
        }
        throw new HttpError(404, messagesEs.errors.PERIODO_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAllPeriodosAcademicos = async () => {
    try {
        const periodos = await PeriodoAcademico.findAll({
            order: [['periodo_activo', 'DESC'], ['periodo_nombre', 'ASC']]
        });
        return periodos;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    periodoAcademicoExists,
    createPeriodoAcademico,
    updatePeriodoAcademico,
    getPeriodoAcademicoById,
    getAllPeriodosAcademicos,
    updatePeriodoAcademicoState,
    periodoAcademicoNameExists
};