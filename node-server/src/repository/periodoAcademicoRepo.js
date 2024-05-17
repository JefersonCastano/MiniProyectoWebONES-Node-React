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

const deletePeriodoAcademico = async (periodoId) => {
    try {
        const deleted = await PeriodoAcademico.destroy({
            where: { periodo_id: periodoId }
        });
        if (deleted) {
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
            order: [['periodo_nombre', 'ASC'], ['periodo_activo', 'DESC']]
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
    deletePeriodoAcademico,
    getPeriodoAcademicoById,
    getAllPeriodosAcademicos
};