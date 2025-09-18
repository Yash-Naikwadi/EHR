import React, { useState, useEffect } from "react";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDoctorProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contract = new web3Instance.eth.Contract(
            DoctorRegistration.abi,
            deployedNetwork && deployedNetwork.address
          );

          const result = await contract.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
        } else {
          setError("Please install MetaMask extension");
        }
      } catch (error) {
        console.error('Error retrieving doctor details:', error);
        setError('Error retrieving doctor details');
      }
    };

    fetchDoctorDetails();
  }, [hhNumber]);

  const cancelOperation = async () => {
    try {
      navigate("/doctor/" + hhNumber);
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
            Doctor's Profile
          </h1>
          {doctorDetails && (
            <div>
              <center>
                <p>
                  Name : <span>{doctorDetails[1]}</span>
                </p>
                <p>
                  DOB : <span>{doctorDetails[3]}</span>
                </p>
                <p>
                  Gender : <span>{doctorDetails[4]}</span>
                </p>
                <p>
                  Hospital Name : <span>{doctorDetails[2]}</span>
                </p>
                <p>
                  Specialization : <span>{doctorDetails[6]}</span>
                </p>
                <p>
                  Department : <span>{doctorDetails[7]}</span>
                </p>
                <p>
                  Designation : <span>{doctorDetails[8]}</span>
                </p>
                <p>
                  Work Experience : <span>{doctorDetails[9]}</span>
                </p>
                <p>
                  Email-Id : <span>{doctorDetails[5]}</span>
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

export default ViewDoctorProfile;
