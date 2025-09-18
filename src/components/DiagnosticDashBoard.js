import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";

const DiagnosticDashBoard = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [error, setError] = useState(null);

  const diagnosticUpload = () => {
    navigate("/diagnostic/"+hhNumber+"/diagnosticform");
  };

  const viewDiagnosticProfile = () => {
    navigate("/diagnostic/"+hhNumber+"/viewdiagnosticprofile");
  };

  useEffect(() => {
    const init = async () => {
      // Check if Web3 is injected by MetaMask or any other provider
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contractInstance);

          // Call the getDiagnosticDetails function of the smart contract
          const result = await contractInstance.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
        } catch (error) {
          console.error('Error initializing Web3 or fetching diagnostic details:', error);
          setError('Error initializing Web3 or fetching diagnostic details');
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
      <NavBar_Logout />
      <div>
        <h2>Diagnostic Dashboard</h2>
        {diagnosticDetails && (
          <p>
            Welcome{" "}
            <span>{diagnosticDetails[1]}!</span>
          </p>
        )}
        <div>
          <button
            onClick={viewDiagnosticProfile}
          >
            View Profile
          </button>
          <button
            onClick={diagnosticUpload}
          >
            Create Report
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default DiagnosticDashBoard;
