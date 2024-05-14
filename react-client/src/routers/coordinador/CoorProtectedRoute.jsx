import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'

const CoorProtectedRoute = () => {
    const auth = useAuth()
    return (auth.getUser().role == "COORDINADOR" ? <Outlet /> : <Navigate to="/informacion-personal" />)
}

export default CoorProtectedRoute