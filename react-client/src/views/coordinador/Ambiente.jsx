import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import ListItems from '../../components/items/ListItems';
import ManageItems from '../../components/items/ManageItems';
import CommonContext from '../../components/items/CommonContext';
import AmbienteForm from '../../components/forms/AmbienteForm';
import * as ambienteRoutes from '../../api/ambienteRoutes';

const Ambiente = () => {

  const auth = useAuth();
  ambienteRoutes.setToken(auth.getAccessToken());

  const keys = { id: 'ambiente_id', name: 'ambiente_nombre', active: 'ambiente_activo' };
  const text = {button: 'Ambiente', message: 'ambiente'}

  const crudMethods = {
    get: ambienteRoutes.getAllAmbientes,
    getById: ambienteRoutes.getAmbienteById,
    create: ambienteRoutes.createAmbiente,
    update: ambienteRoutes.updateAmbiente,
    changeState: ambienteRoutes.changeAmbienteActiveState
  }

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonContext crudMethods={crudMethods}>
        <div className="row">
          <div className="col-lg-5 mb-2 ">
            <ListItems keys={keys} />
          </div>
          <div className="col-lg-6" >
            <ManageItems form={<AmbienteForm />} text ={text}/>
          </div>
        </div>
      </CommonContext>
    </DefaultLayout>
  )
}

export default Ambiente