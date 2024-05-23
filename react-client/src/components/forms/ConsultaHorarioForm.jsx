import React, { useState, useEffect } from 'react'
import { useForm, Controller, set } from 'react-hook-form';
import { getAllPeriodosAcademicos } from '../../api/periodoAcademicoRoutes';
import SearchableDropdown from '../../components/SearchableDropdown';

import { getAllDocentes } from '../../api/docenteRoutes';

import { useCommonHorarioContext } from '../CommonHorarioContext';

const ConsultaHorarioForm = () => {

    const { register, handleSubmit, setValue, reset, watch, control, formState: { errors, isValid } } = useForm();
    const { states, state, setDatosHorario, datosHorario, getHorarios } = useCommonHorarioContext();

    const [periodosAcademicos, setPeriodosAcademicos] = useState([]);
    const [docentes, setDocentes] = useState([]);

    const keysPeriodo = { id: 'periodo_id', name: 'periodo_nombre' };
    const keysDocente = { id: 'docente_id', name: 'docente_nombre_completo' };

    useEffect(() => {
        if (!datosHorario.periodo_id || !datosHorario.docente_id) {
            setValue('periodo_id', '');
            setValue('docente_id', '');
        }
    }, [datosHorario]);

    useEffect(() => {
        getAllPeriodosAcademicos().then(data => {
            if (data) setPeriodosAcademicos(data.filter(periodo => periodo.periodo_activo))
        });
        getAllDocentes().then(data => {
            if (data) {
                let filteredDocentes = data.filter(docente => docente.docente_activo);
                filteredDocentes = filteredDocentes.map(docente => ({
                    ...docente,
                    docente_nombre_completo: `${docente.docente_apellidos} ${docente.docente_nombres}`
                }));
                setDocentes(filteredDocentes);
            }
        });
    }, []);

    const onSubmit = handleSubmit(async (data, e) => {
        e.preventDefault();
        if (isValid) {
            getHorarios(data.periodo_id, data.docente_id, "Puedes crearlo ahora mismo");
            setDatosHorario(data);
        }
    });

    return (
        <form className="p-0" onSubmit={onSubmit}>
            <div className="row g-3">
                <div className="col-lg-4 offset-lg-1 ps-5">
                    <label htmlFor="periodosAcademicos" className="form-label">Periodos Académicos</label>
                    <Controller name="periodo_id" control={control} defaultValue=""
                        rules={{
                            required: "El periodo académico es requerido",
                            validate: value => periodosAcademicos.map(ambiente => ambiente.periodo_id).includes(value) || "Seleccione un periodo académico válido"
                        }}
                        render={({ field }) =>
                            <SearchableDropdown
                                options={periodosAcademicos} value={field.value} setValue={field.onChange} 
                                disabled={[states.adding, states.editing].includes(state)} keys={keysPeriodo} />
                        } />
                    <div className="invalid-feedback d-block">
                        {errors.periodo_id && errors.periodo_id.message}
                    </div>
                </div>
                <div className="col-lg-4">
                    <label htmlFor="docentes" className="form-label">Docentes</label>
                    <Controller name="docente_id" control={control} defaultValue=""
                        rules={{
                            required: "El docente es requerido",
                            validate: value => docentes.map(docente => docente.docente_id).includes(value) || "Seleccione un docente válido"
                        }}
                        render={({ field }) =>
                            <SearchableDropdown
                                options={docentes} value={field.value} setValue={field.onChange} 
                                disabled={[states.adding, states.editing].includes(state)} keys={keysDocente} />
                        } />
                    <div className="invalid-feedback d-block">
                        {errors.docente_id && errors.docente_id.message}
                    </div>
                </div>
                {
                    ![states.adding, states.editing].includes(state) &&
                    <div className="col-lg-2 mt-5 mb-2">
                        <button type="submit" className="btn btn-primary me-2">Buscar</button>
                    </div>
                }
            </div>
        </form>
    )
}

export default ConsultaHorarioForm