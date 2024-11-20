import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './AppointmentComp.css'; 

const AppointmentComp = () => {
    return (
        <div className="appointment-comp">
            {/* Navbar */}
            <nav className="appointment-navbar">
                <NavLink
                    to="dashboard"
                    className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
                >
                    Dashboard
                </NavLink>
                {/* <NavLink
                    to="scheduling"
                    className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
                >
                    Scheduling
                </NavLink>
                <NavLink
                    to="management"
                    className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
                >
                    Management
                </NavLink>
                <NavLink
                    to="report"
                    className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
                >
                    Report
                </NavLink>
                <NavLink
                    to="setting"
                    className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
                >
                    Setting
                </NavLink> */}
            </nav>

            {/* Render the selected route's component */}
            <div className="appointment-content">
                <Outlet /> {/* This is where the nested routes will render */}
            </div>
        </div>
    );
};

export default AppointmentComp;
