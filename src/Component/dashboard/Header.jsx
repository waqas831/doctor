
import React from "react";
import "./Header.css";
import GplineImg from "../../assets/Group 2 1.png";
import Avatar from "react-avatar";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaEllipsisV } from "react-icons/fa";
import { Box, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoChatbubblesOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { CloseFullscreen } from "@mui/icons-material";
import { useSelector } from "react-redux";
import LogoutBtn from "../auth/LogoutBtn";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(null);

  const { user } = useSelector((state) => state.auth);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <header className="header-bar">
      <div className="header-left">
        <Box display={"flex"}>
          <Box display={["flex", "flex", "flex", "none"]}>
            <Button onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "black" }} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Box display={"flex"} justifyContent={"end"}>
                <Button onClick={closeDrawer}><CloseFullscreen/></Button>
              </Box>
              <Box p={4}>
                <div>
                  <h3>General</h3>
                  <Link to="/dashboard" onClick={() => { handleButtonClick("/dashboard"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "/dashboard" ? "active" : ""}`}>
                      <IoHomeOutline className="sidebar-icon" />
                      <span>Dashboard</span>
                    </button>
                  </Link>
                  {/* <Link to="/meeting-history" onClick={() => { handleButtonClick("/meeting-history"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "/meeting-history" ? "active" : ""}`}>
                      <IoDocumentTextOutline className="sidebar-icon" />
                      <span>Meeting History</span>
                    </button>
                  </Link> */}
                  <Link to="/doctors-management" onClick={() => { handleButtonClick("patientManagement"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "patientManagement" ? "active" : ""}`}>
                      <IoPersonOutline className="sidebar-icon" />
                      <span>Doctors Management</span>
                    </button>
                  </Link>
                  <Link to="/admin-consultation" onClick={() => { handleButtonClick("consultation"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "consultation" ? "active" : ""}`}>
                      <IoChatbubblesOutline className="sidebar-icon" />
                      <span>Consultation</span>
                    </button>
                  </Link>
                  <Link to="/appointments/dashboard" onClick={() => { handleButtonClick("appointments"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "appointments" ? "active" : ""}`}>
                      <IoCalendarOutline className="sidebar-icon" />
                      <span>Appointments</span>
                    </button>
                  </Link>
                  <Link to="/payment-calculation" onClick={() => { handleButtonClick("paymentCalculation"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "paymentCalculation" ? "active" : ""}`}>
                      <IoHomeOutline className="sidebar-icon" />
                      <span>Payment & Calculation</span>
                    </button>
                  </Link>
                  <Link to="/admin-reports" onClick={() => { handleButtonClick("reports"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "reports" ? "active" : ""}`}>
                      <IoHomeOutline className="sidebar-icon" />
                      <span>Reports</span>
                    </button>
                  </Link>
                  {/* <Link to="/analysis" onClick={() => { handleButtonClick("analysis"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "analysis" ? "active" : ""}`}>
                      <IoAnalyticsOutline className="sidebar-icon" />
                      <span>Analysis</span>
                    </button>
                  </Link> */}
                  <Link to="/activity-logs" onClick={() => { handleButtonClick("activityLogs"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "activityLogs" ? "active" : ""}`}>
                      <IoLogOutOutline className="sidebar-icon" />
                      <span>Activity Logs</span>
                    </button>
                  </Link>
                </div>
                {/* <div className="sidebar-section">
                  <h3 className="text-black">Communication</h3>
                  <Link to="/messages" onClick={() => { handleButtonClick("messages"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "messages" ? "active" : ""}`}>
                      <IoChatbubblesOutline className="sidebar-icon" />
                      <span>Messages</span>
                    </button>
                  </Link>
                  <Link to="/calls" onClick={() => { handleButtonClick("calls"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "calls" ? "active" : ""}`}>
                      <IoPersonOutline className="sidebar-icon" />
                      <span>Calls</span>
                    </button>
                  </Link>
                </div> */}
                {/* <div className="sidebar-section"> */}
                  {/* <h3 className="text-black">Automated Tracking System</h3> */}
                  {/* <Link to="/doctors-activity" onClick={() => { handleButtonClick("doctorsActivity"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "doctorsActivity" ? "active" : ""}`}>
                      <IoAnalyticsOutline className="sidebar-icon" />
                      <span>Doctors Activity</span>
                    </button>
                  </Link>
                  <Link to="/appointment-logging" onClick={() => { handleButtonClick("appointmentLogging"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "appointmentLogging" ? "active" : ""}`}>
                      <IoCalendarOutline className="sidebar-icon" />
                      <span>Appointment Logging</span>
                    </button>
                  </Link> */}
                  {/* <Link to="/payment-calculation" onClick={() => { handleButtonClick("paymentCalculation"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "paymentCalculation" ? "active" : ""}`}>
                      <IoHomeOutline className="sidebar-icon" />
                      <span>Payment & Calculation</span>
                    </button>
                  </Link> */}
                  {/* <Link to="/audit-reconciliation" onClick={() => { handleButtonClick("auditReconciliation"); closeDrawer(); }}>
                    <button className={`sidebar-button ${activeButton === "auditReconciliation" ? "active" : ""}`}>
                      <IoDocumentTextOutline className="sidebar-icon" />
                      <span>Audit & Reconciliation</span>
                    </button>
                  </Link> */}
                {/* </div> */}
                <div>
                  <div>
                    {/* <Link to={"/"} onClick={closeDrawer}>
                      <img src={logOutIcon} alt="" />
                      Logout
                    </Link> */}
                    {/* <Link to={"/"} style={{color:"red",fontWeight:"bold"}}>
                <Box display={"flex"}>
                <img src={logOutIcon} alt="" />
                <Typography fontWeight={"bold"} mx={2}>Logoutfdf</Typography>
                </Box> */}
                  {/* </Link> */}
                  <LogoutBtn/>
                  </div>
                  <p className="txt-help">Help Center</p>
                </div>
              </Box>
            </Drawer>
          </Box>
          <img src={GplineImg} alt="Gpline Logo" className="logo" />
        </Box>
      </div>
      <div className="header-right">
        <div className="notification">
          <IoNotificationsOutline className="icon" />
        </div>
        <div className="profile-info">
          <p className="name">{user?.name}</p>
          <p className="role">{user?.role}</p>
        </div>
        <Avatar name="Admin" size="40" round={true} className="profile-pic" />
        {/* <FaEllipsisV className="icon" /> */}
      </div>
    </header>
  );
};

export default Header;
