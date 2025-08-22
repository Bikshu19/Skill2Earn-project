import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Helper function to check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="flex justify-between items-center px-6 md:px-12 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-pink-600 hover:scale-105 transition-transform"
      >
        Skill<span className="text-indigo-600">2</span>Earn
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link
          to="/"
          className={`hover:text-pink-600 transition-colors duration-200 ${
            isActive("/") ? "text-pink-600 border-b-2 border-pink-600" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-pink-600 transition-colors duration-200"
        >
          About
        </Link>
        <Link
          to="/explore"
          className="hover:text-pink-600 transition-colors duration-200"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="hover:text-pink-600 transition-colors duration-200"
        >
          Contact
        </Link>
      </nav>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className={`px-4 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-50 transition-all duration-200 transform hover:scale-105 ${
            isActive("/login") ? "bg-pink-50" : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 shadow-md transition-all duration-200 transform hover:scale-105 ${
            isActive("/register") ? "bg-pink-700" : ""
          }`}
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu Button (Optional - you can add mobile menu functionality) */}
      <button className="md:hidden text-gray-700 hover:text-pink-600 transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}

export default Navbar;
