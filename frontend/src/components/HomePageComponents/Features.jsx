import React from "react";
import { FaUserTie, FaBullhorn, FaDollarSign } from "react-icons/fa"; // icons

function Features() {
  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          How Skill2Earn Works
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Showcase your talents, connect with your community, and start earning
          today.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-6 bg-pink-50 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-pink-600 text-4xl mb-4">
              <FaUserTie />
            </div>
            <h3 className="text-xl font-semibold mb-2">Post Your Skill</h3>
            <p className="text-gray-600">
              Share your expertise, create a detailed post, and showcase your
              talents to the community.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-pink-50 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-pink-600 text-4xl mb-4">
              <FaBullhorn />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Discovered</h3>
            <p className="text-gray-600">
              Let users in your locality find your services easily and connect
              with you directly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-pink-50 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-pink-600 text-4xl mb-4">
              <FaDollarSign />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn & Grow</h3>
            <p className="text-gray-600">
              Turn your skills into income, grow your reputation, and unlock new
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
