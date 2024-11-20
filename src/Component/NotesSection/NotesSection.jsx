import React from "react";
import "./NotesSection.css";
import singIcon from "../../images/maki_doctor.svg";
const NotesSection = () => {
  return (
    <>
      <div className="NotesSection-otr">
        <div className="NotesSection-inr">
          <div className="NotesSection-header">
            <p className="NotesSection-heading">Notes</p>
            <p className="NotesSection-all">See All</p>
          </div>
          <div className="notes-body">
            <ul className="notes-ul">
              <li className="notes-li">
                the patient need to get full amount of test
              </li>
              <li className="notes-li">
                the patient need to get full amount of test
              </li>
              <li className="notes-li">
                the patient need to get full amount of test
              </li>
              <li className="notes-li">
                the patient need to get full amount of test
              </li>
            </ul>
            <div className="notes-btn-otr">
              <div className="notes-btn-inr">Save Note</div>
            </div>
          </div>
          <div className="notes-footer">
            <div className="notes-amt-otr">
              <div className="sign-docName">
                <p className="notes-amt">
                  Note: <span className="notes-count">1</span>
                </p>
                <div className="sign-docName-inr">
                  <img className="sign" src={singIcon} alt="" />
                  <p className="docName">Dr Boston</p>
                </div>
              </div>
              <p className="notes-date">28 nov 2018</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesSection;
