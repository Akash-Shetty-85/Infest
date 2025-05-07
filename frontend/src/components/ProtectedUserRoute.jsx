// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute = () => {
    const token = localStorage.getItem('token');

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedUserRoute;
