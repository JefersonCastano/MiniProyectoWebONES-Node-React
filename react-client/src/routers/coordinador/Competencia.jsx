import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import ListItems from '../../components/ListItems';
import ManageItems from '../../components/ManageItems';
import CommonContext from '../../components/CommonContext';
import CompetenciaForm from '../../components/forms/CompetenciaForm';
import * as competenciaRoutes from '../../api/competenciaRoutes';

const Competencia = () => {

  const auth = useAuth();
  competenciaRoutes.setToken(auth.getAccessToken());

  const keys = { id: 'competencia_id', name: 'competencia_nombre', active: 'competencia_activo' };
  const text = { button: 'Competencia', message: 'competencia' }

  const crudMethods = {
    get: competenciaRoutes.getAllCompetencias,
    getById: competenciaRoutes.getCompetenciaById,
    create: competenciaRoutes.createCompetencia,
    update: competenciaRoutes.updateCompetencia,
    changeState: competenciaRoutes.changeCompetenciaActiveState
  }

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonContext crudMethods={crudMethods}>
        <div className="row">
          <div className="col-lg-5 mb-2 ">
            <ListItems keys={keys} />
          </div>
          <div className="col-lg-6" >
            <ManageItems form={<CompetenciaForm />} text ={text}/>
          </div>
        </div>
      </CommonContext>
    </DefaultLayout>
  )
}

export default Competencia