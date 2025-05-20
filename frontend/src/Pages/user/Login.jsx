// src/Pages/user/Login.jsx
import React, { useState } from 'react';
import eImage from "../../assets/images/login.png";
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
<div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 relative">
  {/* Glow/Rays Behind Card */}
  <div className="absolute w-[20px] h-[20px] bg-gradient-to-tr from-[#e6007a] via-[#ff33cc] to-[#e6007a] opacity-10 blur-1xl rounded-full animate-pulse z-0"></div>

{/* Left Side Image */}
            <div className="hidden md:flex w-1/2 justify-center items-center z-10">
                <img src={eImage} alt="Login Visual" className="max-w-md w-full" />
            </div>

  {/* Login Card */}
                  <div className="w-full md:w-1/2 relative z-10 bg-[#1f1f1f] p-8 rounded-xl shadow-[0_0_30px_#e6007a80] max-w-md border border-[#e6007a]/30 transition-all duration-300">
    <h2 className="text-3xl font-bold text-center text-[#e6007a] mb-6">
      Login
    </h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-[#cccccc]">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:ring-2 focus:ring-[#e6007a] focus:outline-none transition"
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-[#cccccc]">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:ring-2 focus:ring-[#e6007a] focus:outline-none transition"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-2 bg-[#e6007a] text-white font-semibold rounded-md hover:bg-[#cc0066] shadow-md hover:shadow-[0_0_20px_#e6007a80] transition duration-300"
      >
        Login
      </button>
    </form>
  </div>
  </div>

    );
};

export default Login;


