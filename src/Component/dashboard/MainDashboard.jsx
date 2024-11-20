
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import StatsBox from "./StatsBox";
import PatientStats from "./PatientStats";
import TopDoctors from "./TopDoctors";
import Calendar from "react-calendar";
import "./MainDashboard.css";
import "react-calendar/dist/Calendar.css";
import { Box } from "@mui/material";
//import BACKEND_LOCAL from "../../Api";
import axios from "axios";
import { useSelector } from "react-redux";
const MainDashboard = ({
  name,
  patientStatsData,
  topDoctorsData,
}) => {
 
  const backendlink = process.env.REACT_APP_BACKEND_LOCAL;

  const navigate = useNavigate(); 
  const token = localStorage.getItem("authToken");
  
  const [totalDoc, setTotalDoc] = useState(''); 
  const [totalPatients, setTotalPatients] = useState('');
  const [totalAppointments, setTotalAppointments] = useState('');
  const [totalEarnings, setTotalEarnings] = useState('');
  const [loading, setLoading] = useState({ doctors: true, patients: true, appointments: true, earnings: true });

  const { user } = useSelector((state) => state.auth);
const back = process.env.REACT_APP_BACKEND_LOCAL;
  const doctor = async () => {
    try {
      const res = await axios.get(`${backendlink}/api/v0.1/Doctor`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalDoc(res.data);
      setLoading(prev => ({ ...prev, doctors: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${backendlink}/api/v0.1/Patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalPatients(res.data);
      setLoading(prev => ({ ...prev, patients: false }));
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${backendlink}/api/v0.1/Appointment/GetAppointmentWithPatientAndDoctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalAppointments(res.data);
      setLoading(prev => ({ ...prev, appointments: false }));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchTotalEarnings = async () => {
    try {
      const res = await axios.get(`${backendlink}/api/v0.1/Payment/GetTransectionDetails`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalEarnings(res.data);
      setLoading(prev => ({ ...prev, earnings: false }));
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  };

  const statsData = [
    { color: "#B7C8FF", imageSrc: require("../../assets/Stethoscope.png"), title: "Total Doctors", count: loading.doctors ? '...' : totalDoc.length },
    { color: "#BCEAFE", imageSrc: require("../../assets/User Plus.png"), title: "Total Patients", count: loading.patients ? '...' : totalPatients.length },
    { color: "#C4E5B0", imageSrc: require("../../assets/Calendar.png"), title: "Total Appointments", count: loading.appointments ? '...' : totalAppointments.length },
    { color: "#F4C8FF", imageSrc: require("../../assets/Money Bag.png"), title: "Total Earnings", count: loading.earnings ? '...' : totalEarnings.totalAmount },
  ];

  const handleButtonClick = (destination) => {
    navigate(`/${destination}`);
  };

  useEffect(() => {
    doctor();
    fetchPatients();
    fetchAppointments();
    fetchTotalEarnings();
  }, []);

  return (
    <div className="main-dashboard">
      <div className="welcome-container">
        <h1 className="welcome-heading">Welcome, {user?.name}</h1>
        <h1 className="welcome-name">{name}</h1>
      </div>
      <div style={{ marginTop: "30px" }}>
        <p>Manage patients and doctor information here.</p>
      </div>
      <div className="stats-boxes">
        {statsData.map((item, index) => (
          <StatsBox
            key={index}
            color={item.color}
            imageSrc={item.imageSrc}
            title={item.title}
            count={item.count}
          />
        ))}
      </div>
      <div className="dashboard-content">
        <PatientStats data={patientStatsData} />
      </div>
    </div>
  );
};

export default MainDashboard;