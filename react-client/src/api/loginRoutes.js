import { API_URL } from "../auth/config";
import Axios from 'axios';

export async function login(username, password) {
    try {
        const response = await Axios.post(`${API_URL}/login`, {username, password});
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.log(error);
        }
    }
}

