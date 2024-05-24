import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import ListItems from '../../components/items/ListItems';
import ManageItems from '../../components/items/ManageItems';
import CommonContext from '../../components/items/CommonContext';
import ProgramaForm from '../../components/forms/ProgramaForm';
import * as programaRoutes from '../../api/programaRoutes';

const Programa = () => {

  const auth = useAuth();
  programaRoutes.setToken(auth.getAccessToken());

  const keys = { id: 'programa_id', name: 'programa_nombre'};
  const text = {button: 'Programa', message: 'programa'}

  const crudMethods = {
    get: programaRoutes.getAllProgramas,
    getById: programaRoutes.getProgramaById,
    create: programaRoutes.createPrograma,
    update: programaRoutes.updatePrograma,
  }

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonContext crudMethods={crudMethods}>
        <div className="row">
          <div className="col-lg-5 mb-2 ">
            <ListItems keys={keys} />
          </div>
          <div className="col-lg-6" >
            <ManageItems form={<ProgramaForm />} text ={text}/>
          </div>
        </div>
      </CommonContext>
    </DefaultLayout>
  );
}

export default Programa