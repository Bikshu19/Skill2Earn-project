import React from "react";
import Profile from "../components/Profile";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function PostSkill() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "120px" }}>
        <Profile />
      </div>
      <HomeFooter />
    </div>
  );
}

export default PostSkill;
