import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_new.jpg";

const NavBar_Logout = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <div>
          {/* Logo */}
          <div >
            <img
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Title */}
          <div>
            <span
              onClick={() => navigate("/")}
            >
              Secure Electronic Health Records
            </span>
          </div>

          {/* Navigation buttons */}
          <div>
            <button
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar_Logout;
