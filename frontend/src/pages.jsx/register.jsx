import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Registerpanel from "../components/Authentication/Registerpanel";
function Register() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "80px" }}>
        <Registerpanel />
      </div>
    </div>
  );
}

export default Register;
