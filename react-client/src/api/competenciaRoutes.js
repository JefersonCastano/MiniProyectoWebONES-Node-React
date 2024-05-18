import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getAllCompetencias() {
    try {
        const response = await Axios.get(`${API_URL}/competencias`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get Competencias error: ", error);
            }
        } else {
            console.log("Get Competencias error: ", error);
        }
        return [];
    }
}

export async function getCompetenciaById(id) {
    try {
        const response = await Axios.get(`${API_URL}/competencias/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get competencia by id error: ", error);
            }
        } else {
            console.log("Get competencia by id error: ", error);
        }
        return false;
    }
}

export async function createCompetencia(competencia) {
    try {
        const response = await Axios.post(`${API_URL}/competencias`, competencia);
        showSuccessMessage("Registro exitoso", "La competencia se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo crear la competencia. Intente de nuevo", error);
                console.log("Create competencia error: ", error);
            }
        } else {
            console.log("Create competencia error: ", error);
        }
        return false;
    }
}

export async function updateCompetencia(id, competencia) {
    try {
        const response = await Axios.put(`${API_URL}/competencias/${id}`, competencia);
        showSuccessMessage("Actualización exitosa", "La competencia se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo actualizar la competencia. Intente de nuevo", error);
                console.log("Update competencia error: ", error);
            }
        } else {
            console.log("Update competencia error: ", error);
        }
        return false;
    }
}

export async function changeCompetenciaActiveState(id, newState){
    try {
        const response = await Axios.put(`${API_URL}/competencias/${id}/state`, { competencia_activo: newState });
        if (newState) {
            showSuccessMessage("Activación exitosa", "La competencia se ha activado correctamente.");
        } else {
            showSuccessMessage("Desactivación exitosa", "La competencia se ha desactivado correctamente.");
        }
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la acción. Intente de nuevo.", error);
                console.log("Change competencia active state error: ", error);
            }
        } else {
            console.log("Change competencia active state error: ", error);
        }
        return false;
    }
}

export async function getCompetenciasGenericas(){
    try {
        const response = await Axios.get(`${API_URL}/competencias/genericas`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get competencias genericas error: ", error);
            }
        } else {
            console.log("Get competencias genericas error: ", error);
        }
        return [];
    }
}

export async function getCompetenciasByProgramaId (id){
    try {
        const response = await Axios.get(`${API_URL}/competencias/programa/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get competencias by programa id error: ", error);
            }
        } else {
            console.log("Get competencias by programa id error: ", error);
        }
        return [];
    }
}