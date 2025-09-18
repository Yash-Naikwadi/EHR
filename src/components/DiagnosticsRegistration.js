import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DiagnosticRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [diagnosticAddress, setDiagnosticAddress] = useState("");
  const [diagnosticName, setDiagnosticName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [diagnosticLocation, setDiagnosticLocation] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [password, setPassword] = useState(""); // Define password state variable
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          setContract(contractInstance);
        } catch (error) {
          console.error("User denied access to accounts.");
        }
      } else {
        console.log("Please install MetaMask extension");
      }
    };

    init();
  }, []);


  const handleRegister = async () => {
    if (
      !diagnosticAddress ||
      !diagnosticName ||
      !hospitalName ||
      !diagnosticLocation ||
      !email ||
      !hhNumber ||
      !password ||
      !confirmPassword
    ) {
      alert(
        "You have missing input fields. Please fill in all the required fields."
      );
      return;
    }

     // Password validation: minimum length
     if (password.length < 8) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("Password must be atleast 8 characters long.");
      return;
      }

     // Password validation: minimum length
    if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
    }
    
    if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(""); // Clear email error if valid
    }
      
    try {
      const web3 = new Web3(window.ethereum);

      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(
        DiagnosticRegistration.abi,
        DiagnosticRegistration.networks[networkId].address
      );

      const isRegDoc = await contract.methods
        .isRegisteredDiagnostic(hhNumber)
        .call();

      if (isRegDoc) {
        alert("Diagnostic already exists");
        return;
      }

      await contract.methods
        .registerDiagnostic(
          diagnosticName,
          hospitalName,
          diagnosticLocation,
          email,
          hhNumber,
          password // Include password in the function call
        )
        .send({ from: diagnosticAddress });

      alert("Diagnostic registered successfully!");
      navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering the diagnostic.");
      }
  };
  
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

    const handlehhNumberChange = (e) => {
      const inputhhNumber = e.target.value;
      const phoneRegex = /^\d{6}$/;
      if (phoneRegex.test(inputhhNumber)) {
        sethhNumber(inputhhNumber);
        sethhNumberError("");
      } else {
        sethhNumber(inputhhNumber);
        sethhNumberError("Please enter a 6-digit HH Number.");
      }
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };
  
  
  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
    <NavBar></NavBar>
    <div>
      <div>
        <h2>
          Diagnostic Registration
        </h2>
        <form>
        <div>
            <label
              htmlFor="diagnosticAddress"
            >
              Wallet Public Address
            </label>
            <input
              id="diagnosticAddress"
              name="diagnosticAddress"
              type="text"
              required
              placeholder="Crypto Wallet Public Address"
              value={diagnosticAddress}
              onChange={(e) => setDiagnosticAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="diagnosticName">
              Diagnostic Center Name
            </label>
            <input
              id="diagnosticName"
              name="diagnosticName"
              type="text"
              required
              placeholder="Enter Diagnostic's Center Full Name"
              value={diagnosticName}
              onChange={(e) => setDiagnosticName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="hospitalName"
            >
              Hospital Name
            </label>
            <input
              id="hospitalName"
              name="hospitalName"
              type="text"
              required
              placeholder="Enter Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </div>

            <div className="mb-4">
            <label htmlFor="diagnosticLocation">
              Location 
            </label>
            <input
              type="text"
              id="diagnosticLocation"
              name="diagnosticLocation"
              placeholder="Enter the location of Diagnostic center"
              value={diagnosticLocation}
              onChange={(e) => setDiagnosticLocation(e.target.value)}
            />
            </div>
          
          <div className="mb-4">
            <label className="block font-bold text-white" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your Email-id"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p>{emailError}</p>
            )}
          </div>
            
          <div>
            <label htmlFor="hhNumber">
              HH Number
            </label>
            <input
              id="hhNumber"
              name="hhNumber"
              type="text"
              required
              placeholder="HH Number"
              value={hhNumber}
              onChange={handlehhNumberChange}
            />
            {hhNumberError && (
              <p>{hhNumberError}</p>
            )}
          </div>

          <div className="mb-4">
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p>{passwordError}</p>
              )}
          </div>
            
          <div>
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <p>{confirmPasswordError}</p>
              )}
          </div>
            
        </form>
        <div>
          <button
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            onClick={cancelOperation}
            >
            Close
          </button>
        </div>
      </div>
      </div>
      </div>
  );
};

export default DiagnosticRegistry;
