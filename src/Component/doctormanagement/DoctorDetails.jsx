// src/components/doctormanagement/DoctorDetails.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DoctorDetails.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const DoctorDetails = ({ onDeleteDoctor }) => {
    const location = useLocation();
    const { doctor } = location.state || {};

   
    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

    if (!doctor) {
        return <div>No doctor details available.</div>;
    }

    const handleSuspendDoctor = () => {
        onDeleteDoctor(doctor.name);
        setIsSuspendModalOpen(false);
    };

    return (
        <>
            <p style={{margin:"5px"}}><Link to={"/doctors-management"}><ArrowBackOutlinedIcon/></Link></p>

            <div className="doctor-details-container">
                <h1 className="doctor-details-title">{doctor.userName}'s Details</h1>
                <div className="doctor-details-card">
                    <img src={doctor.profilePictureUrl} alt={doctor.name} className="doctor-details-image" />
                    <div className="doctor-details-info">
                        <div className="doctor-info-left">
                            <p><strong>Name:</strong></p>
                            <p>{doctor.userName}</p>

                            <p><strong>Hospital:</strong></p>
                            <p>GP Line</p>

                            <p><strong>Specialization:</strong></p>
                            <p>{doctor.specialization}</p>
                        </div>
                        <div className="doctor-info-right">
                            <p><strong>Experience:</strong></p>
                            <p>{doctor.experience ? `${doctor.experience} Years` : 'N/A'}</p>

                            <p><strong>Email:</strong></p>
                            <p>{doctor.email}</p>

                            <p><strong>Location:</strong></p>
                            <p>{doctor.address}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DoctorDetails;
