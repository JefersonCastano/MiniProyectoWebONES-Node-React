import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import ListItems from '../../components/ListItems';
import ManageItems from '../../components/ManageItems';
import CommonContext from '../../components/CommonContext';
import PeriodoAcademicoForm from '../../components/forms/PeriodoAcademicoForm';
import * as periodoAcademicoRoutes from '../../api/periodoAcademicoRoutes';

const PeriodoAcademico = () => {

  const auth = useAuth();
  periodoAcademicoRoutes.setToken(auth.getAccessToken());

  const keys = { id: 'periodo_id', name: 'periodo_nombre', active: 'periodo_activo' };
  const text = {button: 'Periodo Académico', message: 'periodo académico'}

  const crudMethods = {
    get: periodoAcademicoRoutes.getAllPeriodosAcademicos,
    getById: periodoAcademicoRoutes.getPeriodoAcademicoById,
    create: periodoAcademicoRoutes.createPeriodoAcademico,
    update: periodoAcademicoRoutes.updatePeriodoAcademico,
    changeState: periodoAcademicoRoutes.changePeriodoAcademicoActiveState
  }

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonContext crudMethods={crudMethods}>
        <div className="row">
          <div className="col-lg-5 mb-2 ">
            <ListItems keys={keys} />
          </div>
          <div className="col-lg-6" >
            <ManageItems form={<PeriodoAcademicoForm />} text ={text}/>
          </div>
        </div>
      </CommonContext>
    </DefaultLayout>
  );
}

export default PeriodoAcademico
