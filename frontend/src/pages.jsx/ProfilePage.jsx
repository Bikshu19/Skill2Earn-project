import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Profile from "../components/Profile";
import Footer from "../components/HomePageComponents/HomeFooter";

function ProfilePage() {
  return (
    <div>
      <Homenavbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default ProfilePage;
