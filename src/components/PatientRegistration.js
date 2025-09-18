import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const PatientRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bg, setBloodGroup] = useState("");
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(""); // Define password state variable
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            PatientRegistration.abi,
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
      !walletAddress ||
      !name ||
      !dateOfBirth ||
      !homeAddress ||
      !hhNumber ||
      !gender ||
      !bg ||
      !email ||
      !walletAddress ||
      !password ||
      !confirmPassword
    )
     {
      alert(
        "You have missing input fields. Please fill in all the required fields."
      );
      return;
    }

    if (hhNumber.length !== 6) {
      alert(
        "You have entered a wrong HH Number. Please enter a 6-digit HH Number."
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

    if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Check if dateOfBirth is in the format dd/mm/yyyy
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateOfBirth)) {
      alert("Please enter Date of Birth in the format dd/mm/yyyy");
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

    // Password validation: minimum length
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

      
    try {
      const web3 = new Web3(window.ethereum);

      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(
        PatientRegistration.abi,
        PatientRegistration.networks[networkId].address
      );

      const isRegPatient = await contract.methods
        .isRegisteredPatient(hhNumber)
        .call();

      if (isRegPatient) {
        alert("Patient already exists");
        return;
      }

      await contract.methods
      .registerPatient(
        walletAddress,
        name,
        dateOfBirth,
        gender,
        bg,
        homeAddress,
        email,
        hhNumber,
        password
      )
      .send({ from: walletAddress });

      alert("Patient registered successfully!");
      navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering the doctor.");
      }
  };
  

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
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

  const cancelOperation = () => {
    navigate("/");
  };

  return (
    <div>
    <NavBar></NavBar>
    <div>
      <div>
        <h2>
         Patient Registration
        </h2>
        <form>
          <div>
            <label
              htmlFor="walletAddress"
            >
              Wallet Public Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              placeholder="Crypto Wallet's Public Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            </div>
          <div>
            <label htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date" // Use type="date" for date picker
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
            
          <div>
          <label htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="gender">
            Blood Group
          </label>
          <select
            id="bg"
            name="bg"
            required
            value={bg}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="B+">O+</option>
            <option value="B-">O-</option>
            <option value="B+">AB+</option>
            <option value="B-">AB-</option>
          </select>
        </div>

          <div>
            <label htmlFor="homeAddress">
              Home Address
            </label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              placeholder="Enter your Permanent Address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            />
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
              placeholder="Enter your HH Number"
              value={hhNumber}
              onChange={handlehhNumberChange}
            />
            {hhNumberError && (
              <p>{hhNumberError}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email">
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


          <div>
            <button
              type="button"
              onClick={handleRegister}
              disabled={!contract || isLoading}
            >
              Register
            </button>
            <button
              onClick={cancelOperation}
              >
              Close
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
  );
};

export default PatientRegistry;
