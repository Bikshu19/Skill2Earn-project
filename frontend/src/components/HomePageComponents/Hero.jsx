import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('../herosection.png')] bg-cover bg-left md:bg-center lg:bg-left" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50/80 via-pink-100/60 to-purple-100/70" />

      {/* Optional subtle dark layer for very small screens */}
      <div className="absolute inset-0 md:hidden bg-white/20" />

      {/* Content */}
      <div className="relative z-10 w-full py-12 md:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Empowering <span className="text-pink-600">Women</span>
            <br />
            Through Skills
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700 max-w-full">
            Showcase your talents, connect with your community, and discover
            opportunities to grow and earn with Skill2Earn.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
            <button className="px-5 py-2 sm:px-6 sm:py-3 rounded-full bg-pink-600 text-white font-medium shadow-lg hover:bg-pink-700 transition text-sm sm:text-base">
              <Link to="/explore">Explore Skills</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
