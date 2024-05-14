const { FranjaHorario } = require('./models/index');

const horarioExists = async (perId, docId) => {
    try {
        const horario = await FranjaHorario.findOne({
            where: { periodo_id: perId, docente_id: docId }
        });
        return horario != null;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getFranjasHorarioByPerAndDocId = async (perId, docId) => {
    try {
      const franjas = await FranjaHorario.findAll({
         where: { periodo_id: perId, docente_id: docId }
        });
        return franjas;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createFranjasHorario = async (newHorarioFranjas) => {
    try {
        const createdFranjas = await FranjaHorario.bulkCreate(newHorarioFranjas);
        return createdFranjas;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteHorario = async (perId, docId) => {
    try {
        await FranjaHorario.destroy({
            where: { periodo_id: perId, docente_id: docId }
        });
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getAmbientesByDay = async (franja_dia, perId) => {
    try {
        const franjas = await FranjaHorario.findAll({
            attributes: ['ambiente_id', 'franja_hora_inicio', 'franja_hora_fin'],
            where: { periodo_id: perId, franja_dia: franja_dia }
        });
        return franjas;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { getFranjasHorarioByPerAndDocId, createFranjasHorario, deleteHorario, horarioExists, getAmbientesByDay };