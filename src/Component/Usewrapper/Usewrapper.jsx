import React from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import "./Usewrapper.css";
const Usewrapper = ({ children, title }) => {
  return (
    <>
      <div className="useWrapper-main">
        <DashboardNavbar title={title} />
        <div className="Dashboard-body">
          <DashboardSidebar />
          <div className="dashboard-content">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usewrapper;
