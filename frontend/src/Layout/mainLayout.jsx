import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.success('Logged out successfully!');
        navigate('/');
    };

    return (
        <>
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        InFest
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>

                        {isLoggedIn && (
                            <Link to="/create-event" className="text-gray-700 hover:text-blue-600">Create Event</Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-2">
                        <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>

                        {isLoggedIn && (
                            <Link to="/create-event" className="block text-gray-700 hover:text-blue-600">Create Event</Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/register" className="block text-gray-700 hover:text-blue-600">Register</Link>
                                <Link to="/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
                            </>
                        )}
                    </div>
                )}
            </header>

            <main className="min-h-screen px-4 py-6">
                <Outlet />
            </main>

            <footer className="bg-gray-100 text-center py-4">
                <p className="text-sm text-gray-500">© 2025 InFest. All rights reserved.</p>
            </footer>
        </>
    );
};

export default MainLayout;
