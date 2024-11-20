// src/components/appointment/ManagementComp.js
import React, { useState } from 'react';
import DoctorManagement from './managementcomp/doctormanagement/DoctorComp'; // Assuming these are the correct paths
import PatientManagement from './managementcomp/patientmanagement/PatientComp';
import { FaUserMd, FaUserInjured } from 'react-icons/fa';
import './ManagementComp.css';

const ManagementComp = () => {
    const [activeComponent, setActiveComponent] = useState('doctor'); // Default to Doctor Management

    // Function to handle component switching
    const handleSwitchComponent = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="management-container">
            {/* Navbar for Doctor and Patient Management */}
            <div className="management-navbar">
                <button
                    className={`nav-button ${activeComponent === 'doctor' ? 'active' : ''}`}
                    onClick={() => handleSwitchComponent('doctor')}
                >
                    <FaUserMd className="icon" /> Doctor Management
                </button>
                <button
                    className={`nav-button ${activeComponent === 'patient' ? 'active' : ''}`}
                    onClick={() => handleSwitchComponent('patient')}
                >
                    <FaUserInjured className="icon" /> Patient Management
                </button>
            </div>

            {/* Conditionally render the selected component */}
            <div className="management-content">
                {activeComponent === 'doctor' && <DoctorManagement />}
                {activeComponent === 'patient' && <PatientManagement />}
            </div>
        </div>
    );
};

export default ManagementComp;
