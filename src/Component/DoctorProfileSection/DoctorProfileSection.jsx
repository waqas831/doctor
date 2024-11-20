import React from "react";
import "./DoctorProfileSection.css";
import starIcon from "../../images/Star 1.svg";
import { useSelector } from "react-redux";
const DoctorProfileSection = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="DoctorProfileSection-otr">
        <div className="DoctorProfileSection-inr-main">
          <div className="DoctorProfileSection-img-otr">
            <img
              className="DoctorProfileSection-img"
              src="https://images.unsplash.com/photo-1724141973274-f3a90b9aa7d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              alt=""
            />
          </div>
          <p className="DoctorProfileSection-name">{user?.name}</p>
          
          <p className="DoctorProfileSection-rating">Professional doctor available 24/7 for patients </p>

          <div className="rating-otr">
            <ul className="star-ul">
              <li className="star-li">
                <img className="star-img" src={starIcon} alt="" />
              </li>
              <li className="star-li">
                <img className="star-img" src={starIcon} alt="" />
              </li>
              <li className="star-li">
                <img className="star-img" src={starIcon} alt="" />
              </li>
              <li className="star-li">
                <img className="star-img" src={starIcon} alt="" />
              </li>
              <li className="star-li">
                <img className="star-img" src={starIcon} alt="" />
              </li>
            </ul>
            {/* <p className="DoctorProfileSection-rating">1055 rating</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileSection;
