import axios from 'axios';
import { API_URL } from '../../auth/config';
import { showErrorMessage } from '../../utilities/Messages';

export async function getUserData(accessToken) {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log("Get user data error: ", error);
        return null;
    }
}