import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in and if so, set user details
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const storedUserId = localStorage.getItem('userId');
            const storedIsAdmin = localStorage.getItem('user') === 'true';

            if (token && storedUserId) {
                setIsLoggedIn(true);
                setUserId(storedUserId);
                setIsAdmin(storedIsAdmin);
            } else {
                setIsLoggedIn(false);
                setUserId(null);
                setIsAdmin(false);
            }
        };

        checkAuth(); // Initial check

        // Listen for auth changes
        window.addEventListener('authChanged', checkAuth);

        return () => {
            window.removeEventListener('authChanged', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserId(null);
        setIsAdmin(false);
        toast.success('Logged out successfully!');
        navigate('/');
    };

    return (
        <>
            <header className="bg-[#0f0f0f] text-white font-sans shadow-md">
                <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-bold text-[#e6007a]">
                        INFEST
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-white hover:text-[#e6007a]">Home</Link>

                        {isLoggedIn && (
                            <>
                                <Link to="/event" className="text-white hover:text-[#e6007a]">Event</Link>
                                {isAdmin && (
                                    <Link to="/admin/events" className="text-white hover:text-[#e6007a]">Admin</Link>
                                )}
                            </>
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
                                <Link to="/register" className="text-white hover:text-[#e6007a]">Register</Link>
                                <Link to="/login" className="text-white hover:text-[#e6007a]">Login</Link>
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
                        <Link to="/" className="block text-gray-700 hover:text-[#e6007a]">Home</Link>

                        {isLoggedIn && (
                            <>
                                <Link to="/event" className="block text-gray-700 hover:text-[#e6007a]">Event</Link>
                                {isAdmin && (
                                    <Link to="/admin" className="block text-gray-700 hover:text-[#e6007a]">Admin</Link>
                                )}
                            </>
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
                                <Link to="/register" className="block text-gray-700 hover:text-[#e6007a]">Register</Link>
                                <Link to="/login" className="block text-gray-700 hover:text-[#e6007a]">Login</Link>
                            </>
                        )}
                    </div>
                )}
            </header>

            <main className="min-h-screen px-0 bg-[#0f0f0f]">
                <Outlet />
            </main>

            <footer className=" text-center py-4 bg-[#0f0f0f] text-white">
                <p className="text-0">© 2025 InFest. All rights reserved.</p>
            </footer>
        </>
    );
};

export default MainLayout;

