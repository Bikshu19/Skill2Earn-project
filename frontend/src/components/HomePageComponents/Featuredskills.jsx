import React, { useState, useEffect } from "react";

// Example skill data
const skills = [
  { name: "Tuition", img: "./tution.webp" },
  { name: "Tailoring", img: "./lakshmi.jpg" },
  { name: "Cooking", img: "./cooking.webp" },
  { name: "Art & Craft", img: "./art.webp" },
  { name: "Music", img: "./music.webp" },
  { name: "Fitness", img: "./fitness.webp" },
];

export default function PopularSkillsCircle() {
  const [radius, setRadius] = useState(220);

  // Update radius based on screen width
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) setRadius(120); // mobile
    else if (width < 1024) setRadius(180); // tablet
    else setRadius(220); // desktop
  };

  useEffect(() => {
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex flex-col items-center py-20 bg-gradient-to-b from-pink-50 to-purple-50">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        Popular Skills
      </h2>
      <p className="mt-4 text-gray-600 text-lg max-w-2xl text-center">
        Explore the most popular skill categories and find what suits you best.
      </p>

      {/* Circle container */}
      <div className="relative flex items-center justify-center mt-12 w-11/12 max-w-[650px] aspect-square">
        {/* Center Circle */}
        <div className="absolute w-36 md:w-56 h-36 md:h-56 rounded-full flex flex-col items-center justify-center text-center bg-white shadow-lg border border-pink-300">
          <h3 className="text-lg md:text-2xl font-bold text-pink-600">
            Skill2Earn
          </h3>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Categories
          </p>
        </div>

        {/* Outer Circle Skills */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={index}
              className="absolute flex flex-col items-center text-center"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
              }}
            >
              <div className="w-16 md:w-28 h-16 md:h-28 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-pink-200 bg-white transition-transform hover:scale-105">
                <img
                  src={skill.img}
                  alt={skill.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 md:mt-3 text-xs md:text-base font-medium text-pink-700 w-16 md:w-28">
                {skill.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
