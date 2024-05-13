import React from 'react'
import { useContext, createContext, useState, useEffect } from 'react'
import { API_URL } from './config';

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: (userData) => { },
});
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {

    }, [])

    async function getUserData(accessToken) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                const json = await response.json();
                return json.data;
            } else {
                throw new Error(json.data.error);
            }
        } catch (error) {
            console.log('Error al obtener los datos del usuario');
            return null;
        }
    }
    async function checkAuth() {
        if (accessToken) {
            //El usuario esta autenticado
            setIsAuthenticated(true);
        } else {
            //El usuario no esta autenticado
            const token = getAccessTokenLocalStorage();
            if (token) {
                const userData = await getUserData(token);
                if (userData) {
                    saveUser(userData);
                }
            }
        }
    }

    function getAccessToken() {
        return accessToken;
    }
    function getAccessTokenLocalStorage() {
        const token = localStorage.getItem('token');
        if (token) {
            return JSON.parse(token);
        }
        return null;
    }

    function saveUser(userData) {
        setAccessToken(userData.token);
        setUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem('token', JSON.stringify(userData.token));
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);