import React from 'react'
import { useContext, createContext, useState, useEffect } from 'react'
import { getUserData } from '../api/authRoutes/userRoutes';
import loading from '../assets/img/loading.png';

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: (userData) => { },
    getUser: () => { },
    logout: () => { },
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, [])

    async function checkAuth() {
        if (accessToken) {
            //El usuario esta autenticado
            const userData = await getUserData(accessToken);
            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
            }
        } else {
            //El usuario no esta autenticado
            const token = getAccessTokenLocalStorage();
            if (token) {
                const userData = await getUserData(token);
                if (userData) {
                    setUser(userData);
                    setAccessToken(token);
                    setIsAuthenticated(true);
                }
            }
        }
        setIsLoading(false);
    }

    function saveUser(userData) {
        setAccessToken(userData.token);
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(userData.token));
    }

    function logout() {
        setAccessToken("");
        setUser({});
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }

    function getAccessTokenLocalStorage() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                return JSON.parse(token);
            } catch (error) {
                console.error('Error parsing token:', error);
                return null;
            }
        }
        return null;
    }

    function getAccessToken() {
        return accessToken;
    }

    function getUser() {
        return user;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getUser, logout }}>
            {isLoading ?
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <img src={loading} alt="logo" width="100" className="img-fluid mt-4" />
                </div>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider
