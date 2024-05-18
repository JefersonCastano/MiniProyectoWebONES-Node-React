import React from 'react'
import { useAuth } from '../auth/AuthProvider'

const PortalLayout = () => {

    const auth = useAuth();

    function handleLogOut(e) {
        e.preventDefault();
        auth.logout();
    }

    return (
        <div className="dropdown">
            <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{outline: 'none'}}>
                <i className="bx bx-user fs-1"></i>
            </button>
            <ul className="dropdown-menu">
                <li ><span className="dropdown-item text-dark fw-bold disabled" >{auth.getUser().username}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <a className="dropdown-item d-flex align-items-center" href="#" onClick={handleLogOut}>
                        <i className="bx bx-log-out-circle fs-5 me-1"></i>
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default PortalLayout