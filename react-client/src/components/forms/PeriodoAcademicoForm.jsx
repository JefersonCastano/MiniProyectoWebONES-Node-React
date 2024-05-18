import React from 'react'
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useCommonContext } from '../CommonContext';
import { set, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const PeriodoAcademicoForm = () => {

    const { state, states, updateState,
        selectedItem, setSelectedItem,
        selectedItemInfo, setSelectedItemInfo,
        getItems, getItemBy,
        createItem, updateItem } = useCommonContext();

    const { register, handleSubmit, setValue, reset, watch, formState: { errors, isValid } } = useForm();

    const [initialDate, setInitialDate] = useState(null)
    const [finalDate, setFinalDate] = useState(null)
    const duracion = watch('periodo_duracion');

    const [validateInitialDate, setValidateInitialDate] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (state == states.consulting || state == states.editing) {
            reset();
            const startDate = dayjs(selectedItemInfo.periodo_fecha_ini, 'YYYY-MM-DD');
            const endDate = dayjs(selectedItemInfo.periodo_fecha_fin, 'YYYY-MM-DD');
            const duracion = endDate.diff(startDate, 'month');

            setValue('periodo_nombre', selectedItemInfo.periodo_nombre);
            setValue('periodo_duracion', duracion);
            setInitialDate(dayjs(selectedItemInfo.periodo_fecha_ini, 'YYYY-MM-DD'));
        } else {
            if (!error) {
                reset();
                setInitialDate(null);
                setFinalDate(null);
            }
            setError(false);
            setValidateInitialDate(false);
        }
    }, [updateState]);

    useEffect(() => {
        if (duracion != "-1" && initialDate != null) {
            setFinalDate(initialDate.add(duracion, 'month'));
        } else {
            setFinalDate(null);
        }
    }, [duracion, initialDate]);

    const onSubmit = handleSubmit(async (data, e) => {
        e.preventDefault();
        if (isValid && initialDate != null) {
            data.periodo_fecha_ini = initialDate.format('YYYY-MM-DD');
            data.periodo_fecha_fin = finalDate.format('YYYY-MM-DD');
            if (state == states.adding) {
                console.log(data);
                const result = await createItem(data);
                if (result) {
                    setSelectedItem(result.periodo_id);
                    setSelectedItemInfo(result);
                }else setError(true);
            } else if (state == states.editing) {
                const result = await updateItem(data);
                if (result) await getItemBy(selectedItem);
            }
            await getItems();
        }
    });

    const handleCancel = () => {
        if (state == states.adding) {
            updateState(states.closed);
        } else if (state == states.editing) {
            updateState(states.consulting);
        }
    };

    return (
        <form className="mt-2" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" aria-describedby="nombre" {...register('periodo_nombre', {
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    }
                })} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.periodo_nombre && errors.periodo_nombre.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="duracion" className="form-label">Duración</label>
                <select id="duracion" className="form-select" aria-label="duracion" {...register('periodo_duracion', {
                    validate: value => value != "-1" || "La duración es requerida"
                })} disabled={state == states.consulting}>
                    <option value="-1">Seleccione una opción</option>
                    <option value="3">3 meses</option>
                    <option value="4">4 meses</option>
                    <option value="5">5 meses</option>
                    <option value="6">6 meses</option>
                </select>
                <div className="invalid-feedback d-block">
                    {errors.periodo_duracion && errors.periodo_duracion.message}
                </div>
            </div>
            <div className="mb-3">
                <div className="row">
                    <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                </div>
                <div className="row mx-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            disabled={state == states.consulting}
                            openTo='year'
                            format='DD/MM/YYYY'
                            value={initialDate}
                            onChange={(newValue) => { setInitialDate(newValue) }}
                        />
                    </LocalizationProvider>
                </div>
                {
                    validateInitialDate && initialDate == null &&
                    <div className="invalid-feedback d-block">
                        La fecha de inicio es requerida
                    </div>
                }
            </div>
            <div className="mb-3">
                <div className="row">
                    <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                </div>
                <div className="row mx-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disabled
                            format='DD/MM/YYYY'
                            value={finalDate}
                            onChange={(newValue) => { setFinalDate(newValue) }}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            {
                [states.adding, states.editing].includes(state) &&
                <div className="text-end">
                    <button type="submit" className="btn btn-primary me-2" onClick={()=>{setValidateInitialDate(true)}}>Guardar</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            }
        </form>
    )
}

export default PeriodoAcademicoForm