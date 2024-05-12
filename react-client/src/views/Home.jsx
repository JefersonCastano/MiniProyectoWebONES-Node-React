import React from 'react'
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };
  return (
    <div className="homeBackground">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="text-center col-md-8">
          <img src={logo} alt="logo" width="100" className="img-fluid"/>
          <h1 className="display-1 fw-bold title">ONES</h1>
          <p className="lead fs-1 fw-bold">Gestión de horarios al alcance de tus manos</p>
          <p>Facilitamos la labor educativa al proporcionar herramientas para la gestión
            ágil de horarios, permitiéndole mantenerse organizado y enfocado en su misión
            de enseñar y aprender con eficacia.</p>
          <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Comencemos</button>
        </div>
      </div>
    </div>
  )
}

export default Home