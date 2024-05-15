const ambienteRepo = require('../repository/ambienteRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');

const createAmbiente = async (newAmbiente) => {
    try {
        const createdAmbiente = await ambienteRepo.createAmbiente(newAmbiente);
        return createdAmbiente;
    } catch (error) {
        throw error;
    }
};

const updateAmbiente = async (ambienteId, ambienteChanges) => {
    try {
        const ambienteExists = await ambienteRepo.ambienteExists(ambienteId);
        if (!ambienteExists) {
            throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
        }

        const updated = await ambienteRepo.updateAmbiente(ambienteId, ambienteChanges);
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteAmbiente = async (ambienteId) => {
    try {
        const ambienteExists = await ambienteRepo.ambienteExists(ambienteId);
        if (!ambienteExists) {
            throw new HttpError(404, messagesEs.errors.AMBIENTE_NOT_FOUND);
        }
        const deleted = await ambienteRepo.deleteAmbiente(ambienteId);
        return deleted;
    } catch (error) {
        throw error;
    }
};

const getAmbienteById = async (ambienteId) => {
    try {
        const ambiente = await ambienteRepo.getAmbienteById(ambienteId);
        return ambiente;
    } catch (error) {
        throw error;
    }
};

const getAllAmbientes = async () => {
    try {
        const ambientes = await ambienteRepo.getAllAmbientes();
        return ambientes;
    } catch (error) {
        throw error;
    }
};

const isAmbienteActive = async (ambienteId) => {
    try {
        const ambiente = await getAmbienteById(ambienteId);
        return ambiente.ambiente_activo;
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    createAmbiente, 
    updateAmbiente, 
    deleteAmbiente, 
    getAmbienteById, 
    getAllAmbientes,
    isAmbienteActive
};