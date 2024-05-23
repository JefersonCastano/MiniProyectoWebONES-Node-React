const horarioRepo = require('../repository/horarioRepo');
const messagesEs = require("../utils/messagesEs");
const HttpError = require('../utils/HttpError');
const { franjasToHorario, horarioToFranjas } = require('../utils/format');

const getHorarioByPerAndDocId = async (perId, docId) => {
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new HttpError(400, messagesEs.errors.HORARIO_NOT_FOUND);
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
        docente_id: docId
    } = newHorario;

    const newFranjasHorario = horarioToFranjas(newHorario);

    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (exists) {
            throw new HttpError(400, messagesEs.errors.HORARIO_ALREADY_EXISTS);
        }
        await horarioRepo.createFranjasHorario(newFranjasHorario);
        const createdHorario = getHorarioByPerAndDocId(perId, docId);
        return createdHorario;
    } catch (error) {
        throw error;
    }
};

const updateHorario = async (perId, docId, franjasHorarioToCreate, franjasHorarioToDelete) => {
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new HttpError(400, messagesEs.errors.HORARIO_NOT_FOUND);
        }

        await horarioRepo.deleteFranjasHorario(horarioToFranjas(franjasHorarioToDelete));
        await horarioRepo.createFranjasHorario(horarioToFranjas(franjasHorarioToCreate));

        const updatedHorario = await getHorarioByPerAndDocId(perId, docId);
        return updatedHorario;
    } catch (error) {
        throw error;
    }
};

const deleteHorario = async (perId, docId) => {
    try {
        const exists = await horarioRepo.horarioExists(perId, docId);
        if (!exists) {
            throw new HttpError(400, messagesEs.errors.HORARIO_NOT_FOUND);
        }
        await horarioRepo.deleteHorario(perId, docId);
    } catch (error) {
        throw error;
    }
};

const getAmbientesByDay = async (franja_dia, perId) => {
    try {
        const ambientes = await horarioRepo.getAmbientesByDay(franja_dia, perId);
        const result = [];
        ambientes.forEach(curr => {
            const ambiente_id = curr.ambiente_id;
            const franja = { 'franja_hora_inicio': curr.franja_hora_inicio, 'franja_hora_fin': curr.franja_hora_fin };
        
            const found = result.find(item => item.ambiente_id === ambiente_id);
            if (!found) {
                result.push({ 'ambiente_id': ambiente_id, 'franjas': [franja] });
            } else {
                found.franjas.push(franja);
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

const getOccupiedAmbientes  = async (perId, dia, horaInicio) => {
    try {
        const ambientes = await horarioRepo.getOccupiedAmbientes(perId, dia, horaInicio);
        return ambientes;
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getHorarioByPerAndDocId, 
    createHorario, 
    updateHorario, 
    deleteHorario, 
    getAmbientesByDay,
    getOccupiedAmbientes 
};