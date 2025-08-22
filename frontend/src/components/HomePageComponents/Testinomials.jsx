import React from "react";
import { motion } from "framer-motion";

function Testimonials() {
  const stories = [
    {
      name: "Ayesha Begum",
      role: "Cooking Classes,Vombey Colony ,Vijayawada",
      img: "/ayesha.webp",
      text: "This platform gave me the confidence to teach my cooking skills online and earn independently.",
    },
    {
      name: "Lakshmi Devi",
      role: "Tailor,YSR Colony ,Jakkampudi,Vijayawada",
      img: "/lakshmi.jpg",
      text: "Through Skill2Earn, I connected with local customers and now run my own tailoring business from home.",
    },
    {
      name: "Fatima Khan",
      role: "Tutor, ChittiNagar,Vijayawada",
      img: "/chandu.webp",
      text: "I started giving tuition classes via Skill2Earn and now I support my children’s education with my earnings.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Success Stories
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Inspiring journeys of women who transformed their lives with
          Skill2Earn.
        </p>

        {/* Animated Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Profile Image */}
              <motion.img
                src={story.img}
                alt={story.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-pink-200"
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              {/* Text */}
              <p className="text-gray-700 italic mb-4">“{story.text}”</p>
              {/* Name & Role */}
              <h4 className="text-lg font-semibold text-gray-800">
                {story.name}
              </h4>
              <span className="text-sm text-gray-500">{story.role}</span>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <motion.button
            className="px-6 py-3 rounded-xl bg-pink-600 text-white font-medium hover:bg-pink-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Share Your Story
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
