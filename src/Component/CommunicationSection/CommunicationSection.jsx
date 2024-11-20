import React, { useState } from "react";
import "./CommunicationSection.css";
import chatSend from "../../images/chatSend.svg";
import chatMail from "../../images/chatMail.svg";
const CommunicationSection = () => {
  const [activeTab, setActiveTab] = useState("patient");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="communication-chat-main">
        <div className="communication-tabs-main">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={activeTab === "patient" ? "active" : ""}
                onClick={() => handleTabClick("patient")}
              >
                Patient
              </button>
              <button
                className={activeTab === "admin" ? "active" : ""}
                onClick={() => handleTabClick("admin")}
              >
                Admin
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === "patient" && (
                <div className="patient-list">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="patient-item">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Patient"
                        className="patient-avatar"
                      />
                      <div className="patient-info">
                        <p>Patient 01</p>
                        <p>Cooper</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "admin" && (
                <div className="admin-list">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="admin-item">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Admin"
                        className="admin-avatar"
                      />
                      <div className="admin-info">
                        <p>Admin 01</p>
                        <p>Smith</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="chat-main-communicationa">
          <div className="chat-header">
            <p className="chat-heading">Patient</p>
          </div>
          <div className="chat-body"></div>
          <div className="chat-footer">
            <div className="chat-input-otr">
              <input className="chat-input-inr" placeholder="Message" />
            </div>
            <ul className="chat-ul">
              <li className="chat-li">
                <div className="chat-send-otr">
                  <img className="chat-send" src={chatSend} alt="" />
                </div>
              </li>
              <li className="chat-li">
                <div className="chat-mail-otr">
                  <img className="chat-mail" src={chatMail} alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunicationSection;
