// src/components/appointment/DashboardComp.js
import React from 'react';
import Statistics from './dashboardcomp/Statistics'; // Import the Statistics component
import AllAppointments from './dashboardcomp/AllApointments';
import AvailableDoctors from './dashboardcomp/AvailableDoctors';
import './DashboardComp.css'; // Import the CSS file

const DashboardComp = () => {
    return (
        <div className="dashboard-container">
            <Statistics />
            <div >
                <AllAppointments />
                {/* <AvailableDoctors /> */}
            </div>
        </div>
    );
};

export default DashboardComp;
