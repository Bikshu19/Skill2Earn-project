import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Cook from "../../components/ServiceComponents/Cooking";

function Cookings() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Cook />
      </div>
      <Navbar />
    </div>
  );
}

export default Cookings;
