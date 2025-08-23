import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Beauty from "../../components/ServiceComponents/Beauty";
import Footer from "../../components/HomePageComponents/HomeFooter";

function Beauty1() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Beauty />
      </div>
      <Footer />
    </div>
  );
}

export default Beauty1;
