import React from "react";
import Navbar from "../../components/HomePageComponents/Homenavbar";
import Footer from "../../components/HomePageComponents/HomeFooter";
import Work from "../../components/ServiceComponents/remoteworks";

function RemoteWok() {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Work />
      </div>
      <Footer />
    </div>
  );
}

export default RemoteWok;
