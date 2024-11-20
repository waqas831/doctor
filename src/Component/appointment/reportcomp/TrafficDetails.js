// src/components/report/TrafficDetails.js
import React from 'react';
import { FaUserInjured, FaUserMd, FaDollarSign, FaStethoscope } from 'react-icons/fa'; // Import icons
import './TrafficDetails.css'; // Import the CSS file

const TrafficDetails = () => {
    // Data array for traffic details
    const detailsData = [
        { id: 1, title: "Total Patients", value: 500, icon: <FaUserInjured />, name: 'totalPatients' },
        { id: 2, title: "Available Staff", value: 80, icon: <FaUserMd />, name: 'availableStaff' },
        { id: 3, title: "Average Cost", value: "$250", icon: <FaDollarSign />, name: 'averageCost' },
        { id: 4, title: "Total Consultations", value: 300, icon: <FaStethoscope />, name: 'totalConsultations' },
    ];

    return (
        <div className="traffic-details">
            {detailsData.map((detail) => (
                <div className="traffic-box" key={detail.id} id={detail.name}>
                    <div className="box-icon">{detail.icon}</div>
                    <div className="box-title">{detail.title}</div>
                    <div className="box-value">{detail.value}</div>
                </div>
            ))}
        </div>
    );
};

export default TrafficDetails;
