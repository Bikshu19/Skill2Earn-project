import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Homemade from "../../components/ServiceComponents/HomeMadeProducts";

function HomeMadeProducts() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Homemade />
      </div>
      <Footer />
    </div>
  );
}

export default HomeMadeProducts;
