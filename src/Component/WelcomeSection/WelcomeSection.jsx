import React from "react";
import "./WelcomeSection.css";
import welcomeImg from "../../images/welcome.svg";
import img from "../../images/DashboardWelcomeImg.svg";
import { useSelector } from "react-redux";
const WelcomeSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="WelcomeSection-otr">
        <div className="WelcomeSection-inr">
          <img className="WelcomeSection-heading-1" src={welcomeImg} alt="" />
          <p className="WelcomeSection-heading-2">{user?.name}</p>
          <p className="WelcomeSection-heading-3">
            We're glad to have you on board. Manage your patients efficiently,
            stay connected, and make a difference in their care. Let's get
            started!
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeSection;
