import React, { useEffect } from 'react'
import { useAuth } from '../../auth/AuthProvider';
import fotoDocente from '../../assets/img/fotoDocente.jpg';
import DefaultLayout from '../../components/DefaultLayout'
import { setToken, getDocenteById } from '../../api/docenteRoutes';

const InfoDocente = () => {
  const auth = useAuth();

  setToken(auth.getAccessToken());

  const [user, setUser] = React.useState(auth.getUser());
  const [docente, setDocente] = React.useState({});

  const getDocente = async () => {
    const docenteData = await getDocenteById(user.id);
    if (docenteData) {
      setDocente(docenteData);
    }
  }

  useEffect(() => {
    setUser(auth.getUser());
    getDocente();
  }, [user]);

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <div className="row align-items-center">
        <div className="col-lg-3 ">
          <img src={fotoDocente} alt="logo" width="230" className="img-fluid " />
        </div>
        <div className="col-lg-3 me-5">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Nombre(s): </h6>
              <p className="mb-0 h6">{docente.docente_nombres}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Apellido(s): </h6>
              <p className="mb-0 h6">{docente.docente_apellidos}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Tipo de Identificación: </h6>
              <p className="mb-0 h6">{docente.docente_tipoidentificacion}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Número de Identificación: </h6>
              <p className="mb-0 h6">{docente.docente_identificacion}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 ms-3">
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Tipo Docente: </h6>
              <p className="mb-0 h6">{docente.docente_tipo}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Tipo Contrato: </h6>
              <p className="mb-0 h6">{docente.docente_tipocontrato}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Área: </h6>
              <p className="mb-0 h6">{docente.docente_area}</p>
            </div>
            <div className="d-flex justify-content-start mb-4">
              <h6 className="fw-bold me-2">Estado: </h6>
              <p className="mb-0 h6">{docente.docente_activo ? "Activo" : "Desactivo"}</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default InfoDocente