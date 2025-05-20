// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'animate.css';
// import homeImage from "../../assets/images/page.png";


// function HomePage() {
//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">

//       <section
//   className="text-center py-20 px-6 bg-cover  bg-center bg-no-repeat animate__animated animate__fadeIn"
//   style={{
//     backgroundImage: `url(${homeImage})`,
//     backgroundColor: "#181818", // fallback color
//   }}
// >
//   <h2 className="text-5xl font-extrabold mb-4 text-white animate__animated animate__fadeInDown">
//     The Best of INFEST 2025!
//   </h2>
//   <p className="text-lg text-[#cccccc] max-w-2xl mx-auto mb-6">
//     Join the most electrifying college fest experience. Real-time updates, streamlined planning, and unforgettable moments await!
//   </p>
// </section>



//       {/* Services Section */}
//      <section className="px-8 py-16 bg-[#0f0f0f] animate__animated animate__fadeInUp">
//         <h3 className="text-4xl font-bold text-center text-white mb-12">Events</h3>
//       </section>

//       {/* About Section */}
//       <section className="px-8 py-16 bg-[#181818] animate__animated animate__fadeInUp">
//         <h3 className="text-3xl font-extrabold text-white  mb-6">About INFEST</h3>
//         <p className="text-[#bbbbbb] text-lg leading-relaxed max-w-4xl mx-auto">
//           <span className="font-semibold text-[#e6007a]">INFEST</span> is a platform crafted to revolutionize college event planning.
//           From live updates and intelligent dashboards to secure logins and paperless approvals, INFEST ensures a seamless and engaging fest experience.
//         </p>
//       </section>

//     </div>
//   );
// }

// export default HomePage;


import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'animate.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required styles
import homeImage from "../../assets/images/page.png";
import carousel3 from "../../assets/images/carousel3.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel4 from "../../assets/images/carousel4.jpg";
import carousel1 from "../../assets/images/carousel1.jpg";

function HomePage() {
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
<section className="py-5 bg-[#121212]" aria-label="INFEST highlights carousel">
  <div className="max-w-3xl mx-auto animate__animated animate__fadeIn rounded-lg overflow-visible shadow-lg relative">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={1500}          // faster slide interval: 1.5 seconds
      dynamicHeight={false}
      transitionTime={300}     // faster transition: 0.3 seconds
      swipeable
      emulateTouch
      centerMode={true}
      centerSlidePercentage={60}
      className=""
    >
      {[carousel3, carousel2, carousel4, carousel1].map((src, idx) => (
        <div key={idx} className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg">
          <img
            src={src}
            alt={`INFEST fest activity ${idx + 1}`}
            className="h-64 object-cover w-full rounded-lg transition-transform duration-500 ease-in-out transform"
          />
          <div
            className="absolute bottom-4 left-4 bg-opacity-60 text-white rounded-md p-3 animate__animated animate__fadeInUp"
            style={{ animationDelay: `${idx * 0.5}s` }}
          >
            {/* You can add captions here */}
          </div>
        </div>
      ))}
    </Carousel>

    <style>{`
      /* Scale down side slides */
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

      /* Custom arrow hover glow */
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



      {/* 🎯 Services Section */}
      <section className="px-8 py-16 bg-[#0f0f0f] animate__animated animate__fadeInUp">
        <h3 className="text-4xl font-bold text-center text-white mb-12">Events</h3>
      </section>

      {/* 🧾 About Section */}
      <section className="px-8 py-16 bg-[#181818] animate__animated animate__fadeInUp">
        <h3 className="text-3xl font-extrabold text-white mb-6">About INFEST</h3>
        <p className="text-[#bbbbbb] text-lg leading-relaxed max-w-4xl mx-auto">
          <span className="font-semibold text-[#e6007a]">INFEST</span> is a platform crafted to revolutionize college event planning.
          From live updates and intelligent dashboards to secure logins and paperless approvals, INFEST ensures a seamless and engaging fest experience.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
