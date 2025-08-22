import React from "react";
import ExploreSkills1 from "../components/ExploreSkills1";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function ExploreSkills() {
  return (
    <>
      <Homenavbar />
      <div style={{ marginTop: "50px" }}>
        <ExploreSkills1 />
      </div>
      <HomeFooter />
    </>
  );
}

export default ExploreSkills;
