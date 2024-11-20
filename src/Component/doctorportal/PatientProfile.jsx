import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons from react-icons
import './PatientProfile.css'; // Import the component's CSS file
import patientImage from '../../assets/ProfileImg.png'; // Import the image from assets

const PatientProfile = ({ patient }) => {
    return (
        <div className="patient-profile">
            <div className="profile-grid">
                {/* First row: Image, Name, and Patient Details */}
                <div className="image-name-container">
                    <div className="patient-image-container">
                        <img
                            src={patientImage} // Use the local image
                            alt="Patient"
                            className="patient-image"
                        />
                        <div className="patient-name-container">
                            <h2 className="patient-name">{patient.name}</h2>
                            <p className="patient-type">{patient.type}</p>
                        </div>
                    </div>
                    <div className="patient-info-container">
                        <div className="patient-detail">
                            <p className="detail-label">Patient ID</p>
                            <p className="detail-value">{patient.id}</p>
                        </div>
                        <div className="patient-detail">
                            <p className="detail-label">Date of Birth</p>
                            <p className="detail-value">{patient.dob}</p>
                        </div>
                        <div className="patient-detail">
                            <p className="detail-label">Last Appointment</p>
                            <p className="detail-value">{patient.lastAppointment}</p>
                        </div>
                        <div className="patient-detail">
                            <p className="detail-label">Contact Information</p>
                            <p className="detail-value">{patient.contactInfo}</p>
                        </div>
                    </div>
                </div>
                {/* Second row: Additional Info and Contact Buttons */}
                <div className="additional-contact-container">
                    <div className="additional-info">
                        <div className="info-row">
                            <div className="info-item">
                                <p className="info-label">DOP</p>
                                <p className="info-value">{patient.dop}</p>
                            </div>
                            <div className="info-item">
                                <p className="info-label">Age</p>
                                <p className="info-value">{patient.age}</p>
                            </div>
                        </div>
                        <div className="info-row">
                            <div className="info-item">
                                <p className="info-label">Weight</p>
                                <p className="info-value">{patient.weight}</p>
                            </div>
                            <div className="info-item">
                                <p className="info-label">Height</p>
                                <p className="info-value">{patient.height}</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-buttons">
                        <button className="contact-button">
                            <FaEnvelope /> Message
                        </button>
                        <button className="contact-button">
                            <FaPhone /> Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
