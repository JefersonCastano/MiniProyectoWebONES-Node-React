import React from 'react'
import { useLocation } from 'react-router-dom';
import { coordinador_routes, coordinador_pages, coordinador_icons } from '../auth/coordinador/coordinadorRoutes'
import { docente_routes, docente_pages, docente_icons } from '../auth/docente/docenteRoutes'
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
                <div className="container  pt-2 pe-3">
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