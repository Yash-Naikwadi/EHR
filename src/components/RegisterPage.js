import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
// No need to import "./LandingPage.css" if you are using Tailwind CSS classes

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div>
        <NavBar></NavBar>
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/doctor_registration");
          }}
        >
          Doctor Registration
        </button>
        <button
          onClick={() => {
            navigate("/patient_registration");
          }}
        >
          Patient Registration
        </button>
        <button
          onClick={() => {
            navigate("/diagnostic_registration");
          }}
        >
          Diagnostics Registration
        </button>
      </div>
      </div>
      </div>
  );
};

export default RegisterPage;
