// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import ProtectedUserRoute from '../components/ProtectedUserRoute';

import MainLayout from '../Layout/mainLayout';
import AdminLayout from '../Layout/AdminLayout';

// Lazy-loaded User Pages
const HomePage = lazy(() => import('../Pages/user/HomePage'));
const Login = lazy(() => import('../Pages/user/Login.jsx'));
const Register = lazy(() => import('../Pages/user/Register.jsx'));
const EventForm = lazy(() => import('../Pages/user/EventForm.jsx'));
const CreateEvent = lazy(() => import('../Pages/user/CreateEvent.jsx'));
const EventDetailsUser = lazy(() => import('../Pages/user/EventDetails.jsx'));
const Event = lazy(() => import('../Pages/user/Event.jsx'));
const AllEvents = lazy(() => import('@/Pages/admin/AllEvents.jsx'))
const PendingEvents = lazy(() => import('@/Pages/admin/PendingEvents.jsx'))
const AcceptedEvents = lazy(() => import('@/Pages/admin/AcceptedEvents.jsx'))
const AdminEventDetails = lazy(() => import('@/Pages/admin/AdminEventDetails.jsx'))

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import('../Pages/admin/AdminDashboard.jsx'));
// const EventDetails = lazy(() => import('../Pages/admin/EventDetails.jsx'));

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
                        

                        {/* Event nested routes */}
                        <Route path='/event' element={<ProtectedUserRoute />}>
                            <Route path="/event" element={<Event />}>
                                <Route path="create-event" element={<CreateEvent />} />
                                <Route path="my-events" element={<EventForm />} />
                                <Route path=":id" element={<EventDetailsUser />} />
                                
                                {/* <Route path="register/:id" element={<RegisterEvent />} /> */}
                            </Route>
                        </Route>
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={<ProtectedAdminRoute />}>
                        <Route element={<AdminLayout />}>
                            {/* <Route index element={<AdminDashboard />} /> */}
                            <Route path="events" element={<AllEvents />} />
                            <Route path="events/pending" element={<PendingEvents />} />
                            <Route path="events/accepted" element={<AcceptedEvents />} />
                            <Route path="event/:id" element={<AdminEventDetails />} />
                        </Route>
                    </Route>

                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
