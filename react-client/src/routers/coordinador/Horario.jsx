import React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import { useAuth } from '../../auth/AuthProvider';
import CommonHorarioContext, { useCommonHorarioContext } from '../../components/CommonHorarioContext';
import ToastBS from '../../components/Bootstrap/ToastBS';
import ConsultaHorarioForm from '../../components/forms/ConsultaHorarioForm';
import HorarioComponent from '../../components/HorarioComponent';
import ManageHorario from '../../components/ManageHorario';

const Horario = () => {
    const auth = useAuth();
    
    return (
        <DefaultLayout rol={auth.getUser().role}>
            <CommonHorarioContext>
                <div className="row g-3">
                    <ConsultaHorarioForm />
                    <div className="row mt-2">
                        <HorarioComponent />
                        <ManageHorario />
                    </div>
                </div>
            </CommonHorarioContext>
        </DefaultLayout>
    )
}

export default Horario