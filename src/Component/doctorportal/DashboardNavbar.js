import React from "react";
import "./DashboardNavbar.css";
import NavLogo from "../../images/Nav-Logo-D.svg";
import Navbell from "../../images/NavbarNotificationIcon.svg";
import NavMenu from "../../images/NavbarMenuIcon.svg";
import navSearchIcon from "../../images/NavbarMagniferIcon.svg";
const DashboardNavbar = () => {
  return (
    <div className="DashboardNavbar-otr">
      <div className="DashboardNavbar-inr">
        <div className="DashboardNavbar-Logo-otr">
          <img className="DashboardNavbar-Logo" src={NavLogo} alt="" />
        </div>

        <div className="page-heading-user-details">
          <div className="for-admin">
            <p className="page-heading">Dashboard</p>
            <div className="nav-input-otr">
              <input
                className="nav-input"
                placeholder="https://dronline.doxy.me/drboston"
              />
              <img className="navSearchIcon" src={navSearchIcon} alt="" />
            </div>
          </div>
          <div className="DashboardNavbar-user">
            <div className="DashboardNavbar-navbell-otr">
              <img className="DashboardNavbar-navbell" src={Navbell} alt="" />
            </div>
            <div className="DashboardNavbar-userDetail">
              <p className="DashboardNavbar-user-name">Alex Robert</p>
              <p className="DashboardNavbar-user-type">Admin</p>
            </div>
            <div className="DashboardNavbar-user-img-otr">
              <img
                className="DashboardNavbar-user-img"
                src="https://images.unsplash.com/photo-1724880438345-f70bd9ee6147?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5M3x8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="DashboardNavbar-menuIcon-otr">
              <img className="DashboardNavbar-menuIcon" src={NavMenu} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
