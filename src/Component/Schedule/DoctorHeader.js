import React from 'react';
import './DoctorHeader.css';

const DoctorHeader = () => {
    return (
        <div className="doctor-header">
            <img 
                src="https://via.placeholder.com/80" 
                alt="Dr. Josh Smith" 
                className="profile-image" 
            />
            <div className="doctor-info">
                <h1 className="doctor-name">Hello, Dr. Josh Smith!</h1>
                <p className="doctor-title">Sr. Neurologist</p>
            </div>
        </div>
    );
};

export default DoctorHeader;
