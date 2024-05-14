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
            <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bx bx-user-circle fs-1"></i>
            </button>
            <ul className="dropdown-menu p-2">
                <li ><p className="dropdown-item fw-bold disabled" >{auth.getUser().username}</p></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogOut}>
                    Cerrar Sesión
                    <i className="bx bx-log-out fs-5"></i>
                </a>
                </li>
            </ul>
        </div>
    )
}

export default PortalLayout