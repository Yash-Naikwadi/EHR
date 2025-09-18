import React, { useState, useEffect } from "react";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDiagnosticProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosticDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            DiagnosticRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
        } else {
          setError("Please install MetaMask extension");
        }
      } catch (error) {
        console.error('Error retrieving diagnostic details:', error);
        setError('Error retrieving diagnostic details');
      }
    };

    fetchDiagnosticDetails();
  }, [hhNumber]);

  const cancelOperation = async () => {
    try {
      navigate("/diagnostic/" + hhNumber);
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
            Diagnostic's Profile
          </h1>
          {diagnosticDetails && (
            <div>
              <center>
                <p>
                  Diagnostic Center Name : <span>{diagnosticDetails[1]}</span>
                </p>
                <p>
                  Hospital Name : <span>{diagnosticDetails[2]}</span>
                </p>
                <p>
                  Location : <span>{diagnosticDetails[3]}</span>
                </p>
                <p>
                  Email-Id : <span>{diagnosticDetails[4]}</span>
                </p>
                <p>
                  HH Number : <span>{hhNumber}</span>
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

export default ViewDiagnosticProfile;
