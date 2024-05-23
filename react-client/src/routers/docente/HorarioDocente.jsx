import React, { useState, useEffect, createContext, useContext } from 'react'
import DefaultLayout from '../../components/DefaultLayout'

import { useAuth } from '../../auth/AuthProvider';

import { showConfirmationMessageHorario } from '../../utilities/Messages';
import HorarioComponent from '../../components/HorarioComponent';
import { setToken, getHorarioByPerAndDocId } from '../../api/horarioRoutes';
import ToastBS from '../../components/Bootstrap/ToastBS';
import ConsultaHorarioDocenteForm from '../../components/forms/ConsultaHorarioDocenteForm';
import ConsultaHorarioForm from '../../components/forms/ConsultaHorarioForm';
import CommonHorarioContext from '../../components/CommonHorarioContext';


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