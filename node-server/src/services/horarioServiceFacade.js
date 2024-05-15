const horarioService = require("./horarioService");
const messagesEs = require("../utils/messagesEs");
const HttpError = require("../utils/HttpError");
const docenteService = require("./docenteService");
/*const periodoAcademicoService = require("./periodoAcademicoService");
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
        await checkHorarioToCreate(newHorario);
        const createdHorario = await horarioService.createHorario(newHorario);
        return createdHorario;
    } catch (error) {
        throw error;
    }
};

const updateHorario = async (perId, docId, horarioChanges) => {
    try {
        const { franjasHorarioToCreate, franjasHorarioToDelete } = await checkHorarioToUpdate(horarioChanges);
        const updatedHorario = await horarioService.updateHorario(perId, docId, franjasHorarioToCreate, franjasHorarioToDelete);
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

const checkHorarioToCreate = async (newHorario) => {
    if(!newHorario.horario_franjas || newHorario.horario_franjas.length === 0){
        throw new HttpError(400, messagesEs.errors.HORARIO_EMPTY);
    }

    await checkDocenteHours(newHorario);
    //await checkColumnsState(newHorario);
    await checkAmbientesAvailability(newHorario, horarioService.getAmbientesByDay);
};

const checkHorarioToUpdate = async (horarioToUpdate) => {
    if(!horarioToUpdate.horario_franjas || horarioToUpdate.horario_franjas.length === 0){
        throw new HttpError(400, messagesEs.errors.HORARIO_EMPTY);
    }
    await checkDocenteHours(horarioToUpdate);

    const currentHorario = await horarioService.getHorarioByPerAndDocId(horarioToUpdate.periodo_id, horarioToUpdate.docente_id);

    const franjasHorarioToCreate = compareHorario1NotInHorario2(horarioToUpdate, currentHorario);
    const franjasHorarioToDelete = compareHorario1NotInHorario2(currentHorario, horarioToUpdate);

    if(franjasHorarioToCreate.horario_franjas.length === 0 && franjasHorarioToDelete.horario_franjas.length === 0){
        throw new HttpError(400, messagesEs.errors.NO_HORARIO_CHANGES);
    }

    //await checkColumnsState(franjasToCreate);
    
    const getAmbientesByDayFiltered = async (day, perId) => {
        let currentAmbientes = await horarioService.getAmbientesByDay(day, perId);

        const franjasDay = franjasHorarioToDelete.horario_franjas.find(franja => franja.franja_dia === day ).franjas;

        for(const ambiente of currentAmbientes){
            const franjasUsingAmbiente = franjasDay.filter(franja => franja.ambiente_id === ambiente.ambiente_id);
            for(const franja of franjasUsingAmbiente){
                for(const franjaAmbiente of ambiente.franjas){
                    if(franjaAmbiente.franja_hora_inicio == franja.franja_hora_inicio){
                        ambiente.franjas.splice(ambiente.franjas.indexOf(franjaAmbiente), 1);
                    }   
                }
            }
            
        }
        return currentAmbientes;
    };

    await checkAmbientesAvailability(franjasHorarioToCreate, getAmbientesByDayFiltered);
    return {
        franjasHorarioToCreate: franjasHorarioToCreate,
        franjasHorarioToDelete: franjasHorarioToDelete
    }
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
        throw new HttpError(400, messagesEs.errors.WEEK_HOURS_REQUIRED(requiredWeekHours, weekHours));
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
        throw new HttpError(400, messagesEs.errors.MAX_HOURS_PER_DAY(maxHoursPerDay));
    }
};

const checkColumnsState = async (horario) => {
    const { periodo_id: perId, docente_id: docId } = horario;

    const [isPeriodoActive, isDocenteActive] = await Promise.all([
        periodoAcademicoService.isPeriodoActive(perId),
        docenteService.isDocenteActive(docId)
    ]);

    if (!isPeriodoActive) {
        throw new HttpError(400, messagesEs.errors.PERIODO_NOT_ACTIVE);
    }

    if (!isDocenteActive) {
        throw new HttpError(400, messagesEs.errors.DOCENTE_NOT_ACTIVE);
    }

    for(let franjasHorario of horario.horario_franjas){
        for(let franja of franjasHorario.franjas){
            const [isAmbienteActive, isCompetenciaActive] = await Promise.all([
                ambienteService.isAmbienteActive(franja.ambiente_id),
                competenciaService.isCompetenciaActive(franja.competencia_id)
            ]);

            if (!isAmbienteActive) {
                const ambiente = await ambienteService.getAmbienteById(franja.ambiente_id);
                throw new HttpError(400, messagesEs.errors.AMBIENTE_NOT_ACTIVE(ambiente.ambiente_nombre));
            }

            if (!isCompetenciaActive) {
                const competencia = await competenciaService.getCompetenciaById(franja.competencia_id);
                throw new HttpError(400, messagesEs.errors.COMPETENCIA_NOT_ACTIVE(competencia.competencia_nombre));
            }
        }
    }
};

const checkAmbientesAvailability = async (horario, getAmbientesByDay) => {
    const { periodo_id: perId } = horario;
    //Iterate over each franja_horario by day and check if the ambiente is available between the hours
    for (let horarioFranja of horario.horario_franjas) {
        const ambientesByDay = await getAmbientesByDay(horarioFranja.franja_dia, perId);
        for (let franja of horarioFranja.franjas) {
            const ambienteFound = Array.isArray(ambientesByDay) ? ambientesByDay.find(ambiente => ambiente.ambiente_id === franja.ambiente_id) : ambientesByDay;

            //If the ambiente is not found in this day, then it is available 
            if (!ambienteFound) {
                continue;
            }

            //If the ambiente is found, then check if the franja is available with the hours when the ambiente is already taken
            for (let franjaAmbiente of ambienteFound.franjas) {

                if (!(franja.franja_hora_fin <= franjaAmbiente.franja_hora_inicio || franja.franja_hora_inicio >= franjaAmbiente.franja_hora_fin)) {  
                    throw new HttpError(400, messagesEs.errors.AMBIENTE_NOT_AVAILABLE(franja.ambiente_id, horarioFranja.franja_dia, franjaAmbiente.franja_hora_inicio, franjaAmbiente.franja_hora_fin));
                }
            }
        }
    }
};

const compareHorario1NotInHorario2 = (horario1, horario2) => {
    let franjasByDay = [];

    for(let franja1 of horario1.horario_franjas){
        const franja2 = horario2.horario_franjas.find(franja => franja.franja_dia === franja1.franja_dia);
        if(!franja2){
            franjasByDay.push(franja1);
            continue;
        }
        let franjaDay = [];

        for(let franjaInterna1 of franja1.franjas){
            const franjaInterna2 = franja2.franjas
            .find(franja => 
                franja.ambiente_id === franjaInterna1.ambiente_id &&
                franja.competencia_id === franjaInterna1.competencia_id && 
                franja.franja_duracion === franjaInterna1.franja_duracion &&
                franja.franja_hora_fin === franjaInterna1.franja_hora_fin &&    
                franja.franja_hora_inicio === franjaInterna1.franja_hora_inicio);
            if(!franjaInterna2){
                franjaDay.push(franjaInterna1);
            }
        }

        if(franjaDay.length == 0){
            continue;
        }

        const newFranja = {
            franja_dia: franja1.franja_dia,
            franjas: franjaDay
        }
        franjasByDay.push(newFranja);
    }
    return {
        ...horario1,
        horario_franjas: franjasByDay
    };
};

module.exports = { getHorarioByPerAndDocId, createHorario, updateHorario, deleteHorario };