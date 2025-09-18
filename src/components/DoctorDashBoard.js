import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";

const DoctorDashBoardPage = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);

  
  const viewPatientList = () => {
    navigate("/doctor/"+hhNumber+"/patientlist");
  };

  const viewDoctorProfile = () => {
    navigate("/doctor/"+hhNumber+"/viewdoctorprofile");
  };

  useEffect(() => {
    const init = async () => {
      // Check if Web3 is injected by MetaMask or any other provider
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DoctorRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

          // Call the getDoctorDetails function of the smart contract
          const result = await contractInstance.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
        } catch (error) {
          console.error('Error initializing Web3 or fetching doctor details:', error);
          setError('Error initializing Web3 or fetching doctor details');
        }
      } else {
        console.error('Please install MetaMask extension');
        setError('Please install MetaMask extension');
      }
    };

    init();
  }, [hhNumber]);

  return (
    <div>
    <NavBar_Logout></NavBar_Logout>
    <div>
      <h2>Doctor Dashboard</h2>
        {doctorDetails && (
          <p>
            Welcome{" "}
            <span>{doctorDetails[1]}!</span>
          </p>
        )}
      <div>
        <button
          onClick={viewDoctorProfile}
        >
          View Profile
        </button>
        
        <button
        onClick={viewPatientList}
      >
        View Patient List
        </button>
      
      </div>
      </div>
      </div>
  );
};

export default DoctorDashBoardPage;
