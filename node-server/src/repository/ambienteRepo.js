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
        let createdAmbiente = await Ambiente.create(newAmbiente);
        const ambienteId = 'AMB' + String(createdAmbiente.id).padStart(3, '0');
        await Ambiente.update({ ambiente_id: ambienteId }, { where: { id: createdAmbiente.id } });
        createdAmbiente.ambiente_id = ambienteId;
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

const getAmbienteById = async (ambienteId) => {
    try {
        const ambiente = await Ambiente.findOne({
            where: { ambiente_id: ambienteId }
        });
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
            order: [['ambiente_activo', 'DESC'], ['ambiente_nombre', 'ASC']]
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
    getAmbienteById,
    getAllAmbientes,
    updateAmbienteState
};