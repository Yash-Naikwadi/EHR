import React, { useState, useEffect } from "react";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";


const ViewProfile = () => {
  const { hhNumber } = useParams(); // Retrieve the hhNumber from the URL parameter
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      // Check if Web3 is injected by MetaMask or any other provider
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Get the contract instance
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = PatientRegistration.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          PatientRegistration.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contractInstance);
        if (!contract) return;

        try {
          // Call the getPatientDetails function of the smart contract
          const result = await contract.methods.getPatientDetails(hhNumber).call();
          setPatientDetails(result);
        } catch (error) {
          console.error('Error retrieving patient details:', error);
          setError('Error retrieving patient details');
        }
      } else {
        console.log('Please install MetaMask extension');
        setError('Please install MetaMask extension');
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!contract || !hhNumber) return;

      try {
        // Call the getPatientDetails function of the smart contract
        const result = await contract.methods.getPatientDetails(hhNumber).call();
        setPatientDetails(result);
      } catch (error) {
        console.error('Error retrieving patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [contract, hhNumber]);


  const cancelOperation = async () => {
    try {
    navigate("/patient/"+hhNumber);
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  };
  
  return (
    <div>
    <NavBar_Logout></NavBar_Logout>
    <div>
        <div>

        <h1>
          Profile
        </h1>
        {patientDetails && (
            <div>
              <center>
          <p>
            Name : {" "}
            <span>{patientDetails.name}</span>
          </p>
          <p>
            DOB : {" "}
            <span>{patientDetails.dateOfBirth}</span>
          </p>
          <p>
            Gender : {" "}
            <span>{patientDetails.gender}</span>
          </p>    
          <p>
            Blood Group : {" "}
          <span>{patientDetails.bloodGroup}</span>
          </p>
          <p>
            Address : {" "}
            <span>{patientDetails.homeAddress}</span>
          </p>
          <p>
            Email-Id : {" "}
            <span>{patientDetails.email}</span>
          </p>
          </center>
        </div>
        )}
          <div>
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

export default ViewProfile;
