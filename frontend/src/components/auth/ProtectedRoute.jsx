import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader';
const ProtectedRoute = ({admin, children}) => {
    
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    if(loading) return <Loader />
    if(!isAuthenticated){
        return <Navigate to="/login" repalce />
    }

    if(admin && user.role !== "admin"){
        return <Navigate to="/" repalce />

    }

    return children;
}

export default ProtectedRoute