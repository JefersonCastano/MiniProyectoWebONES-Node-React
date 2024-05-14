const horarioService = require("./horarioService");
const messagesEs = require("../utils/messagesEs");
const HttpError = require("../utils/HttpError");
/*const docenteService = require("./docenteService");
const periodoService = require("./periodoService");
const ambienteService = require("./ambienteService");
const competenciaService = require("./competenciaService");*/

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
        await checkHorario(newHorario);
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

const checkHorario = async (horario) => {
    await checkDocenteHours(horario);
    //await checkColumnsState(horario);
    await checkAmbientesAvailability(horario);
};


const checkDocenteHours = async (horario) => {
    const docente = await docenteService.getDocenteById(horario.docente_id);
    const { docente_tipocontrato: tipoContrato } = docente;

    const requiredWeekHours = tipoContrato === "PT" ? 32 : 40;
    const weekHours = horario.horario_franjas.reduce((acc, horarioFranja) => {
        horarioFranja.franjas.forEach(franja => {
            acc += franja.franja_duracion;
        });
        return acc;
    }, 0);

    if (weekHours != requiredWeekHours) {
        throw HttpError(400, messagesEs.errors.WEEK_HOURS_REQUIRED(requiredWeekHours, weekHours));
    }

    const maxHoursPerDay = tipoContrato === "PT" ? 8 : 10;
    const hoursPerDay = horario.horario_franjas.reduce((acc, horarioFranja) => {
        const day = horarioFranja.franja_dia;
        horarioFranja.franjas.forEach(franja => {
            acc[day] = (acc[day] || 0) + franja.franja_duracion;
        });
        return acc;
    }, {});

    if (!Object.values(hoursPerDay).every(hours => hours <= maxHoursPerDay)) {
        throw HttpError(400, messagesEs.errors.MAX_HOURS_PER_DAY(maxHoursPerDay));
    }
};

const checkColumnsState = async (horario) => {
    const { periodo_id: perId, docente_id: docId } = horario;

    const isPeriodoActive = await periodoService.isPeriodoActive(perId);
    if (!isPeriodoActive) {
        throw new HttpError(400, messagesEs.errors.PERIODO_NOT_ACTIVE);
    }

    const isDocenteActive = await docenteService.isDocenteActive(docId);
    if (!isDocenteActive) {
        throw new HttpError(400, messagesEs.errors.DOCENTE_NOT_ACTIVE);
    }

    for(franjasHorario of horario.horario_franjas){
        for(franja of franjasHorario.franjas){
            const isAmbienteActive = await ambienteService.isAmbienteActive(franja.ambiente_id);
            if (!isAmbienteActive) {
                throw new HttpError(400, messagesEs.errors.AMBIENTE_NOT_ACTIVE);
            }

            const isCompetenciaActive = await competenciaService.isCompetenciaActive(franja.competencia_id);
            if (!isCompetenciaActive) {
                throw new HttpError(400, messagesEs.errors.COMPETENCIA_NOT_ACTIVE);
            }
            
        }
    }
};
const checkAmbientesAvailability = async (horario) => {
    const { periodo_id: perId, docente_id: docId } = horario;
    //Iterate over each franja_horario by day and check if the ambiente is available between the hours
    for (let horarioFranja of horario.horario_franjas) {
        const ambientesByDay = await horarioService.getAmbientesByDay(horarioFranja.franja_dia, perId);
        for (let franja of horarioFranja.franjas) {
            const ambienteFound = Array.isArray(ambientesByDay) ? ambientesByDay.find(ambiente => ambiente.ambiente_id === franja.ambiente_id) : ambientesByDay;

            //If the ambiente is not found in this day, then it is available 
            if (!ambienteFound) {
                continue;
            }

            //If the ambiente is found, then check if the franja is available with the hours when the ambiente is already taken
            for (let franjaAmbiente of ambienteFound.franjas) {

                //TODO traer ambiente para mandar el nombre del ambiente en el mensaje
                if (!(franja.franja_hora_fin <= franjaAmbiente.franja_hora_inicio || franja.franja_hora_inicio >= franjaAmbiente.franja_hora_fin)) {
                    throw new HttpError(400, messagesEs.errors.AMBIENTE_NOT_AVAILABLE(franja.ambiente_id, horarioFranja.franja_dia, franjaAmbiente.franja_hora_inicio, franjaAmbiente.franja_hora_fin));
                }
            }
        }
    }
};
module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };