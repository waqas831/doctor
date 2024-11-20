// src/components/doctormanagement/DoctorDetails.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import './DoctorDetails.css';

Modal.setAppElement('#root');

const DoctorDetails = ({ onDeleteDoctor }) => {
    const location = useLocation();
    const { doctor } = location.state || {}; // Get the doctor data passed via Link

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

    if (!doctor) {
        return <div>No doctor details available.</div>;
    }

    // Function to suspend/delete doctor
    const handleSuspendDoctor = () => {
        onDeleteDoctor(doctor.name);
        setIsSuspendModalOpen(false); // Close modal after deletion
    };

    return (
        <div className="doctor-details-container">
            <h1 className="doctor-details-title">{doctor.name}'s Details</h1>
            <div className="doctor-details-card">
                <img src={doctor.image} alt={doctor.name} className="doctor-details-image" />
                <div className="doctor-details-info">
                    <div className="doctor-info-left">
                        <p><strong>Name:</strong></p>
                        <p>{doctor.name}</p>

                        <p><strong>Hospital:</strong></p>
                        <p>{doctor.hospital}</p>

                        <p><strong>Specialization:</strong></p>
                        <p>{doctor.specialization}</p>

                    </div>
                    <div className="doctor-info-right">
                        <p><strong>Experience:</strong></p>
                        <p>{doctor.experience ? `${doctor.experience} Years` : 'N/A'}</p>

                        <p><strong>Verification Status:</strong></p>
                        <p>{doctor.verified ? 'Verified' : 'Unverified'}</p>

                        <p><strong>Location:</strong></p>
                        <p>{doctor.location}</p>
                    </div>
                </div>
            </div>

            {/* Buttons Section */}
            <div className="doctor-actions">
                <button className="action-button feedback" onClick={() => setIsFeedbackModalOpen(true)}>Feedback from Patients</button>
                <button className="action-button contact" onClick={() => setIsContactModalOpen(true)}>Doctor Contact</button>
            </div>

            
            {/* Feedback Modal */}
            <Modal
                isOpen={isFeedbackModalOpen}
                onRequestClose={() => setIsFeedbackModalOpen(false)}
                contentLabel="Patient Feedbacks"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Feedback from Patients</h2>
                <ul>
                    {doctor.feedbacks && doctor.feedbacks.length > 0 ? (
                        doctor.feedbacks.map((feedback, index) => <li key={index}>{feedback}</li>)
                    ) : (
                        <p>No feedback available.</p>
                    )}
                </ul>
                <button className="modal-button" onClick={() => setIsFeedbackModalOpen(false)}>Close</button>
            </Modal>

            {/* Contact Modal */}
            <Modal
                isOpen={isContactModalOpen}
                onRequestClose={() => setIsContactModalOpen(false)}
                contentLabel="Doctor Contact"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>{doctor.name}'s Contact Information</h2>
                <p><strong>Phone:</strong> {doctor.phone}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <button className="modal-button" onClick={() => setIsContactModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
};

export default DoctorDetails;
