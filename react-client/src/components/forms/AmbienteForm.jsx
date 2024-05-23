import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCommonContext } from '../CommonContext';

const AmbienteForm = () => {

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
      setValue('ambiente_nombre', selectedItemInfo.ambiente_nombre);
      setValue('ambiente_ubicacion', selectedItemInfo.ambiente_ubicacion);
      setValue('ambiente_capacidad', selectedItemInfo.ambiente_capacidad);
      setValue('ambiente_tipo', selectedItemInfo.ambiente_tipo);
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
          setSelectedItem(result.ambiente_id);
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
        <input type="text" className="form-control" id="nombre" aria-describedby="nombre" {...register('ambiente_nombre', {
          required: {
            value: true,
            message: "El nombre es requerido"
          }
        })} disabled={state == states.consulting} />
        <div className="invalid-feedback d-block">
          {errors.ambiente_nombre && errors.ambiente_nombre.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="ubicacion" className="form-label">Ubicación</label>
        <input type="text" className="form-control" id="ubicacion" aria-describedby="ubicacion" {...register('ambiente_ubicacion', {
          required: {
            value: true,
            message: "La ubicación es requerida"
          }
        }
        )} disabled={state == states.consulting} />
        <div className="invalid-feedback d-block">
          {errors.ambiente_ubicacion && errors.ambiente_ubicacion.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="capacidad" className="form-label">Capacidad</label>
        <input type="text" className="form-control" id="capacidad" aria-describedby="capacidad" {...register('ambiente_capacidad', {
          required: {
            value: true,
            message: "La capacidad es requerida"
          },
          pattern: {
            value: /^[0-9]+$/,
            message: "La capacidad debe ser un número"
          }
        }
        )} disabled={state == states.consulting} />
        <div className="invalid-feedback d-block">
          {errors.ambiente_capacidad && errors.ambiente_capacidad.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="tipoAmbiente" className="form-label">Tipo de Ambiente</label>
        <select id="tipoAmbiente" className="form-select" aria-label="tipo ambiente" {...register('ambiente_tipo', {
          validate: value => value != "-1" || "El tipo del ambiente es requerido"
        })} disabled={state == states.consulting}>
          <option value="-1">Seleccione una opción</option>
          <option value="PRESENCIAL">Presencial</option>
          <option value="VIRTUAL">Virtual</option>
        </select>
        <div className="invalid-feedback d-block">
          {errors.ambiente_tipo && errors.ambiente_tipo.message}
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

export default AmbienteForm