import React, { useState } from "react";
import "./AnalyticsSection.css";
const AnalyticsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const patients = [
    {
      name: "Alvera",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Voice Call",
      fee: 1000,
    },
    {
      name: "Loma",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Celine",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Rachel",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Alphonso",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Rhoda",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "In-Person",
      fee: 1000,
    },
    {
      name: "Darryl",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Velda",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Heidi",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Audio Call",
      fee: 1000,
    },
    {
      name: "Aracely",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Colby",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
    {
      name: "Elizabeth",
      gender: "Female",
      dob: "15/08/2024",
      typeOfConsultation: "Video Call",
      fee: 1000,
    },
  ];
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="patient-overview">
        <div className="header">
          <div className="search-bar-otr">
            <input
              type="text"
              placeholder="Search Patients"
              className="search-bar"
              value={searchQuery} // Bind the input value to the search query state
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as the user types
            />
          </div>
          {/* <button className="add-patient-button">Add New Patients</button> */}
        </div>
        <div className="patient-table-otr">
          <h3>Patients Overview</h3>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient Names</th>
                <th>Gender</th>
                <th>Date Of Birth</th>
                <th>Type Of Consultation</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>
                    <a href="#">{patient.name}</a>
                  </td>
                  <td>{patient.gender}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.typeOfConsultation}</td>
                  <td>{patient.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer-buttons">
          <button className="generate-report">Generate Report</button>
          <button className="send-report">Send Report</button>
        </div>
      </div>
    </>
  );
};

export default AnalyticsSection;
