import React from 'react'
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getAllPeriodosAcademicos } from '../../api/periodoAcademicoRoutes';
import { useCommonHorarioContext } from '../horario/CommonHorarioContext';
import SearchableDropdown from '../SearchableDropdown';

const ConsultaHorarioDocenteForm = ({ docente_id }) => {

    const { state, states,
        datosHorario, setDatosHorario,
        getHorarios } = useCommonHorarioContext();

    const { handleSubmit, setValue, control, formState: { errors, isValid } } = useForm();

    const [periodosAcademicos, setPeriodosAcademicos] = useState([]);

    const keysPeriodo = { id: 'periodo_id', name: 'periodo_nombre' };

    useEffect(() => {
        if (!datosHorario?.periodo_id) {
            setValue('periodo_id', '');
        }
    }, [datosHorario]);

    useEffect(() => {
        const getPeriodosAcademicos = async () => {
            const data = await getAllPeriodosAcademicos();
            if (data) setPeriodosAcademicos(data.filter(periodo => periodo.periodo_activo))
        };
        getPeriodosAcademicos();
    }, []);

    const onSubmit = handleSubmit(async (data, e) => {
        e.preventDefault();
        if (isValid) {
            getHorarios(data.periodo_id, docente_id, "No cuentas con ningún horario registrado para este periodo académico", true);
            setDatosHorario({ ...data, docente_id });
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
                <div className="col-lg-2 mt-5 mb-2">
                    <button type="submit" className="btn btn-primary me-2">Buscar</button>
                </div>
            </div>
        </form>
    )
}

export default ConsultaHorarioDocenteForm