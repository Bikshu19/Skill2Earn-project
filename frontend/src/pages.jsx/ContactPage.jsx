import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Contact from "../components/Contactus";
import HomeFooter from "../components/HomePageComponents/HomeFooter";

function ContactPage() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "50px" }}>
        <Contact />
      </div>
      <HomeFooter />
    </div>
  );
}

export default ContactPage;
