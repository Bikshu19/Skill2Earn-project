import React from "react";
import Homenavbar from "../components/HomePageComponents/Homenavbar";
import Loginpanel from "../components/Authentication/Loginpanel";
function Login() {
  return (
    <div>
      <Homenavbar />
      <div style={{ marginTop: "100px" }}>
        <Loginpanel />
      </div>
    </div>
  );
}

export default Login;
