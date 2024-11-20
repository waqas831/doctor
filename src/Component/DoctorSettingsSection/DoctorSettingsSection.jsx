import React, { useState } from "react";
import "./DoctorSettingsSection.css";
import arrowBackIcon from "../../images/arrowback.svg";
import { Link } from "react-router-dom";
import passwordEye from "../../images/passwordEye.svg";
import expandArrowIcon from "../../images/expandArrowIcon.svg";
import linkShare1 from "../../images/LinkShare1.svg";
import linkShare2 from "../../images/LinkShare2.svg";
import linkShare3 from "../../images/LinkShare3.svg";
const DoctorSettingsSection = () => {
  const [browserToggle, setBrowserToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [textMessageToggle1, setTextMessageToggle1] = useState(false);
  const [textMessageToggle2, setTextMessageToggle2] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-tab-otr">
            <h2>Personal Info</h2>
            <p className="desc-profile">
              Choose How To Represent Yourself To Your Patients And Co-Workers.
            </p>
            <h2>Professional Info</h2>
            <p>
              Share Your Professional Information To Allow For A More
              Personalized Experience.
            </p>
          </div>
        );
      case "account":
        return (
          <div className="account-tab-otr">
            <h2>Delete account</h2>
            <p>permanently delete your account</p>
            <div className="password-container">
              <h2>Current Password</h2>
              <div className="input-action">
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <img src={passwordEye} alt="" />
                    ) : (
                      <img src={passwordEye} alt="" />
                    )}
                  </button>
                </div>
                <button className="delete-account-button" disabled>
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          //   <div>
          //     <h2>Notification Settings</h2>
          //     <p>Set up your notification preferences.</p>
          //   </div>
          <div className="checkin-notification-container">
            <div className="notification-main">
              <div className="header">
                <h2>Check-In Notification</h2>
                <button className="expand-btn" onClick={toggleExpand}>
                  <img src={expandArrowIcon} alt="" />
                  {isExpanded ? "Close" : "Expand"}
                </button>
              </div>
              <p className="description">
                Choose How You Want To Be Notified When Your Patient Arrive In
                The Waiting Room.
              </p>

              {isExpanded && (
                <div className="toggle-options">
                  <div className="option">
                    <label>Browser</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={browserToggle}
                        onChange={() => setBrowserToggle(!browserToggle)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="option">
                    <label>Email</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={emailToggle}
                        onChange={() => setEmailToggle(!emailToggle)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="option">
                    <label>Text Message</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={textMessageToggle1}
                        onChange={() =>
                          setTextMessageToggle1(!textMessageToggle1)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="option">
                    <label>Text Message</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={textMessageToggle2}
                        onChange={() =>
                          setTextMessageToggle2(!textMessageToggle2)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="option">
                    <label>I Want Notifications For:</label>
                    <select>
                      <option>Done Deal</option>
                      <option>Another Option</option>
                    </select>
                  </div>
                  <button className="update-btn">Update</button>
                </div>
              )}
            </div>
            <div className="chat-main">
              <h2>Check-In Notification</h2>
              <p>
                choose the sound you hear when you receive a new chat massage.
              </p>
            </div>
          </div>
        );
      case "link-sharing":
        return (
          <div className="print-options-container">
            <h2>Print</h2>
            <p className="description">
              Educate Your Patient About Telehealth With Brochures, Flyers, And
              Images For Social Media.
            </p>
            <div className="option-cards">
              <div className="option-card">
                <img src={linkShare1} alt="" />
                <p>Get Brochures</p>
              </div>
              <div className="option-card">
                <img src={linkShare2} alt="" />
                <p>Get Flyers</p>
              </div>
              <div className="option-card">
                <img src={linkShare3} alt="" />
                <p>Get Social Media</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="DoctorSettingsSection-otr">
        <Link to={"/userDashboard"} className="DoctorSettingsSection-heading">
          <img
            className="DoctorSettingsSection-arrowback"
            src={arrowBackIcon}
            alt=""
          />
          Back To Dashboard
        </Link>
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={activeTab === "link-sharing" ? "active" : ""}
            onClick={() => setActiveTab("link-sharing")}
          >
            Link Sharing
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </>
  );
};

export default DoctorSettingsSection;
