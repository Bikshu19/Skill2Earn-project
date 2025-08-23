import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Explore from "../components/explore";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function Explore1() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "50px" }}>
        <Explore />
      </div>
      <HomeFooter />
    </div>
  );
}

export default Explore1;
