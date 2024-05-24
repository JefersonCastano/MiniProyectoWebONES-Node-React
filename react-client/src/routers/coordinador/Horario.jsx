import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'
import CommonHorarioContext from '../../components/horario/CommonHorarioContext';
import ConsultaHorarioForm from '../../components/searchForms/ConsultaHorarioForm';
import HorarioComponent from '../../components/horario/HorarioComponent';
import ManageHorario from '../../components/horario/ManageHorario';

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