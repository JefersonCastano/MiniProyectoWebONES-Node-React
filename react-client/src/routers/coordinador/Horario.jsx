import React, { useState, useEffect, createContext, useContext } from 'react'
import { useAuth } from '../../auth/AuthProvider';

import DefaultLayout from '../../components/DefaultLayout'

import { showConfirmationMessageHorario } from '../../utilities/Messages';
import HorarioComponent from '../../components/HorarioComponent';
import ConsultaHorarioForm from '../../components/forms/ConsultaHorarioForm';
import * as horarioRoutes from '../../api/horarioRoutes';
import ToastBS from '../../components/Bootstrap/ToastBS';
import { getDocenteById } from '../../api/docenteRoutes';
import { set } from 'react-hook-form';

const horarioContext = createContext({
  state: "",
  states: {},
  setState: () => { },
  horario: {},
  setHorario: () => { },
  franjaActual: {},
  setFranjaActual: () => { },
  setDatosHorario: () => { },
  horasMaximas: "",
  setErrorMessage: () => { },
  setError: () => { },
  setShowMessage: () => { }
});

export const useHorarioContext = () => useContext(horarioContext);

const Horario = () => {
  const auth = useAuth();
  horarioRoutes.setToken(auth.getAccessToken());

  const [horario, setHorario] = useState({});
  const [franjaActual, setFranjaActual] = useState({});
  const [datosHorario, setDatosHorario] = useState({});
  const [horasMaximas, setHorasMaximas] = useState({});

  const states = {
    blocked: "blocked",
    new: "new",
    adding: "adding",
    editing: "editing",
    consulting: "consulting"
  };

  const horasTipoContrato = { PT: { max_dia: 8, max_semana: 32 }, CNT: { max_dia: 10, max_semana: 40 } }

  const [state, setState] = useState(states.blocked);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getHorasMaximas = async () => {
      const docente = await getDocenteById(datosHorario.docente_id);
      if (docente) setHorasMaximas(horasTipoContrato[docente.docente_tipocontrato]);
    }
    if (datosHorario.docente_id) getHorasMaximas();
  }, [datosHorario]);

  const handleNew = () => {
    setHorario({});
    setHorario({
      ...datosHorario,
      horario_franjas: Array.from({ length: 6 }, (_, i) => ({
        franja_dia: i + 1,
        franjas: []
      }))
    });
    setState(states.adding);
  }
  const handleSave = async () => {
    let response;
    if (state === states.adding) {
      response = await horarioRoutes.createHorario(horario);
    } else if (state === states.editing) {
      console.log(horario);
      response = await horarioRoutes.updateHorario(datosHorario.periodo_id, datosHorario.docente_id, horario);
    }
    if (!response.error) {
      setHorario(response);
      setState(states.consulting);
    } else {
      setError("Aún no!");
      setErrorMessage(response.error);
      setShowMessage(true);
    }
  }
  const handleUpdate = () => {
    setHorario({
      ...datosHorario,
      horario_franjas: Array.from({length: 6}, (_, i) => {
        const existingFranja = horario.horario_franjas.find(franja => franja.franja_dia === i + 1);
        return existingFranja ? existingFranja : { franja_dia: i + 1, franjas: [] };
      })
    });
    setState(states.editing);
  }
  const handleDelete = async () => {
    showConfirmationMessageHorario(async () => {
      const response = await horarioRoutes.deleteHorario(datosHorario.periodo_id, datosHorario.docente_id);
      if(response){
        setState(states.blocked);
        setHorario({});
        setDatosHorario({});
      }
    });
  }
  const getHorarios = async (perId, docId) => {
    const horarioResponse = await horarioRoutes.getHorarioByPerAndDocId(perId, docId);
    if (horarioResponse) {
      if (!horarioResponse.error) {
        setHorario(horarioResponse);
        setState(states.consulting);
        console.log(horarioResponse)
      } else {
        setState(states.new);
        setError(horarioResponse.error);
        setErrorMessage("Puedes crearlo ahora mismo ;)");
        setHorario({});
        setShowMessage(true);
      }
    }
  }
  const handleCancelar = () => {
    if (state == states.adding) {
      setHorario({});
      setState(states.new);
    } else if (state == states.editing) {
      setState(states.consulting);
    }
  }
  return (
    <DefaultLayout rol={auth.getUser().role}>
      <horarioContext.Provider value={{
        state, states, setState,
        horario, setHorario,
        franjaActual, setFranjaActual,
        datosHorario, setDatosHorario,
        horasMaximas,
        setErrorMessage, setError, setShowMessage
      }}>
        <div className="row g-3">
          <ToastBS show={showMessage} toggleShow={() => setShowMessage(false)} title={error} message={errorMessage} />
          <ConsultaHorarioForm getHorarios={getHorarios} />
          <div className="row mt-2">
            {/* <p>{JSON.stringify(horario)}</p> */}
            {/* <p>{JSON.stringify(franjaActual)}</p> */}
            {/* <p>{JSON.stringify(horasMaximas)}</p> */}
            <HorarioComponent />
            <div className="col-md-1 d-flex align-items-end mb-4">
              {state === states.new && <button className="btn btn-primary" type="button" style={{ lineHeight: '1' }} onClick={handleNew}>Crear Horario</button>}
              {[states.adding, states.editing].includes(state) &&
                <div className="d-flex flex-column align-items-center">
                  <button type="submit" className="btn btn-primary mb-2" onClick={handleSave}>Guardar</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={handleCancelar}>Cancelar</button>
                </div>
              }
              {state === states.consulting &&
                <div className="d-flex flex-column align-items-center">
                  <button type="button" className="btn btn-warning mb-2" onClick={handleUpdate}>Actualizar</button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                </div>
              }
            </div>
          </div>
        </div>
      </horarioContext.Provider>
    </DefaultLayout>
  );
}

export default Horario