import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Photography from "../../components/ServiceComponents/Photography";

function Photos() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Photography />
      </div>
      <Footer />
    </div>
  );
}

export default Photos;
