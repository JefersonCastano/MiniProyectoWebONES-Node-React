import axios from 'axios';
import { API_URL } from '../auth/config';

export async function getUserData(accessToken) {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.status === 200) {
            return response.data.data;
        } else {
            console.log(response.data.data.error);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error);
        }
        return null;
    }
}