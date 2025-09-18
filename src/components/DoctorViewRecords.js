import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const DoctorViewPatient = () => {
  const { hhNumber } = useParams(); // Retrieve the hhNumber from the URL parameter
  const navigate = useNavigate();

  const doctorForm = () => {
    navigate("/doctor/"+hhNumber+"/doctorform");
  };

  const viewPatientRecords = () => {
    navigate("/patient/"+hhNumber+"/viewrecords");
  };

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
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
        try {
          const result = await contractInstance.methods.getPatientDetails(hhNumber).call();
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
  }, [hhNumber]);

  const cancelOperation = () => {
    navigate(-1);
  };

  return (
    <div>
    <NavBar_Logout></NavBar_Logout>
    <div>
      <h2>Patient's Profile</h2>
      <br/>
        {patientDetails && (
          <center>
          <p>
          Name : {" "}
            <span>{patientDetails.name}</span>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          DOB : {" "}
            <span>{patientDetails.dateOfBirth}</span>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          Gender : {" "}
            <span>{patientDetails.gender}</span>
          <br />
          <br />
          BloodGroup : {" "}
            <span>{patientDetails.bloodGroup}</span>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          Address : {" "}
            <span>{patientDetails.homeAddress}</span>{"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
            <br></br><br></br>
          Email-Id : {" "}
            <span>{patientDetails.email}</span>
        </p>
        </center>
      )}
      </div>
      <div>
      <center>
      <button
            onClick={viewPatientRecords}
          >
            View Record
          </button>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          <button
          onClick={doctorForm}
          >
          Prescription Consultancy
          </button>
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
          <button
            onClick={cancelOperation}
          >
            Close
          </button>
        </center>
      </div>
      </div>
  );
};

export default DoctorViewPatient;
