import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Hero from "../components/HomePageComponents/Hero";
import Features from "../components/HomePageComponents/Features";
import FeaturedSkills from "../components/HomePageComponents/Featuredskills";
import Testimonials from "../components/HomePageComponents/Testinomials";
import CallToAction from "../components/HomePageComponents/CalltoAction";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function homepage() {
  return (
    <div>
      <Homenavbar />
      <Hero />
      <Features />
      <FeaturedSkills />
      <Testimonials />
      <CallToAction />
      <HomeFooter />
    </div>
  );
}

export default homepage;
