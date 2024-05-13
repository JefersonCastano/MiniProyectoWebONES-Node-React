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

const createFranjasHorario = async (perId, docId, horarioFranjas) => {
    try {
        const newHorarioFranjas = horarioFranjas.map(franja => ({
            ...franja,
            periodo_id: perId,
            docente_id: docId
        }));

        const newHorario = await FranjaHorario.bulkCreate(newHorarioFranjas);
        return newHorario;
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

module.exports = { getFranjasHorarioByPerAndDocId, createFranjasHorario, deleteHorario, horarioExists };