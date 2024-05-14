import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'
import { login } from '../../api/loginRoutes';
import logo from '../../assets/img/logo.png';
import logoSena from '../../assets/img/logoSena.png';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  const camposVacios = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      setError('Por favor, ingrese un usuario y contraseña');
      return true;
    } else {
      setValidated(false)
    }
    return false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (camposVacios(event)) return;

    login(username, password).then(json => {
      if (json.status === "OK") {
        setError('');
        const user = json.data;
        if (user.token) {
          auth.saveUser({id: user.id, role: user.role, token: user.token, username: user.username});
          if (user.role === 'COORDINADOR'){
            navigate('/horarios');
          }
          else if (user.role === 'DOCENTE') {
            navigate('/informacion-personal');
          }
        }
      } else {
        setError(json.data.error);
      }
    }).catch((error) => console.log(error));
  };


  if (auth.isAuthenticated && auth.getUser()?.role === 'COORDINADOR') {
    return <Navigate to="/programas" />;
  }
  if (auth.isAuthenticated && auth.getUser()?.role === 'DOCENTE') {
    return <Navigate to="/informacion-personal" />;
  }
  return (
    <div className="homeBackground">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
        <div className="text-center">

          <div className="d-flex align-items-center" style={{ marginBottom: '50px' }}>
            <img src={logoSena} alt="logo" width="100" className="align-text-top" />
            <div style={{ borderLeft: '1px solid black', height: '100px', margin: '0 20px' }}></div>
            <h4>Servicio Nacional de  <br /> Aprendizaje</h4>
          </div>

          <img src={logo} alt="logo" width="100" className="img-fluid" />
          <h1 className="display-1 fw-bold title">ONES</h1>
          <p>Iniciar Sesión</p>

          <form className={`${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit} >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <div className="text-danger">
              {error}
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login