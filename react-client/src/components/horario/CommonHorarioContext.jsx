import React from 'react'
import { createContext, useContext, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { setToken, getHorarioByPerAndDocId } from '../../api/horarioRoutes';
import ToastBS from '../bootstrap/ToastBS';

const commonHorarioContext = createContext({
    state: "",
    states: {},
    setState: () => { },
    horario: {},
    setHorario: () => { },
    franjaActual: {},
    setFranjaActual: () => { },
    datosHorario: {},
    setDatosHorario: () => { },
    setError: () => { },
    setErrorMessage: () => { },
    setShowMessage: () => { },
    getHorarios: () => { }
});

export const useCommonHorarioContext = () => useContext(commonHorarioContext);

const CommonHorarioContext = ({ children }) => {

    const auth = useAuth();
    setToken(auth.getAccessToken());

    const [horario, setHorario] = useState({});
    const [franjaActual, setFranjaActual] = useState({});
    const [datosHorario, setDatosHorario] = useState({});

    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const states = {
        blocked: "blocked",
        new: "new",
        adding: "adding",
        editing: "editing",
        consulting: "consulting"
    };

    const [state, setState] = useState(states.blocked);

    const getHorarios = async (perId, docId, errorMessage, showGetMessage) => {
        const horarioResponse = await getHorarioByPerAndDocId(perId, docId);
        if (horarioResponse) {
            if (!horarioResponse.error) {
                setHorario(horarioResponse);
                setState(states.consulting);
                if (showGetMessage) {
                    setError("Horario encontrado");
                    setErrorMessage("Puedes consultar la información de cada materia seleccionándola");
                    setShowMessage(true);
                }
            } else {
                setHorario({});
                setState(states.new);

                if (showGetMessage) {
                    setError(horarioResponse.error);
                    setErrorMessage(errorMessage);
                    setShowMessage(true);
                }
            }
        }
    }

    return (
        <commonHorarioContext.Provider value={{
            state, states, setState,
            horario, setHorario,
            franjaActual, setFranjaActual,
            datosHorario, setDatosHorario,
            setError, setErrorMessage, setShowMessage,
            getHorarios
        }}>
            <ToastBS show={showMessage} toggleShow={() => setShowMessage(false)} title={error} message={errorMessage} />
            {children}
        </commonHorarioContext.Provider>
    )
}

export default CommonHorarioContext