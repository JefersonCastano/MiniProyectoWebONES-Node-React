import React, { useState, useEffect, createContext, useContext } from 'react'
import DefaultLayout from './DefaultLayout'
import { useAuth } from '../auth/AuthProvider';
import HorarioComponent from './HorarioComponent';
import ConsultaHorarioForm from './forms/ConsultaHorarioForm';
import ToastBS from './Bootstrap/ToastBS';
import * as horarioRoutes from '../api/horarioRoutes';


const commonHorarioContext = createContext({
    state: "",
    states: {},
    setState: () => { },
    horario: {},
    setHorario: () => { },
    franjaActual: {},
    setFranjaActual: () => { },
    setDatosHorario: () => { },
    setErrorMessage: () => { },
    setError: () => { },
    setShowMessage: () => { },
    getHorarios: () => { }
});

export const useCommonHorarioContext = () => useContext(commonHorarioContext);

const CommonHorarioContext = ({ children }) => {
    const auth = useAuth();
    horarioRoutes.setToken(auth.getAccessToken());

    const [horario, setHorario] = useState({});
    const [franjaActual, setFranjaActual] = useState({});
    const [datosHorario, setDatosHorario] = useState({});

    const states = {
        blocked: "blocked",
        new: "new",
        adding: "adding",
        editing: "editing",
        consulting: "consulting"
    };

    const [state, setState] = useState(states.blocked);
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const getHorarios = async (perId, docId, errorMessage) => {
        const horarioResponse = await horarioRoutes.getHorarioByPerAndDocId(perId, docId);
        if (horarioResponse) {
            if (!horarioResponse.error) {
                setHorario(horarioResponse);
                setState(states.consulting);

                setError("Horario encontrado");
                setErrorMessage("Puedes consultar la información de cada materia seleccionándola");
                setShowMessage(true);
            } else {
                setState(states.new);
                setError(horarioResponse.error);
                setErrorMessage(errorMessage);
                setHorario({});
                setShowMessage(true);
            }
        }
    }
    
    return (
        <commonHorarioContext.Provider value={{
            state, states, setState,
            horario, setHorario,
            franjaActual, setFranjaActual,
            datosHorario, setDatosHorario,
            setErrorMessage, setError, setShowMessage,
            showMessage, error, errorMessage, setErrorMessage, getHorarios
        }}>
            <ToastBS show={showMessage} toggleShow={() => setShowMessage(false)} title={error} message={errorMessage} />
            {children}
        </commonHorarioContext.Provider>
    )
}

export default CommonHorarioContext