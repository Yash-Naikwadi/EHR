import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const PatientDashBoard = () => {
  const { hhNumber } = useParams(); // Retrieve the hhNumber from the URL parameter

  const navigate = useNavigate();
  
  const viewRecord = () => {
    navigate("/patient/" + hhNumber + "/viewrecords");
  };

  const viewprofile = () => {
    navigate("/patient/" + hhNumber + "/viewprofile");
  };
  

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientPhoneNo, setPatientPhoneNo] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = PatientRegistration.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          PatientRegistration.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(contractInstance);
        setPatientPhoneNo(hhNumber);
        try {
          const result = await contractInstance.methods.getPatientDetails(patientPhoneNo).call();
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
  }, [patientPhoneNo]);

  return (
    <div>
      <NavBar_Logout />
      <div>
        <h2>Patient Dashboard</h2>
        {patientDetails && (
          <p>
            Welcome{" "}
            <span>{patientDetails.name}!</span>
          </p>
        )}
        <div>
          <button
            onClick={viewprofile}
          >
            View Profile
          </button>
          <button
            onClick={viewRecord}
          >
            View Record
          </button>

        </div>
      </div>
    </div>
  );
};

export default PatientDashBoard;
