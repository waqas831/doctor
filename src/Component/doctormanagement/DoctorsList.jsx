// src/components/dashboard/DoctorList.js
import React from "react";
import "./DoctorsList.css";
import { FaCheckCircle, FaPencilAlt, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DoctorList = ({ doctors, openModal }) => {
  const handleEditClick = (e, index) => {
    e.preventDefault(); // Prevent the default behavior of the Link
    openModal("edit", index);
  };

  return (
    <div className="doctor-list">
      <ul>
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <li key={index} className="doctor-item">
              <Link
                to={{
                  pathname: "/doctor-details",
                  state: { doctor }
                }}
                state={{ doctor }} // Pass the doctor data to DoctorDetails
                className="doctor-link"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                />
              </Link>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-hospital">{doctor.hospital}</p>
              </div>

              <div className="doctor-specialization">
                <p>{doctor.specialization}</p>
              </div>
              <div className="doctor-location">
                <p>{doctor.location}</p>
              </div>
              <div className="doctor-icons">
                {doctor.verified && (
                  <FaCheckCircle className="icon verified" title="Verified" />
                )}
                <FaPencilAlt
                  className="icon edit-icon"
                  title="Edit"
                  onClick={(e) => handleEditClick(e, index)} // Prevent navigation and open the edit modal
                />
              </div>
            </li>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </ul>

      {/* Action Buttons */}
      <div className="doctor-actions">
        <button className="action-button" onClick={() => openModal("add")}>
          <FaPlusCircle className="action-icon" /> Add Doctor
        </button>
        <button className="action-button" onClick={() => openModal("remove")}>
          <FaTrashAlt className="action-icon" /> Remove Doctor
        </button>
        <button className="action-button" onClick={() => openModal("verify")}>
          <FaCheckCircle className="action-icon" /> Verify Doctor
        </button>
      </div>
    </div>
  );
};

export default DoctorList;
