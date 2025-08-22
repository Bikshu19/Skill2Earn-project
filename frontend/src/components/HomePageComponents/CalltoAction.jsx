import React from "react";
import { motion } from "framer-motion";

function CallToAction() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white text-center">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join Skill2Earn Today 🚀
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start sharing your skills, connect with people in your locality, and
          begin your journey towards financial independence.
        </motion.p>

        {/* Button */}
        <motion.button
          className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </div>
    </section>
  );
}

export default CallToAction;
