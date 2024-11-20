import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './AppointmentComp.css'; 
import { Grid } from "@mui/material";

const AppointmentComp = () => {
    return (
        <div className="appointment-comp">
            {/* Navbar */}
            {/* <nav className="appointment-navbar"> */}
            {/* <Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={4} lg={2}>
    <NavLink
      to="dashboard"
      className={({ isActive }) =>
        isActive ? 'nav-button active' : 'nav-button'
      }
    >
      Dashboard
    </NavLink>
  </Grid>

  <Grid item xs={12} sm={6} md={4} lg={2}>
    <NavLink
      to="scheduling"
      className={({ isActive }) =>
        isActive ? 'nav-button active' : 'nav-button'
      }
    >
      Scheduling
    </NavLink>
  </Grid>

  <Grid item xs={12} sm={6} md={4} lg={2}>
    <NavLink
      to="management"
      className={({ isActive }) =>
        isActive ? 'nav-button active' : 'nav-button'
      }
    >
      Management
    </NavLink>
  </Grid>

  <Grid item xs={12} sm={6} md={4} lg={2}>
    <NavLink
      to="report"
      className={({ isActive }) =>
        isActive ? 'nav-button active' : 'nav-button'
      }
    >
      Report
    </NavLink>
  </Grid>

  <Grid item xs={12} sm={6} md={4} lg={2}>
    <NavLink
      to="setting"
      className={({ isActive }) =>
        isActive ? 'nav-button active' : 'nav-button'
      }
    >
      Setting
    </NavLink>
  </Grid>
</Grid> */}

            {/* </nav> */}

            {/* Render the selected route's component */}
            <div className="appointment-content">
                <Outlet /> {/* This is where the nested routes will render */}
            </div>
        </div>
    );
};

export default AppointmentComp;
