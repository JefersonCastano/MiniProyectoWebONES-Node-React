import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import SearchableDropdown from '../SearchableDropdown';
import { getAllProgramas } from '../../api/programaRoutes';
import { getAllCompetenciasGenericas } from '../../api/competenciaRoutes';
import { getAllCompetenciasByProgramaId } from '../../api/competenciaRoutes';
import { getAllAmbientes } from '../../api/ambienteRoutes';
import { useHorarioContext } from '../../routers/coordinador/Horario';

const HorarioForm = ({ handleClose, deleteFranja }) => {

    const { state, states, setState, franjaActual, horario, setHorario, datosHorario, horasMaximas, setError, setShowMessage, setErrorMessage } = useHorarioContext();

    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors, isValid } } = useForm();

    const [programas, setProgramas] = useState([]);
    const [competencias, setCompetencias] = useState([]);
    const [ambientes, setAmbientes] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const keysPrograma = { id: 'programa_id', name: 'programa_nombre' };
    const keysCompetencia = { id: 'competencia_id', name: 'competencia_nombre' };
    const keysAmbiente = { id: 'ambiente_id', name: 'ambiente_nombre' };

    const programa = watch('programa_id');

    useEffect(() => {
        const loadInitialData = async () => {
            const programasResult = await getAllProgramas();
            const competenciasGenericasResult = await getAllCompetenciasGenericas();
            const ambientesResult = await getAllAmbientes();

            if (programasResult) setProgramas(programasResult);
            if (competenciasGenericasResult) setCompetencias(competenciasGenericasResult);
            if (ambientesResult) setAmbientes(ambientesResult.filter(ambiente => ambiente.ambiente_activo));

            if (franjaActual.state == 'existing') {
                if (franjaActual.competencia.programa_id && programa != -1) {
                    const competenciasEspecificasResult = await getAllCompetenciasByProgramaId(franjaActual.competencia.programa_id);
                    if (competenciasEspecificasResult) {
                        setCompetencias(prevCompetencias => [...competenciasEspecificasResult, ...prevCompetencias]);
                        //Aqui va el setValue si falla
                    }
                }
                setValue('competencia_id', franjaActual.competencia_id);
            }
            setDataLoaded(true);
        };
        loadInitialData();
    }, [franjaActual]);

    useEffect(() => {
        if (franjaActual.state == 'existing') {
            setValue('programa_id', franjaActual.competencia.programa_id);
            setValue('ambiente_id', franjaActual.ambiente_id);
            setValue('cantidad_horas', franjaActual.franja_duracion);
        } else {
            reset();
        }
    }, [franjaActual]);

    useEffect(() => {
        const updateCompetencias = async () => {
            if (programa && programa != -1) {
                const competenciasEspecificasResult = await getAllCompetenciasByProgramaId(programa);
                if (competenciasEspecificasResult) setCompetencias(prevCompetencias => [...competenciasEspecificasResult, ...prevCompetencias]);
            } else {
                const competenciasGenericasResult = await getAllCompetenciasGenericas();
                if (competenciasGenericasResult) setCompetencias(competenciasGenericasResult);
            }
        }
        updateCompetencias();
    }, [programa]);

    const validateHoursDay = (horario) => {
        const franjas_dia = horario.horario_franjas.find(franja => franja.franja_dia === franjaActual.franja_dia).franjas;
        const hours = franjas_dia.reduce((acc, franja) => acc + franja.franja_duracion, 0);
        console.log("horas dia:", hours);
        if (hours > horasMaximas.max_dia) {
            setError("oh oh");
            setErrorMessage(`El docente debe orientar máximo ${horasMaximas.max_dia} horas por día.`);
            setShowMessage(true);
            return false;
        }
        return true;
    }
    const validateHoursWeek = (horario) => {
        const hours = horario.horario_franjas.reduce((acc, franja) => acc + franja.franjas.reduce((acc, franja) => acc + franja.franja_duracion, 0), 0);
        if (hours > horasMaximas.max_semana) {
            setError("oh oh");
            setErrorMessage(`El docente debe orientar máximo ${horasMaximas.max_semana} horas por semana.`);
            setShowMessage(true);
            return false;
        }
        return true;
    }
    const validateHours = (horario) => {
        return validateHoursDay(horario) && validateHoursWeek(horario);
    }
    const validateCrossing = (horario) => {
        const franjas_dia = horario.horario_franjas.find(franja => franja.franja_dia === franjaActual.franja_dia).franjas;
        const crossing = franjas_dia.find(franja =>
            franja.franja_hora_inicio < franjaActual.franja_hora_inicio && franja.franja_hora_fin > franjaActual.franja_hora_inicio
            || franja.franja_hora_inicio < franjaActual.franja_hora_fin && franja.franja_hora_fin > franjaActual.franja_hora_fin
            || franja.franja_hora_inicio >= franjaActual.franja_hora_inicio && franja.franja_hora_fin <= franjaActual.franja_hora_fin
        );
        if (crossing) {
            setError("oh oh");
            setErrorMessage(`Tienes un cruce de horas con la competencia: ${crossing.competencia.competencia_nombre}`);
            setShowMessage(true);
            return false;
        }
        return true;
    }
    const addFranja = (horario, data) => {
        const franja_dia = franjaActual.franja_dia;
        const franja_hora_fin = franjaActual.franja_hora_inicio + parseInt(data.cantidad_horas);
        const newFranja = {
            ambiente_id: data.ambiente_id,
            competencia_id: data.competencia_id,
            franja_hora_inicio: franjaActual.franja_hora_inicio,
            franja_hora_fin, franja_duracion: parseInt(data.cantidad_horas),
            competencia: {
                competencia_nombre: competencias.find(competencia => competencia.competencia_id == data.competencia_id).competencia_nombre,
                programa_id: data.programa_id
            }
        };
        const nuevoHorario = {
            ...datosHorario,
            horario_franjas: horario.horario_franjas.map(franja =>
                franja.franja_dia === franja_dia
                    ? { ...franja, franjas: [...franja.franjas, newFranja] }
                    : franja
            )
        };
        return nuevoHorario;
    }

    const onSubmit = handleSubmit(async (data, e) => {
        e.preventDefault();
        if (isValid) {
                let horarioActual = horario;
                if(franjaActual.state == 'existing') {
                    horarioActual = deleteFranja();
                }
                const nuevoHorario = addFranja(horarioActual, data);

                if (!validateHours(nuevoHorario) && !validateCrossing(nuevoHorario)) return;
                setHorario(nuevoHorario);
                handleClose();
        }
    });

    const handleCancel = () => {
        reset();
        handleClose();
    }

    if (!dataLoaded) {
        return <div>Cargando datos...</div>;
    }

    return (
        <form className="mt-1 mx-5" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="programa" className="form-label">Programa</label>
                <Controller
                    name="programa_id" control={control} defaultValue=""
                    render={({ field }) =>
                        <SearchableDropdown
                            options={programas} value={field.value} setValue={field.onChange}
                            disabled={state == states.consulting} keys={keysPrograma}
                        />
                    }
                />
                <div className="invalid-feedback d-block">
                    {errors.programa_id && errors.programa_id.message}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="competencia" className="form-label">Competencia</label>
                <Controller
                    name="competencia_id" control={control} defaultValue=""
                    rules={{
                        required: "La competencia es requerida",
                        validate: value => competencias.map(competencia => competencia.competencia_id).includes(value) || "Seleccione una competencia válida"
                    }}
                    render={({ field }) =>
                        <SearchableDropdown
                            options={competencias} value={field.value} setValue={field.onChange}
                            disabled={state == states.consulting} keys={keysCompetencia}
                        />
                    }
                />
                <div className="invalid-feedback d-block">
                    {errors.competencia_id && errors.competencia_id.message}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="ambiente" className="form-label">Ambiente</label>
                <Controller
                    name="ambiente_id" control={control} defaultValue=""
                    rules={{
                        required: "El ambiente es requerido",
                        validate: value => ambientes.map(ambiente => ambiente.ambiente_id).includes(value) || "Seleccione un ambiente válido"
                    }}
                    render={({ field }) =>
                        <SearchableDropdown
                            options={ambientes} value={field.value} setValue={field.onChange}
                            disabled={state == states.consulting} keys={keysAmbiente}
                        />
                    }
                />
                <div className="invalid-feedback d-block">
                    {errors.ambiente_id && errors.ambiente_id.message}
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="cantidadHoras" className="form-label">Cantidad de horas</label>
                <select id="cantidadHoras" className="form-select" aria-label="cantidad de horas" {...register('cantidad_horas', {
                    validate: value => value != "-1" || "La cantidad de horas es requerida"
                })} disabled={state == states.consulting}>
                    <option value="-1">Seleccione una opción</option>
                    {
                        [...Array(6)].map((_, index) => {
                            const horas = index + 1;
                            if (franjaActual.franja_hora_inicio + index <= 21) {
                                return <option key={index} value={horas}>{horas}</option>
                            }
                            return null;
                        })
                    }
                </select>
                <div className="invalid-feedback d-block">
                    {errors.cantidad_horas && errors.cantidad_horas.message}
                </div>
            </div>
            {
                [states.adding, states.editing].includes(state) &&
                <Modal.Footer>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary me-2">Confirmar</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
                    </div>
                </Modal.Footer>
            }
        </form>
    )
}

export default HorarioForm