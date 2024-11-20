import React from "react";
import "./AnalyticsSection2.css";
import usageImg1 from "../../images/UsageImg1.svg";
import usageImg2 from "../../images/UsageImg2.svg";
import usageImg3 from "../../images/UsageImg3.svg";
import usageArrow from "../../images/usageArrowIcon.svg";
import AnalyticsChart from "../AnalyticsChart/AnalyticsChart";

const AnalyticsSection2 = () => {
  return (
    <>
      <div className="usage-section">
        <div className="usage-section-inr">
          <h3>Usage</h3>
          <div className="time-filter">
            <span>All Times</span> <img src={usageArrow} alt="" />
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <img src={usageImg1} alt="" />
              <div>
                <h4>3,188</h4>
                <p>Total Sessions</p>
              </div>
            </div>
            <div className="stat-item">
              <img src={usageImg2} alt="" />
              <div>
                <h4>3,188</h4>
                <p>Total Minutes</p>
              </div>
            </div>
            <div className="stat-item">
              <img src={usageImg3} alt="" />
              <div>
                <h4>3,188</h4>
                <p>AVG Session Time</p>
              </div>
            </div>
          </div>
        </div>

        <p className="chat-heading">Past Year</p>
        <AnalyticsChart />
        <div className="session-minutes-otr">
          <span className="session">Session</span>
          <span className="Minutes">Minutes</span>
        </div>
        <h3 style={{ marginTop: "30px" }}>Usage Highlights</h3>
      </div>
    </>
  );
};

export default AnalyticsSection2;
