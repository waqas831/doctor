
import AppointmentSchedule from "../../Component/AppointmentSchedule/AppointmentSchedule";

import Usewrapper from "../../Component/Usewrapper/Usewrapper";

import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useEffect } from "react";
import { createContext, useContext } from 'react';
import React, { useState } from "react";
import axiosInstance from "../../Component/interceptors/AxiosInstance";

const PatientContext = createContext();

// Export custom hook to access patient data from other components
export const usePatient = () => useContext(PatientContext);

const AppointmentScheduleView = () => {
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient


  useEffect(() => {
    // Always perform login to fetch a new token
    loginAndFetchToken();
  }, []);

  // Function to login and get the token
  const loginAndFetchToken = async () => {
    try {
      // Call your login endpoint with the user's credentials
      const response = await axiosInstance.post('/api/v0.1/auth/login', {
        email: 'Admin@gpline.com',  // this is the username
        password: 'Admin@123',        // and official password #DEFAULT
      });

      // Extract the token from the response
      const token = response.data.token;  // Adjust this based on the actual response structure

      // Store the token in localStorage
      localStorage.setItem('token', token);
      //console.log("Token stored:", token);

      // Fetch patients with the new token
      fetchPatients(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  const fetchPatients = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Make a GET request to fetch appointment and patient data
      const response = await axiosInstance.get('/api/v0.1/Appointment/GetAppointmentWithPatientAndDoctor', {
        headers: {
          Authorization: `Bearer ${token}`, // this checked as well
        },
        params: {
          IsDetail: true, // Pass any necessary parameters
          //Doctor: "Ahmed ali",

        },
      });

      // Update the state with the fetched data
      setUsers(response.data);

      // Log the data to the console to confirm it's working
      //console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
    //setSelectedPatient(user); // Store the entire user object here


  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = (action, user) => {
    //if (!user) {
    //console.error("User not found");
    //return;
    //}

    if (action === "Join Consultation") {
      setSelectedPatient({
        name: user.patient?.name || "",
        DOB: user.patient?.dateOfBirth || "",
        contactno: user.patient?.contactInformation || "",
        patient_email: user.patient?.email || "",
        Gender: user.patient?.gender || "",
        //doctor_email: user.doctor?.email || "",
    
        // Additional fields as needed
      });
      navigate("/consultation", {
        state: {
          patient: {
            name: user.patient.name, DOB: user.patient.dateOfBirth,
            contactno: user.patient.contactInformation, Gender: user.patient.gender
          }
        }
      }); // sending user name to the consultation page
    }
    handleClose();
  };



  return (
    <>
      <Usewrapper title="Patients Management">
        <AppointmentSchedule />
      </Usewrapper>





    </>

  );
}


export default AppointmentScheduleView;
