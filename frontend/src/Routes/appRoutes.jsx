// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';

import MainLayout from '../Layout/mainLayout';
import AdminLayout from '../Layout/AdminLayout';

// Lazy-loaded User Pages
const HomePage = lazy(() => import('../Pages/user/HomePage'));
const Login = lazy(() => import('../Pages/user/Login.jsx'));
const Register = lazy(() => import('../Pages/user/Register.jsx'));
const EventForm = lazy(() => import('../Pages/user/EventForm.jsx'));
const RegisterEvent = lazy(() => import('../Pages/user/RegisterEvent.jsx'));

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('../Pages/admin/AdminDashboard.jsx'));
const EventDetails = lazy(() => import('../Pages/admin/EventDetails.jsx'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>

                    {/* User Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create-event" element={<EventForm />} />
                        <Route path="/register-event/:eventId" element={<RegisterEvent />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={<ProtectedAdminRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="event/:id" element={<EventDetails />} />
                        </Route>
                    </Route>

                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
