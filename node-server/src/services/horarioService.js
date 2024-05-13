const horarioRepo = require('../repository/horarioRepo');
const messagesEs = require("../utils/messagesEs");


const getHorarioByPerAndDocId = async (perId, docId) => {
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new Error(messagesEs.errors.HORARIO_NOT_FOUND);
        }

        const franjas = await horarioRepo.getFranjasHorarioByPerAndDocId(perId, docId);
        const horario = franjasToHorario(perId, docId, franjas);
        return horario;
      } catch (error) {
        throw error;
      }
};

const createHorario = async (newHorario) => {
    const { 
        periodo_id: perId, 
        docente_id: docId,
        horario_franjas: horarioFranjas 
    } = newHorario;

    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new Error(messagesEs.errors.HORARIO_ALREADY_EXISTS);
        }

        checkHorario(perId, docId, horarioFranjas);

        const createdFranjas = await horarioRepo.createFranjasHorario(perId, docId, horarioFranjas);
        const createdHorario = franjasToHorario(perId, docId, createdFranjas);
        return createdHorario;
      } catch (error) {
        throw error;
      }
};

const updateHorario = async (perId, docId, horarioChanges) => {
    const horarioFranjas = horarioChanges.horario_franjas;
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new Error(messagesEs.errors.HORARIO_NOT_FOUND);
        }

        //TODO Buscar forma de actualizar solo las franjas que cambian
        const updatedFranjas = await horarioRepo.createFranjasHorario(perId, docId, horarioFranjas);
        const updatedHorario = franjasToHorario(perId, docId, updatedFranjas);
        return updatedHorario;
      } catch (error) {
        throw error;
      }
};

const deleteHorario = async (perId, docId) => {
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new Error(messagesEs.errors.HORARIO_NOT_FOUND);
        }
        await horarioRepo.deleteHorario(perId, docId);
    } catch (error) {
        throw error;
    }
};

const checkHorario = (perId, docId, horarioFranjas) => {

};

const franjasToHorario = (perId, docId, franjas) => {
    const horarioFranjas = franjas.map(franja => {
        const { periodo_id, docente_id, ...rest } = franja.get({ plain: true });
        return rest;
    });

    return {
        periodo_id: perId,
        docente_id: docId,
        horario_franjas: horarioFranjas
    };
};

module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };