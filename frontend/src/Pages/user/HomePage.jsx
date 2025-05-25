import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'animate.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import homeImage from "../../assets/images/page.png";
import carousel3 from "../../assets/images/carousel3.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel4 from "../../assets/images/carousel4.jpg";
import carousel1 from "../../assets/images/carousel1.jpg";
import EventCard from "../../components/EventCard"; 

function HomePage() {
  const featuredEvents = [
    {
      name: "Khel khoj",
      duration: "3 hours",
      date: "2025-05-20T10:00:00"
    },
    {
      name: "Musical Night",
      duration: "3 hours",
      date: "2025-05-30T09:00:00"
    },
    {
      name: "Hackathon",
      duration: "2 hours",
      date: "2025-05-22T10:00:00"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* Hero Section */}
      <section
        className="text-center py-20 px-6 bg-cover bg-center bg-no-repeat animate__animated animate__fadeIn"
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundColor: "#181818",
        }}
      >
        <h2 className="text-5xl font-extrabold mb-4 text-white animate__animated animate__fadeInDown">
          The Best of <span className="text-[#e6007a]">INFEST</span> 2025!
        </h2>
        <p className="text-lg text-[#cccccc] max-w-2xl mx-auto mb-6">
          Join the most electrifying college fest experience. Real-time updates, streamlined planning, and unforgettable moments await!
        </p>
      </section>

      {/* Carousel Section */}
      <section className="py-5 bg-[#121212]">
        <div className="max-w-3xl mx-auto animate__animated animate__fadeIn rounded-lg overflow-visible shadow-lg relative">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={1500}
            dynamicHeight={false}
            transitionTime={300}
            swipeable
            emulateTouch
            centerMode={true}
            centerSlidePercentage={60}
          >
            {[carousel3, carousel2, carousel4, carousel1].map((src, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg">
                <img
                  src={src}
                  alt={`INFEST fest activity ${idx + 1}`}
                  className="h-64 object-cover w-full rounded-lg transition-transform duration-500 ease-in-out transform"
                />
              </div>
            ))}
          </Carousel>
          <style>{`
            .carousel .slide {
              opacity: 0.6;
              transform: scale(0.85);
              transition: all 0.3s ease;
              filter: brightness(0.8);
            }
            .carousel .slide.selected {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
              z-index: 10;
            }
            .control-arrow {
              filter: drop-shadow(0 0 5px #e6007a);
              transition: transform 0.3s ease;
              z-index: 20;
            }
            .control-arrow:hover {
              transform: scale(1.2);
            }
          `}</style>
        </div>
      </section>

      {/* 🎯 Events Section */}
      <section className="px-8 py-16 bg-[#0f0f0f] animate__animated animate__fadeInUp">
  <div className="max-w-7xl mx-auto">
    {/* Header with Events on left and Show All on right */}
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-4xl font-bold text-white">Events</h3>
      <Link to="/event" className="text-[#e6007a] font-semibold hover:underline">
        Show All &gt;
      </Link>
    </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, idx) => (
              <div key={idx} className="animate__animated animate__fadeInUp">
                <EventCard
                  event={event}
                  onClick={() => console.log(`Clicked ${event.name}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 About INFEST Section */}
      <section className="bg-black text-white py-20 px-6 animate__animated animate__fadeInUp">
        <div className="max-w-7xl mx-auto text-left">
          <h2 className="text-4xl font-bold text-[#e6007a] mb-4">About INFEST</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            INFEST is a smart college event management platform designed to simplify the way events are created, approved, and experienced. From real-time updates to a completely paperless process, INFEST makes campus events seamless and exciting.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
