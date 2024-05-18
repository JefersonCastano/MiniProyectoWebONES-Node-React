import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider'
import logo from '../../assets/img/logo.png';
import error404 from '../../assets/img/error404.png';

const NotFound = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleButton = () => {
        if (auth.isAuthenticated) {
            if (auth.getUser()?.role === 'COORDINADOR') {
                navigate('/horarios');
            }else if (auth.getUser()?.role === 'DOCENTE') {
                navigate('/informacion-personal');
            }else{
                navigate('*');
            }
        } else {
            navigate('/login');
        }
    }
    return (
        <div className="homeBackground">
            <div className="d-flex justify-content-center align-items-end">
                <img src={logo} alt="logo" width="80" className="img-fluid mt-4" />
                <h1 className="display-2 fw-bold title">ONES</h1>
            </div>
            <div className="d-flex justify-content-center align-items-end mt-4">
                <h1 className="display-5 d-flex flex-nowrap">
                    <p className="fw-bold title">Ups!</p>
                    <span> página NO encontrada</span>
                </h1>
            </div>
            <div className="d-flex justify-content-center align-items-end">
                <img src={error404} alt="logo" width="400" className="img-fluid mt-3" />
            </div>
            <div className="d-flex justify-content-center align-items-end mt-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleButton}>
                    Regresar
                </button>
            </div>
        </div>
    )
}

export default NotFound