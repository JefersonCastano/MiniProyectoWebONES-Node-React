import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCommonContext } from '../items/CommonContext';

const ProgramaForm = () => {

    const { state, states, updateState,
        selectedItem, setSelectedItem,
        selectedItemInfo, setSelectedItemInfo,
        getItems, getItemBy,
        createItem, updateItem } = useCommonContext();

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm();
    
    const [competencias, setCompetencias] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (state == states.consulting || state == states.editing) {
            reset();
            setValue('programa_nombre', selectedItemInfo.programa_nombre);
            setCompetencias(selectedItemInfo.competencias);
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
                    setSelectedItem(result.programa_id);
                    setSelectedItemInfo(result);
                } else setError(true);
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
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" aria-describedby="nombre" {...register('programa_nombre', {
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    }
                })} disabled={state == states.consulting} />
                <div className="invalid-feedback d-block">
                    {errors.programa_nombre && errors.programa_nombre.message}
                </div>
            </div>
            {
                state == states.consulting &&
                <div className="mb-3">
                    <label htmlFor="competencias" className="form-label">Competencias</label>
                    <div className="card fixed-height-card">
                        <ul className="list-group list-group-flush">
                            {
                                competencias?.map((competencia, index) => (
                                    <li key={index} className="list-group-item">{competencia.competencia_nombre}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
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

export default ProgramaForm