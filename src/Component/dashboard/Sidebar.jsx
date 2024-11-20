import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Sidebar.css'; 
import { IoHomeOutline, IoChatbubblesOutline, IoPersonOutline, IoCalendarOutline, IoLogOutOutline } from 'react-icons/io5';

import LogoutBtn from '../auth/LogoutBtn';
import { Box } from '@mui/material';

const Sidebar = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
    <Box sx={{ display: { xs: 'none', md: 'none' ,lg: 'block'} }}>
            <div className="sidebar">
        <div className="sidebar-section">
            <h3>General</h3>
            <Link to="/dashboard">
                <button 
                    className={`sidebar-button ${activeButton === '/dashboard' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('/dashboard')}
                >
                    <IoHomeOutline className="sidebar-icon" />
                    <span>Dashboard</span>
                </button>
            </Link>
           
                <Link to="/doctors-management">
                    <button 
                        className={`sidebar-button ${activeButton === 'patientManagement' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('patientManagement')}
                    >
                        <IoPersonOutline className="sidebar-icon" /> <span >Doctors Management</span>
                    </button>
                </Link>
                <Link to="/admin-consultation">
                    <button 
                        className={`sidebar-button ${activeButton === 'consultation' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('consultation')}
                    >
                        <IoChatbubblesOutline className="sidebar-icon" /> <span >Consultation</span>
                    </button>
                </Link>
                <Link to="/appointments/dashboard">
                    <button 
                        className={`sidebar-button ${activeButton === 'appointments' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('appointments')}
                    >
                        <IoCalendarOutline className="sidebar-icon" /> <span>Appointments</span>
                    </button>
                </Link>
               
                <Link to="/activity-logs">
                    <button 
                        className={`sidebar-button ${activeButton === 'activityLogs' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('activityLogs')}
                    >
                        <IoLogOutOutline className="sidebar-icon" /> <span >Activity Logs</span>
                    </button>
                </Link>
                <Link to="/payment-calculation">
                    <button 
                        className={`sidebar-button ${activeButton === 'paymentCalculation' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('paymentCalculation')}
                    >
                        <IoHomeOutline className="sidebar-icon" /> <span >Payment & Calculation</span>
                    </button>
                </Link>
                <Link to="/admin-reports">
                    <button 
                        className={`sidebar-button ${activeButton === 'reports' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('reports')}
                    >
                        <IoHomeOutline className="sidebar-icon" /> <span >Reports</span>
                    </button>
                </Link>
            </div>
           
            <div className="sidebar-logout-otr">
          <div className="sidebar-logout">
     
                  <LogoutBtn/>
                  </div>
                  <p className="txt-help">Help Center</p>
     </div>
     </div> 
    
    </Box> 
    
    );
};

export default Sidebar;
