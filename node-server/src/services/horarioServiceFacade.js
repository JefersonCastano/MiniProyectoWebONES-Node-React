const horarioService = require("./horarioService");
const messagesEs = require("../utils/messagesEs");

const getHorarioByPerAndDocId = async (perId, docId) => {
    try {
        const horario = await horarioService.getHorarioByPerAndDocId(perId, docId);
        return horario;
    } catch (error) {
        throw error;
    }
};

const createHorario = async (newHorario) => {
    try {
        checkHorario(newHorario);
        const createdHorario = await horarioService.createHorario(newHorario);
        return createdHorario;
    } catch (error) {
        throw error;
    }
};

const updateHorario = async (perId, docId, horarioChanges) => {
    try {
        //TODO verificar que el horario sea valido para actualizar
        const updatedHorario = await horarioService.updateHorario(perId, docId, horarioChanges);
        return updatedHorario;
    } catch (error) {
        throw error;
    }
};

const deleteHorario = async (perId, docId) => {
    try {
        await horarioService.deleteHorario(perId, docId);
    } catch (error) {
        throw error;
    }
};

const checkHorario = (horario) => {
    //TODO Implementar
};

module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };