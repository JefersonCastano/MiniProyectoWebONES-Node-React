import Axios from 'axios';
import { API_URL } from "../auth/config";

export async function login(username, password) {
    try {
        const response = await Axios.post(`${API_URL}/users/login`, {username, password});
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
}

