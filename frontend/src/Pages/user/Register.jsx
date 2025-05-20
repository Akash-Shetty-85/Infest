// src/Pages/user/Register.jsx
import React, { useState } from 'react';
import eImage from "../../assets/images/login.png";
import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);
            toast.success(res.data.message || 'Registration successful!');
            setFormData({ name: '', email: '', password: '' }); // Reset form
        } catch (err) {
            console.log(err);
            const errorMsg = err.response?.data?.message || 'Registration failed';
            toast.error(errorMsg);
        }
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 relative">
  {/* Glow Effect Layer */}
  <div className="absolute w-[20px] h-[20px] bg-gradient-to-tr from-[#e6007a] via-[#ff33cc] to-[#e6007a] opacity-10 blur-1xl rounded-full animate-pulse z-0"></div>

{/* Left Side Image */}
            <div className="hidden md:flex w-1/2 justify-center items-center z-10">
                <img src={eImage} alt="Login Visual" className="max-w-md w-full" />
            </div>

  {/* Registration Form Card (Your Unchanged Code) */}
                <div className="w-full md:w-1/2 relative z-10 bg-[#1f1f1f] p-8 rounded-xl shadow-[0_0_30px_#e6007a80] max-w-md border border-[#e6007a]/30 transition-all duration-300">

    <h2 className="text-2xl font-bold text-center text-[#e6007a] mb-6">
      Create an Account
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#cccccc]">Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:ring-2 focus:ring-[#e6007a] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#cccccc]">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:ring-2 focus:ring-[#e6007a] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#cccccc]">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:ring-2 focus:ring-[#e6007a] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#e6007a] text-white font-semibold rounded-md hover:bg-[#cc0066] transition"
      >
        Register
      </button>
    </form>
  </div>
</div>

    );
};

export default Register;
