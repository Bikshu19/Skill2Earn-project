import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // user state derived from localStorage
  const [user, setUser] = useState(null);

  // On component mount, read user info from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = localStorage.getItem("username") || "User";
      const avatar =
        localStorage.getItem("avatar") || "https://i.pravatar.cc/150";
      setUser({ username, avatar });
    } else {
      setUser(null);
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("role"); // optional

    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/20 border-b border-white/30">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-600 hover:scale-105 transition-transform"
        >
          Skill<span className="text-indigo-600">2</span>Earn
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-8 text-gray-800 font-medium">
          <Link
            to="/"
            className={`hover:text-pink-600 transition ${
              isActive("/") ? "text-pink-600 border-b-2 border-pink-600" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-pink-600 transition ${
              isActive("/about")
                ? "text-pink-600 border-b-2 border-pink-600"
                : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/explore"
            className={`hover:text-pink-600 transition ${
              isActive("/explore")
                ? "text-pink-600 border-b-2 border-pink-600"
                : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`hover:text-pink-600 transition ${
              isActive("/contact")
                ? "text-pink-600 border-b-2 border-pink-600"
                : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Buttons / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-50 transition ${
                  isActive("/login") ? "bg-pink-50" : ""
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 shadow-md transition ${
                  isActive("/register") ? "bg-pink-700" : ""
                }`}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-9 h-9 rounded-full border-2 border-pink-500"
                />
                <span className="font-medium text-gray-700 select-none">
                  Profile
                </span>
                {/* Arrow icon: right arrow when closed, down arrow when open */}
                {profileOpen ? (
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-xl shadow-md rounded-lg py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/postskill"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-pink-100"
                  >
                    Post Skill
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 hover:text-pink-600 transition"
        >
          {menuOpen ? (
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-7 h-7"
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
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 top-[64px] w-full bg-white/90 backdrop-blur-xl shadow-lg flex flex-col items-center space-y-4 py-6 z-40">
          {!user ? (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                About
              </Link>
              <Link
                to="/explore"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Services
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Contact
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-32 py-2 rounded-full text-center border border-pink-600 text-pink-600 hover:bg-pink-50 text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="w-32 py-2 rounded-full text-center bg-pink-600 text-white hover:bg-pink-700 text-sm"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-14 h-14 rounded-full border-2 border-pink-500"
                />
                <span className="font-medium text-gray-700">
                  {user.username}
                </span>
              </div>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                My Profile
              </Link>
              <Link
                to="/postskill"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Post Skill
              </Link>
              <Link
                to="/home"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Home
              </Link>
              <Link
                to="/explore"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Service
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-600"
              >
                Contact
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
