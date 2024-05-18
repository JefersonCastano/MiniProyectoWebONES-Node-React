import React from 'react'
import { useLocation } from 'react-router-dom';
import { coordinador_routes } from '../auth/coordinadorRoutes'
import { coordinador_pages } from '../auth/coordinadorRoutes'
import { coordinador_icons } from '../auth/coordinadorRoutes'
import { docente_routes } from '../auth/docenteRoutes'
import { docente_pages } from '../auth/docenteRoutes'
import { docente_icons } from '../auth/docenteRoutes'
import Account from './Account'
import Navbar from './Navbar'

const DefaultLayout = ({ children, rol }) => {

    const location = useLocation();
    const actualLocation = location.pathname;
    let navItems = null;
    let title = "Página no encontrada";

    const navCoor = coordinador_pages.map((x, index) => {
        return { page: x, route: coordinador_routes[index].path, icon: coordinador_icons[index] };
    });
    const navDoc = docente_pages.map((x, index) => {
        return { page: x, route: docente_routes[index].path, icon: docente_icons[index] };
    });

    navItems = rol == "COORDINADOR" ? navCoor : navDoc;
    title = navItems.find(item => item.route == actualLocation).page;

    
    return (
        <div>
            <Navbar items={navItems} />
            <main id="main">
                <div className="container p-3 mx-1.5">
                    <div className="mt-4 mb-4 ">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className='text-dark'>{title}</h1>
                            <Account />
                        </div>
                    </div>
                    {children}
                </div>
            </main>
        </div >
    )
}

export default DefaultLayout