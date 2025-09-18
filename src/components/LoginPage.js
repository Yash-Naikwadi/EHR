import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div>
    <NavBar></NavBar>
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/doctor_login");
          }}
        >
          Doctor Login
        </button>
        <button
          onClick={() => {
            navigate("/patient_login");
          }}
        >
          Patient Login
          </button>
        <button
          onClick={() => {
            navigate("/diagnostic_login");
          }}
        >
          Diagnostic Login
        </button>
      </div>
      </div>
      </div>
  );
};

export default LoginPage;
