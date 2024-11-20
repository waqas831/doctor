// src/components/appointment/DashboardComp.js
import React from 'react';
import Statistics from './dashboardcomp/Statistics'; // Import the Statistics component
import AllAppointments from './dashboardcomp/AllApointments';
import AvailableDoctors from './dashboardcomp/AvailableDoctors';
import './DashboardComp.css'; // Import the CSS file
import { Box } from '@mui/material';

const DashboardComp = () => {
    return (
        <div className="dashboard-container">
            <Box display={"flex" } flexDirection={["column"]} justifyContent={"center"} alignContent={"center"}>
                <Box width={["100%"]} m={1}>
                <AllAppointments />
                </Box>
            <Statistics />
             {/* <Box width={["100%","100%"]} m={1}>
             <AvailableDoctors />
             </Box> */}
            </Box>
        </div>
    );
};

export default DashboardComp;
