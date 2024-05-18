import Axios from 'axios';
import { API_URL } from "../auth/config";
import { showSuccessMessage, showFailedMessage, showErrorMessage } from '../utilities/Messages';

export function setToken(token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getAllPeriodosAcademicos(){
    try {
        const response = await Axios.get(`${API_URL}/periodos_academicos`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get periodos academicos error: ", error);
            }
        } else {
            console.log("Get periodos academicos error: ", error);
        }
        return [];
    }
}

export async function getPeriodoAcademicoById(id) {
    try {
        const response = await Axios.get(`${API_URL}/periodos_academicos/${id}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la consulta. Intente de nuevo.", error);
                console.log("Get periodo academico by id error: ", error);
            }
        } else {
            console.log("Get periodo academico by id error: ", error);
        }
        return false;
    }
}

export async function createPeriodoAcademico(periodoAcademico) {
    try {
        const response = await Axios.post(`${API_URL}/periodos_academicos`, periodoAcademico);
        showSuccessMessage("Registro exitoso", "El periodo académico se ha registrado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo crear el periodo académico. Intente de nuevo", error);
                console.log("Create periodo academico error: ", error);
            }
        } else {
            console.log("Create periodo academico error: ", error);
        }
        return false;
    }
}

export async function updatePeriodoAcademico(id, periodoAcademico) {
    try {
        const response = await Axios.put(`${API_URL}/periodos_academicos/${id}`, periodoAcademico);
        showSuccessMessage("Actualización exitosa", "El periodo académico se ha actualizado correctamente.");
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo actualizar el periodo académico. Intente de nuevo", error);
                console.log("Update periodo academico error: ", error);
            }
        } else {
            console.log("Update periodo academico error: ", error);
        }
        return false;
    }
}

export async function changePeriodoAcademicoActiveState(id, newState){
    try {
        const response = await Axios.put(`${API_URL}/periodos_academicos/${id}/state`, {periodo_activo: newState});
        if (newState) {
            showSuccessMessage("Activación exitosa", "El periodo académico se ha activado correctamente.");
        } else {
            showSuccessMessage("Desactivación exitosa", "El periodo académico se ha desactivado correctamente.");
        }
        return response.data.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                showFailedMessage("Error", error.response.data.data.error);
            } else {
                showErrorMessage("Error", "No se pudo realizar la acción. Intente de nuevo.", error);
                console.log("Change periodo academico active state error: ", error);
            }
        } else {
            console.log("Change periodo academico active state error: ", error);
        }
        return false;
    }
}