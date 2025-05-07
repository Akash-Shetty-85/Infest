// src/Pages/user/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle form field change
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sending POST request to login API
            const res = await axios.post(`${apiUrl}/api/users/login`, formData);

            if (res.data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('user',res.data.isAdmin);
                toast.success('Login successful!');
                // Redirect user to homepage or dashboard
                if(res.data.isAdmin) {
                    window.location.href = '/admin';
                }
                window.location.href = '/';
            } else {
                toast.error('Login failed, try again.');
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || 'Login failed';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
