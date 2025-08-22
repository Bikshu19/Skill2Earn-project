import React from "react";
import PostSkill1 from "../components/PostSkill1";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function PostSkill() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "70px" }}>
        <PostSkill1 />
      </div>
      <HomeFooter />
    </div>
  );
}

export default PostSkill;
