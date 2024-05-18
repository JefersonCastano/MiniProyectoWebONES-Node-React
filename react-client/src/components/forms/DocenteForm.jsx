import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCommonContext } from '../CommonContext';

const DocenteForm = () => {

    const { state, states, updateState,
        selectedItem, setSelectedItem,
        selectedItemInfo, setSelectedItemInfo,
        getItems, getItemBy,
        createItem, updateItem } = useCommonContext();

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm();

    const [error, setError] = useState(false);

    useEffect(() => {
        if (state == states.consulting || state == states.editing) {
            reset();
            setValue('docente_nombres', selectedItemInfo.docente_nombres);
            setValue('docente_apellidos', selectedItemInfo.docente_apellidos);
            setValue('docente_tipoidentificacion', selectedItemInfo.docente_tipoidentificacion);
            setValue('docente_identificacion', selectedItemInfo.docente_identificacion);
            setValue('docente_tipo', selectedItemInfo.docente_tipo);
            setValue('docente_tipocontrato', selectedItemInfo.docente_tipocontrato);
            setValue('docente_area', selectedItemInfo.docente_area);
        } else {
            if (!error) reset();
            setError(false);
        }
    }, [updateState]);

    const onSubmit = handleSubmit(async (data, e) => {
        e.preventDefault();
        if (isValid) {
            if (state == states.adding) {
                const result = await createItem(data);
                if (result) {
                    setSelectedItem(result.docente_id);
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
    }

    return (
        <form className="mt-2" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" id="nombre" aria-describedby="nombre" {...register('docente_nombres', {
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    }
                })} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.docente_nombres && errors.docente_nombres.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellidos(s)</label>
                <input type="text" className="form-control" id="apellido" aria-describedby="apellido" {...register('docente_apellidos', {
                    required: {
                        value: true,
                        message: "El apellido es requerido"
                    }
                }
                )} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.docente_apellidos && errors.docente_apellidos.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="tipoIdentificacion" className="form-label">Tipo Identificación</label>
                <select id="tipoIdentificacion" className="form-select" aria-label="tipo identificacion" {...register('docente_tipoidentificacion', {
                    validate: value => value != "-1" || "El tipo de identificación es requerido"
                })} disabled={state == states.consulting}>
                    <option value="-1">Seleccione una opción</option>
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="PAS">PAS</option>
                    <option value="TE">TE</option>
                </select>
                <div className="invalid-feedback d-block">
                    {errors.docente_tipoidentificacion && errors.docente_tipoidentificacion.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="identificacion" className="form-label">Identificación</label>
                <input type="text" className="form-control" id="identificacion" aria-describedby="identificacion" {...register('docente_identificacion', {
                    required: {
                        value: true,
                        message: "La identificación es requerida"
                    }
                })} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.docente_identificacion && errors.docente_identificacion.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="tipoDocente" className="form-label">Tipo Docente</label>
                <select id="tipoDocente" className="form-select" aria-label="tipo docente" {...register('docente_tipo', {
                    validate: value => value != "-1" || "El tipo de docente es requerido"
                })} disabled={state == states.consulting}>
                    <option value="-1">Seleccione una opción</option>
                    <option value="PROFESIONAL">Profesional</option>
                    <option value="TECNICO">Técnico</option>
                </select>
                <div className="invalid-feedback d-block">
                    {errors.docente_tipo && errors.docente_tipo.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="tipoContrato" className="form-label">Tipo Contrato</label>
                <select id="tipoContrato" className="form-select" aria-label="tipo contrato" {...register('docente_tipocontrato', {
                    validate: value => value != "-1" || "El tipo de contrato es requerido"
                })} disabled={state == states.consulting}>
                    <option value="-1">Seleccione una opción</option>
                    <option value="CNT">CNT - Contratista</option>
                    <option value="PT">PT - Planta</option>
                </select>
                <div className="invalid-feedback d-block">
                    {errors.docente_tipocontrato && errors.docente_tipocontrato.message}
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="area" className="form-label">Área</label>
                <input type="text" className="form-control" id="area" aria-describedby="area" {...register('docente_area', {
                    required: {
                        value: true,
                        message: "El área es requerida"
                    }
                })} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.docente_area && errors.docente_area.message}
                </div>
            </div>

            {
                [states.adding, states.editing].includes(state) &&
                <div className="text-end">
                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>Cancelar</button>
                </div>
            }
        </form>
    )
}

export default DocenteForm