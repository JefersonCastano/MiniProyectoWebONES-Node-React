import React from 'react'
import { useCommonHorarioContext } from './CommonHorarioContext';
import { useAuth } from '../auth/AuthProvider';
import * as horarioRoutes from '../api/horarioRoutes';
import { showConfirmationMessageHorario } from '../utilities/Messages';

const ManageHorario = () => {

    const auth = useAuth();
    horarioRoutes.setToken(auth.getAccessToken());

    const { states, state, 
        horario, setHorario, 
        datosHorario, setDatosHorario, 
        setState, setError, setErrorMessage, setShowMessage
    } = useCommonHorarioContext();

    const handleNew = () => {
        if (state == states.new) {
            setHorario({});
            setHorario({
                ...datosHorario,
                horario_franjas: Array.from({ length: 6 }, (_, i) => ({
                    franja_dia: i + 1,
                    franjas: []
                }))
            });
            setState(states.adding);
        } else {
            setError("Espera!");
            setErrorMessage("Ingresa los datos para consultar un horario primero");
            setShowMessage(true);
        }
    }

    const handleSave = async () => {
        let response;
        if (state === states.adding) {
            response = await horarioRoutes.createHorario(horario);
        } else if (state === states.editing) {
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
            horario_franjas: Array.from({ length: 6 }, (_, i) => {
                const existingFranja = horario.horario_franjas.find(franja => franja.franja_dia === i + 1);
                return existingFranja ? existingFranja : { franja_dia: i + 1, franjas: [] };
            })
        });
        setState(states.editing);
    }

    const handleDelete = async () => {
        showConfirmationMessageHorario(async () => {
            const response = await horarioRoutes.deleteHorario(datosHorario.periodo_id, datosHorario.docente_id);
            if (response) {
                setState(states.blocked);
                setHorario({});
                setDatosHorario({});
            }
        });
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
        <div className="col-md-1 d-flex align-items-end mb-4">
            {[states.new, states.blocked].includes(state) && <button className="btn btn-primary" type="button" style={{ lineHeight: '1' }} onClick={handleNew}>Crear Horario</button>}
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
    )
}

export default ManageHorario