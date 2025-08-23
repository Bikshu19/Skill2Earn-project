import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Tailor from "../../components/ServiceComponents/Tailors";

function Tailors1() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Tailor />
      </div>
      <Footer />
    </div>
  );
}

export default Tailors1;
