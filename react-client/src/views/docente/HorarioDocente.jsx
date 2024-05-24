import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import HorarioComponent from '../../components/horario/HorarioComponent';
import ConsultaHorarioDocenteForm from '../../components/searchForms/ConsultaHorarioDocenteForm';
import CommonHorarioContext from '../../components/horario/CommonHorarioContext';

const HorarioDocente = () => {

  const auth = useAuth();
  const docente_id = auth.getUser().id;

  return (
    <DefaultLayout rol={auth.getUser().role}>
      <CommonHorarioContext>
        <div className="row g-3">
          <ConsultaHorarioDocenteForm docente_id={docente_id}/>
          <div className="row mt-2">
            <HorarioComponent />
          </div>
        </div>
      </CommonHorarioContext>
    </DefaultLayout>
  );
}

export default HorarioDocente