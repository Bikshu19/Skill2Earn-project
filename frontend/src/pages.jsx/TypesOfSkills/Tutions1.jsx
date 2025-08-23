import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Tution from "../../components/ServiceComponents/Tutions";

function Tutions1() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Tution />
      </div>
      <Footer />
    </div>
  );
}

export default Tutions1;
