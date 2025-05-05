// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <header>Admin Navbar</header>
            <main>
                <Outlet />
            </main>
            <footer>Admin Footer</footer>
        </>
    );
};

export default AdminLayout;
