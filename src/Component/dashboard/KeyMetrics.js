// src/components/dashboard/KeyMetrics.js
import React from 'react';
import CommonHeader from './CommonHeader';
import './KeyMetrics.css'; // Import the CSS file
import { FaUserMd, FaUserPlus, FaCalendarAlt } from 'react-icons/fa'; // Import icons
import StatsAndCalendar from './keymatrics/StatsAndCalendar';
import FeeBoxes from './keymatrics/FeeBoxes';

const KeyMetrics = ({ totalPatients, totalDoctors, totalConsultations }) => {
    const patientStatsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [30, 40, 35, 50, 60, 70, 80, 90, 85, 95, 100, 110]
    };

    return (
        <div className="key-metrics">
            <CommonHeader />
            <div className="key-metrics-content">
                <div className="metric-box">
                    <FaUserPlus size={40} />
                    <h3>Total Patients</h3>
                    <p>{totalPatients}</p>
                </div>
                <div className="metric-box">
                    <FaUserMd size={40} />
                    <h3>Total Doctors</h3>
                    <p>{totalDoctors}</p>
                </div>
                <div className="metric-box">
                    <FaCalendarAlt size={40} />
                    <h3>Total Consultations</h3>
                    <p>{totalConsultations}</p>
                </div>
            </div>
            <StatsAndCalendar data={patientStatsData}/>
            <FeeBoxes 
                consultationFee={20} 
                subscriptionFee={20} 
                advertisingFee={20} 
            />
        </div>
    );
};

export default KeyMetrics;