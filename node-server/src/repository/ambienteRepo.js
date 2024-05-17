const { Ambiente } = require('./models/index');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const ambienteExists = async (ambienteId) => {
    try {
        const ambiente = await Ambiente.findOne({
            where: { ambiente_id: ambienteId }
        });
        return ambiente !== null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createAmbiente = async (newAmbiente) => {
    try {
        const createdAmbiente = await Ambiente.create(newAmbiente);
        return createdAmbiente;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateAmbiente = async (ambienteId, ambienteChanges) => {
    try {
        const [updated] = await Ambiente.update(ambienteChanges, {
            where: { ambiente_id: ambienteId }
        });
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateAmbienteState = async (ambienteId, newState) => {
    try {
        const [updated] = await Ambiente.update(
            { ambiente_activo: newState },
            { where: { ambiente_id: ambienteId } }
        );
        if (updated) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteAmbiente = async (ambienteId) => {
    try {
        const deleted = await Ambiente.destroy({
            where: { ambiente_id: ambienteId }
        });
        if (deleted) {
            return true;
        }
        throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAmbienteById = async (ambienteId) => {
    try {
        const ambiente = await Ambiente.findByPk(ambienteId);
        if (ambiente) {
            return ambiente;
        }
        throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAllAmbientes = async () => {
    try {
        const ambientes = await Ambiente.findAll({
            order: [['ambiente_nombre', 'ASC'], ['ambiente_activo', 'DESC']]
        });
        return ambientes;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    ambienteExists,
    createAmbiente,
    updateAmbiente,
    deleteAmbiente,
    getAmbienteById,
    getAllAmbientes,
    updateAmbienteState
};