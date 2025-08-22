import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import About from "../components/About";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function AboutPage() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "20px" }}>
        <About />
      </div>
      <HomeFooter />
    </div>
  );
}

export default AboutPage;
