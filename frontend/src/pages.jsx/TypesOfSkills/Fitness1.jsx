import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Fitness from "../../components/ServiceComponents/fitness";
import Footer from "../../components/HomePageComponents/HomeFooter";
function Fitness1() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Fitness />
      </div>
      <Footer />
    </div>
  );
}

export default Fitness1;
