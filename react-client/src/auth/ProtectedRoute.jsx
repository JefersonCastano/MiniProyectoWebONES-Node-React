import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = () => {
    const auth = useAuth()
    return (auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" /> )
}

export default ProtectedRoute