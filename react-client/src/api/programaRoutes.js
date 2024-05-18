import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getAllProgramas() {
    try {
        const response = await Axios.get(`${API_URL}/programas`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get Programas error: ", error);
            }
        } else {
            console.log("Get Programas error: ", error);
        }
        return [];
    }
}

export async function getProgramaById(id) {
    try {
        const response = await Axios.get(`${API_URL}/programas/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get programa by id error: ", error);
            }
        } else {
            console.log("Get programa by id error: ", error);
        }
        return false;
    }
}

export async function createPrograma(programa) {
    try {
        const response = await Axios.post(`${API_URL}/programas`, programa);
        showSuccessMessage("Registro exitoso", "El programa se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo crear el programa. Intente de nuevo", error);
                console.log("Create programa error: ", error);
            }
        } else {
            console.log("Create programa error: ", error);
        }
        return false;
    }
}

export async function updatePrograma(id, programa) {
    try {
        const response = await Axios.put(`${API_URL}/programas/${id}`, programa);
        showSuccessMessage("Actualización exitosa", "El programa se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo actualizar el programa. Intente de nuevo", error);
                console.log("Update programa error: ", error);
            }
        } else {
            console.log("Update programa error: ", error);
        }
        return false;
    }
}