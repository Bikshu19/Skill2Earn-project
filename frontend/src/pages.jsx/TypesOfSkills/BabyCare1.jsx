import React from "react";
import Homenavbar from "../../components/HomePageComponents/Homenavbar";
import BabyCare from "../../components/ServiceComponents/BabyCare";
import Footer from "../../components/HomePageComponents/HomeFooter";

function BabyCare1() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "50px" }}>
        <BabyCare />
      </div>
      <Footer />
    </div>
  );
}

export default BabyCare1;
