import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getAllDocentes() {
    try {
        const response = await Axios.get(`${API_URL}/docentes`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get Docentes error: ", error);
            }
        } else {
            console.log("Get Docentes error: ", error);
        }
        return [];
    }
}

export async function getDocenteById(id) {
    try {
        const response = await Axios.get(`${API_URL}/docentes/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get docente by id error: ", error);
            }
        } else {
            console.log("Get docente by id error: ", error);
        }
        return false;
    }
}

export async function createDocente(docente) {
    try {
        const response = await Axios.post(`${API_URL}/docentes`, docente);
        showSuccessMessage("Registro exitoso", "El docente se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo crear el docente. Intente de nuevo", error);
                console.log("Create docente error: ", error);
            }
        } else {
            console.log("Create docente error: ", error);
        }
        return false;
    }
}

export async function updateDocente(id, docente) {
    try {
        const response = await Axios.put(`${API_URL}/docentes/${id}`, docente);
        showSuccessMessage("Actualización exitosa", "El docente se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo actualizar el docente. Intente de nuevo", error);
                console.log("Update docente error: ", error);
            }
        } else {
            console.log("Update docente error: ", error);
        }
        return false;
    }
}

export async function changeDocenteActiveState(id, newState) {
    try {
        const response = await Axios.put(`${API_URL}/docentes/${id}/state`, { newState: newState });
        if (newState) {
            showSuccessMessage("Activación exitosa", "El docente se ha activado correctamente.");
        } else {
            showSuccessMessage("Desactivación exitosa", "El docente se ha desactivado correctamente.");
        }
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la acción. Intente de nuevo.", error);
                console.log("Change docente active state error: ", error);
            }
        } else {
            console.log("Change docente active state error: ", error);
        }
        return false;
    }
}