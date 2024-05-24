import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import { useCommonHorarioContext } from './CommonHorarioContext';
import { showConfirmationMessageHorario } from '../../utilities/Messages';
import * as horarioRoutes from '../../api/horarioRoutes';

const ManageHorario = () => {

    const auth = useAuth();
    horarioRoutes.setToken(auth.getAccessToken());

    const { state, states, setState,
        horario, setHorario,
        datosHorario, setDatosHorario,
        setError, setErrorMessage, setShowMessage,
        getHorarios
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
            setError("Datos Incompletos");
            setErrorMessage("Por favor, ingresa los datos necesarios para crear un nuevo horario.");
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
            if (response) {
                setHorario(response);
                setState(states.consulting);
            }
        } else {
            setError("No se puede guardar el horario");
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
            getHorarios(datosHorario.periodo_id, datosHorario.docente_id, "", false);
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