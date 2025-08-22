import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Skill2Earn</h2>
          <p className="text-gray-400">
            Empowering women by connecting their skills with people in need.
            Learn, share, and grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-pink-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p>Email: yarrachandu7@gmail.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Vijayawada, India</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-pink-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Skill2Earn. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
