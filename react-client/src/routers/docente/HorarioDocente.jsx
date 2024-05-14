import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import DefaultLayout from '../../components/DefaultLayout'

const HorarioDocente = () => {
  const auth = useAuth();
  return (
    <DefaultLayout rol = {auth.getUser().role}>
      <p>En Construcción...</p>
    </DefaultLayout>
  );
}

export default HorarioDocente