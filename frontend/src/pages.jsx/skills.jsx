import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import GetSkill from "../components/GetSkill";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function skills() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "100px" }}>
        <GetSkill />
      </div>
      <div style={{ marginTop: "220px" }}>
        <HomeFooter />
      </div>
    </div>
  );
}

export default skills;
