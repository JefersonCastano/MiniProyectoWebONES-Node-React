import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useCommonContext } from '../CommonContext';
import SearchableDropdown from '../SearchableDropdown';
import { getAllProgramas } from '../../api/programaRoutes';

const CompetenciaForm = () => {

  const { state, states, updateState,
    selectedItem, setSelectedItem,
    selectedItemInfo, setSelectedItemInfo,
    getItems, getItemBy,
    createItem, updateItem } = useCommonContext();

  const { register, handleSubmit, setValue, reset, watch, control, formState: { errors, isValid } } = useForm();

  const [tipoCompetencia, setTipoCompetencia] = useState("");
  const [programas, setProgramas] = useState([]);
  const programaIds = programas.map(programa => programa.programa_id);

  const [error, setError] = useState(false);

  const keys = { id: 'programa_id', name: 'programa_nombre' };

  const getProgramas = async () => {
    const programasResult = await getAllProgramas();
    if (programasResult) {
      setProgramas(programasResult);
    }
  }

  useEffect(() => {
    getProgramas();
  }, []);

  useEffect(() => {
    if (state == states.consulting || state == states.editing) {
      reset();
      setValue('competencia_id', selectedItemInfo.competencia_id);
      setValue('competencia_nombre', selectedItemInfo.competencia_nombre);
      setValue('competencia_tipo', selectedItemInfo.competencia_tipo);
      setValue('programa_id', selectedItemInfo.programa_id);
      setTipoCompetencia(selectedItemInfo.competencia_tipo);
    } else {
      if (!error) {
        reset();
        setValue('programa_id', "");
      }
      setError(false);
    }
  }, [updateState]);

  useEffect(() => {
    if (typeof watch('competencia_tipo') != "undefined" && watch('competencia_tipo') != "ESPECIFICA") {
      setTipoCompetencia("");
    }
  }, [watch('competencia_tipo')]);

  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();
    if (isValid) {
      if (state == states.adding) {
        const result = await createItem(data);
        if (result) {
          setSelectedItem(result.competencia_id);
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
        <label htmlFor="id" className="form-label">Id</label>
        <input type="text" className="form-control" id="id" aria-describedby="id" {...register('competencia_id', {
          required: {
            value: true,
            message: "El Id es requerido"
          }
        })} disabled={[states.consulting, states.editing].includes(state)} />
        <div className="invalid-feedback d-block">
          {errors.competencia_id && errors.competencia_id.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" aria-describedby="nombre" {...register('competencia_nombre', {
          required: "El nombre es requerido"

        })} disabled={state == states.consulting} />
        <div className="invalid-feedback d-block">
          {errors.competencia_nombre && errors.competencia_nombre.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="tipoCompetencia" className="form-label">Tipo Competencia</label>
        <select id="tipoCompetencia" className="form-select" aria-label="tipo competencia" {...register('competencia_tipo', {
          validate: value => value != "-1" || "El tipo de competencia es requerido"
        })} disabled={state == states.consulting}>
          <option value="-1">Seleccione una opción</option>
          <option value="ESPECIFICA">Especifica</option>
          <option value="GENERICA">Genérica</option>
        </select>
        <div className="invalid-feedback d-block">
          {errors.competencia_tipo && errors.competencia_tipo.message}
        </div>
      </div>
      {
        (watch('competencia_tipo') == "ESPECIFICA" || tipoCompetencia == "ESPECIFICA") &&
        <div className="mb-3">
          <label htmlFor="programa" className="form-label">Programa</label>
          <Controller
            name="programa_id"
            control={control}
            defaultValue=""
            rules={{
              required: "El programa es requerido",
              validate: value => programaIds.includes(value) || "Seleccione un programa válido"
            }}
            render={({ field }) =>
              <SearchableDropdown
                options={programas}
                value={field.value}
                setValue={field.onChange}
                disabled={state == states.consulting}
                keys={keys}
              />
            }
          />
          <div className="invalid-feedback d-block">
            {errors.programa_id && errors.programa_id.message}
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

export default CompetenciaForm