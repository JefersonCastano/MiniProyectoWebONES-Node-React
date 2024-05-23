import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getHorarioByPerAndDocId(perId, docId) {
    try {
        const response = await Axios.get(`${API_URL}/horarios/${perId}/${docId}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                return error.response.data.data;
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get Horario by Periodo and Docente Id error: ", error);
            }
        } else {
            console.log("Get Horario by Periodo and Docente Id error: ", error);
        }
        return false;
    }
}

export async function createHorario(horario) {
    try {
        const response = await Axios.post(`${API_URL}/horarios`, horario);
        showSuccessMessage("Registro exitoso", "El horario se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                return error.response.data.data;
            } else {
                showErrorMessage("Error", "No se pudo crear el horario. Intente de nuevo", error);
                console.log("Create horario error: ", error);
            }
        } else {
            console.log("Create horario error: ", error);
        }
        return false;
    }
}

export async function updateHorario(perId, docId, horario) {
    try {
        const response = await Axios.put(`${API_URL}/horarios/${perId}/${docId}`, horario);
        showSuccessMessage("Actualización exitosa", "El horario se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                return error.response.data.data;
            } else {
                showErrorMessage("Error", "No se pudo actualizar el horario. Intente de nuevo", error);
                console.log("Update horario error: ", error);
            }
        } else {
            console.log("Update horario error: ", error);
        }
        return false;
    }
}

export async function deleteHorario(perId, docId) {
    try {
        const response = await Axios.delete(`${API_URL}/horarios/${perId}/${docId}`);
        showSuccessMessage("Eliminación exitosa", "El horario se ha eliminado correctamente.");
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo eliminar el horario. Intente de nuevo", error);
                console.log("Delete horario error: ", error);
            }
        } else {
            console.log("Delete horario error: ", error);
        }
        return false;
    }
}

export async function getAllAmbientesDisponibles(perId, dia, horaInicio) {
    try {
        const response = await Axios.get(`${API_URL}/horarios/${perId}/ambientes/${dia}/${horaInicio}`);
        return response.data.data;
    } catch (error) {
        console.log("Get Ambientes disponibles error: ", error);
        return [];
    }
}