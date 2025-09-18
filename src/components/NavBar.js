import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_new.jpg";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <div>
          {/* Logo */}
          <div>
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
              Home
            </button>
            <button
              onClick={() => navigate("/AboutPage")}
            >
              About Us
            </button>
            <button
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
