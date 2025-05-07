// import React from 'react'

// const HomePage = () => {
//     return (
//         <div>HomePage</div>
//     )
// }

// export default HomePage



import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 to-pink-100 text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-tr from-purple-300 to-pink-500 text-white animate__animated animate__fadeIn">
        <h2 className="text-4xl font-extrabold mb-4 animate__animated animate__fadeInDown">
          Crafting Timeless Celebrations
        </h2>
        <p className="text-lg mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          Engage. Elevate. Experience.
        </p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-100 hover:scale-105 transition transform duration-300 font-semibold">
          Get Started
        </button>
      </section>

      {/* Events Section */}
      <section className="mt-20 px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-purple-700 animate__animated animate__fadeInLeft">Upcoming Events</h3>
          <Link to="/event" className="text-purple-600 hover:underline text-sm font-medium animate__animated animate__fadeInRight">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate__animated animate__fadeInUp animate__delay-1s">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="w-full h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded mb-4"></div>
              <p className="text-base font-semibold text-gray-800">Khel Khoj</p>
              <div className="flex justify-between items-center mt-3 text-purple-700">
                <button className="bg-purple-600 text-white px-4 py-1.5 rounded-full hover:bg-purple-700 text-sm transition duration-200">
                  Register
                </button>
                <span className="text-sm cursor-pointer hover:underline">More Info</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-24 px-8 py-16 bg-white animate__animated animate__fadeInUp">
        <h3 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6">About Us</h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
          <span className="font-semibold text-purple-600">INFEST</span> is a dynamic platform designed to simplify event planning and student engagement in college fests.
          With real-time updates, role-based dashboards, secure login, and streamlined approvals, INFEST brings innovation and ease to college event management.
        </p>
      </section>

    </div>
  );
}

export default HomePage;

