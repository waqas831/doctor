import React from "react";
import "./DoctorDashboard.css";
import PatientProfile from "./PatientProfile";
import CurrentMedication from "./CurrentMedication";
import Vitals from "./Vitals";
import Note from "./Note";
import LabResults from "./LabResults"; // Assuming you have LabResults component

const Dashboard = ({ patient }) => {
  return (
    <main className="dashboard">
      <PatientProfile patient={patient} />
      <div className="grid-container">
        <CurrentMedication />
        <Vitals />
      </div>
      <div className= "doctor-dashboard">
        <Note />
      </div>
      <LabResults />
    </main>
  );
};

export default Dashboard;
