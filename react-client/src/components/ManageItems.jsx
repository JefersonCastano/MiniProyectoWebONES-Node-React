import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCommonContext } from './CommonContext';

const ManageItems = ({ form, text }) => {

    const navigate = useNavigate();
    const { state, states, updateState, setSelectedItem } = useCommonContext();

    const handleNewItem = () => {
        if (state != states.adding) {
            updateState(states.adding);
            setSelectedItem('');
        } else {
            updateState(states.closed);
        }
    }
    const handleEdit = () => {
        updateState(states.editing);
    }
    const handleExit = () => {
        updateState(states.closed);
        setSelectedItem('');
    }

    return (
        <div>
            <button type="button" className={`btn d-flex align-items-center mb-3 ${state == states.adding ? 'btn-secondary' : 'btn-primary'}`} onClick={handleNewItem}>
                <i className="bx bx-plus fs-5 me-1"></i>
                Nuevo {text.button}
            </button>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">
                            {
                                state == states.closed ? `Elige un ${text.message} para ver su información` :
                                    state == states.adding ? `Agrega un nuevo ${text.message}` :
                                        state == states.editing ? `Edita un ${text.message}` :
                                            state == states.consulting ? `Información del ${text.message}` : ""
                            }
                        </span>
                        {
                            state == states.consulting && <button type="button" className="btn-close" aria-label="Close" onClick={handleExit}></button>
                        }
                    </div>
                    {state != states.closed && form}
                    <div className="d-flex justify-content-end">
                        {
                            state == states.consulting && text.button == "Programa" &&
                            <div className="text-end me-2">
                                <button type="button" className="btn btn-warning" onClick={()=>navigate('/competencias')}>Gestionar Competencias</button>
                            </div>
                        }
                        {
                            state == states.consulting &&
                            <div className="text-end">
                                <button type="button" className="btn btn-warning" onClick={handleEdit}>Actualizar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageItems