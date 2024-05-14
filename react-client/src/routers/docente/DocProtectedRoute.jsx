import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'

const CoorProtectedRoute = () => {
    const auth = useAuth()
    return (auth.getUser().role == "DOCENTE" ? <Outlet /> : <Navigate to="/horarios" />)
}

export default CoorProtectedRoute