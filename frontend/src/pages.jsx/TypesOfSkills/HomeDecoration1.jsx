import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import HomeD from "../../components/ServiceComponents/HemoDecoration";
function HomeDecoration() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <HomeD />
      </div>
      <Footer />
    </div>
  );
}

export default HomeDecoration;
