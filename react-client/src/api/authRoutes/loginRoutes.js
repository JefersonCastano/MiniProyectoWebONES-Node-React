import Axios from 'axios';
import { API_URL } from "../../auth/config";
import { showErrorMessage } from '../../utilities/Messages';

export async function login(username, password) {
    try {
        const response = await Axios.post(`${API_URL}/users/login`, { username, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status >= 400 && error.response.status < 500) {
                return error.response.data;
            } else {
                showErrorMessage("Error", "Error en el servidor", error);
            }
        } else {
            console.log("Login error: ", error);
        }
        return null;
    }
}

