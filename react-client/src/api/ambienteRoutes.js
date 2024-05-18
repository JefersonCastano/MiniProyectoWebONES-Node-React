import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getAllAmbientes() {
    try {
        const response = await Axios.get(`${API_URL}/ambientes`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get Ambientes error: ", error);
            }
        } else {
            console.log("Get Ambientes error: ", error);
        }
        return [];
    }
}

export async function getAmbienteById(id) {
    try {
        const response = await Axios.get(`${API_URL}/ambientes/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get ambiente by id error: ", error);
            }
        } else {
            console.log("Get ambiente by id error: ", error);
        }
        return false;
    }
}

export async function createAmbiente(ambiente) {
    try {
        const response = await Axios.post(`${API_URL}/ambientes`, ambiente);
        showSuccessMessage("Registro exitoso", "El ambiente se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo crear el ambiente. Intente de nuevo", error);
                console.log("Create ambiente error: ", error);
            }
        } else {
            console.log("Create ambiente error: ", error);
        }
        return false;
    }
}

export async function updateAmbiente(id, ambiente) {
    try {
        const response = await Axios.put(`${API_URL}/ambientes/${id}`, ambiente);
        showSuccessMessage("Actualización exitosa", "El ambiente se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo actualizar el ambiente. Intente de nuevo", error);
                console.log("Update ambiente error: ", error);
            }
        } else {
            console.log("Update ambiente error: ", error);
        }
        return false;
    }
}

export async function changeAmbienteActiveState(id, newState) {
    try {
        const response = await Axios.put(`${API_URL}/ambientes/${id}/state`, { newState: newState });
        if (newState) {
            showSuccessMessage("Activación exitosa", "El ambiente se ha activado correctamente.");
        } else {    
            showSuccessMessage("Desactivación exitosa", "El ambiente se ha desactivado correctamente.");
        }
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la acción. Intente de nuevo.", error);
                console.log("Change ambiente active state error: ", error);
            }
        } else {
            console.log("Change ambiente active state error: ", error);
        }
        return false;
    }
}