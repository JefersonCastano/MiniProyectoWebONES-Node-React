import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Navbar = ({ items }) => {

    const location = useLocation();
    const actualLocation = location.pathname;
    const [isMobileNav, setIsMobileNav] = React.useState(false);

    const handleMobileNav = () => {
        setIsMobileNav(!isMobileNav);
    }

    return (
        <div className={isMobileNav ? "mobile-nav-active" : ""}>
            {/* Mobile nav toggle button */}
            <div className="d-flex justify-content-start">
                <i className={`bi mobile-nav-toggle d-xl-none ${isMobileNav ? 'bi-x' : 'bi-list'}`} onClick={handleMobileNav}></i>
            </div>

            <header id="header" className="container m-0 p-0 border-0" >
                <div className="navBackground d-flex flex-column">

                    <div className="container d-flex align-items-center justify-content-bottom mt-4 mb-5 ms-3">
                        <img src={logo} alt="logo" width="45" className="img-fluid mr-2" />
                        <h2 className="display-6 fw-bold ">
                            <Link to="/horarios" className="text-decoration-none title">ONES</Link>
                        </h2>
                    </div>

                    <nav id="navbar" className="nav-menu navbar justify-content-bottom align-items-center ms-3" >
                        <ul>
                            {
                                items.map((item, index) => (
                                    <li key={index} className="mb-2">
                                        <Link to={item.route} className={`nav-link scrollto text-dark nav-link-custom ${item.route == actualLocation ? 'active' : ''}`}>
                                            <i className={`bx ${item.icon}`}></i>
                                            <span className="fs-5" style={{ fontFamily: 'Franklin Gothic Medium' }}>
                                                {item.page.split(' ').map((word, index, array) =>
                                                    array.length - 1 !== index ? (<React.Fragment key={index}> {word} <br /> </React.Fragment>) : word
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </header>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>
    )
}

export default Navbar