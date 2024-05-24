import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import ListItems from '../../components/items/ListItems';
import ManageItems from '../../components/items/ManageItems';
import CommonContext from '../../components/items/CommonContext';
import DocenteForm from '../../components/forms/DocenteForm';
import * as docenteRoutes from '../../api/docenteRoutes';

const Docente = () => {
  
  const auth = useAuth();
  docenteRoutes.setToken(auth.getAccessToken());

  const keys = { id: 'docente_id', name: 'docente_nombres', surname: 'docente_apellidos', active: 'docente_activo' };
  const text = {button: 'Docente', message: 'docente'}

  const crudMethods = {
    get: docenteRoutes.getAllDocentes,
    getById: docenteRoutes.getDocenteById,
    create: docenteRoutes.createDocente,
    update: docenteRoutes.updateDocente,
    changeState: docenteRoutes.changeDocenteActiveState
  }

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonContext crudMethods={crudMethods}>
        <div className="row">
          <div className="col-lg-5 mb-2 ">
            <ListItems keys={keys} />
          </div>
          <div className="col-lg-6" >
            <ManageItems form={<DocenteForm />} text ={text}/>
          </div>
        </div>
      </CommonContext>
    </DefaultLayout>
  )
}

export default Docente