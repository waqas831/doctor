import React from 'react';
import { FaCalendarCheck, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa'; // Icons from react-icons
import './AppointmentSummary.css'; // CSS for the component

const AppointmentSummary = () => {
    const appointmentData = [
        { label: 'Total Appointments', value: 120, icon: <FaCalendarCheck /> },
        { label: 'Appointments Scheduled', value: 80, icon: <FaCalendarAlt /> },
        { label: 'Appointments Cancelled', value: 20, icon: <FaTimesCircle /> },
    ];

    return (
        <div className="appointment-summary-container">
            {appointmentData.map((item, index) => (
                <div className="appointment-summary-item" key={index}>
                    <div className="icon">{item.icon}</div>
                    <div className="details">
                        <h4>{item.label}</h4>
                        <p>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentSummary;
