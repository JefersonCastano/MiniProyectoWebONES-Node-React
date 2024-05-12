import React from 'react'
import logo from '../assets/images/logo.png';
import logoSena from '../assets/images/logoSena.png';
import './styles/Home.css'

const Login = () => {
  return (
    <div className="homeBackground">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="text-center">
          
          <div className="d-flex align-items-center" style={{ marginBottom: '50px' }}>
            <img src={logoSena} alt="logo" width="100" className="align-text-top" />
            <div style={{ borderLeft: '1px solid black', height: '100px', margin: '0 20px' }}></div>
            <h4>Servicio Nacional de  <br/> Aprendizaje</h4>
          </div>
          
          <img src={logo} alt="logo" width="100" className="img-fluid" />
          <h1 className="display-1 fw-bold title">ONES</h1>
          <p>Iniciar Sesión</p>

          <form>
            <div className="mb-3">
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Usuario" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login