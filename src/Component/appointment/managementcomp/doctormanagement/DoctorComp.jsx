// src/components/doctormanagement/DoctorComp.js
import React from 'react';
import { FaCalendarCheck, FaStethoscope, FaClipboardList, FaBell } from 'react-icons/fa';
import './DoctorComp.css'; // CSS for styling

const DoctorComp = () => {
    const doctorInfo = {
        name: "Dr. Alex Robert",
        specialization: "Cardiologist",
        experience: "10 years",
        contact: "123-456-7890",
        email: "alexrobert@hospital.com",
        image: "https://randomuser.me/api/portraits/men/1.jpg" // Example doctor image URL
    };

    const todayAppointments = [
        'Patient 1',
        'Patient 2',
        'Patient 3',
        'Patient 4',
        'Patient 5',
        'Patient 1',
        'Patient 2',
        'Patient 3',
        'Patient 4',
        'Patient 5',
    ];

    return (
        <div className="doctor-comp">
            {/* Four Boxes Row */}
            <div className="boxes-row">
                <div className="info-box">
                    <FaCalendarCheck className="box-icon" />
                    <h2 className='info-title'>Appointments</h2>
                    <p>25</p>
                </div>
                <div className="info-box">
                    <FaStethoscope className="box-icon" />
                    <h2 className='info-title'>Consultation</h2>
                    <p>15</p>
                </div>
                <div className="info-box">
                    <FaClipboardList className="box-icon" />
                    <h2 className='info-title'>Pending</h2>
                    <p>5</p>
                </div>
                <div className="info-box">
                    <FaBell className="box-icon" />
                    <h2 className='info-title'>Requests</h2>
                    <p>2</p>
                </div>
            </div>

            {/* Below row with Todays Appointments and Doctor Info */}
            <div className="content-row">
                {/* Today's Appointments */}
                <div className="appointments-container">
                    <h3>Today's Appointments</h3>
                    <ul className="appointments-list">
                        {todayAppointments.map((patient, index) => (
                            <li key={index}>{patient}</li>
                        ))}
                    </ul>
                </div>

                {/* Doctor Information */}
                <div className="doctor-info-container">
                    <h3>Doctor Information</h3>
                    {/* Doctor Image */}
                    <div className="doctor-image-container">
                        <img
                            src={doctorInfo.image}
                            alt={doctorInfo.name}
                            className="doctor-image"
                        />
                    </div>
                    <p><strong>Name:</strong> {doctorInfo.name}</p>
                    <p><strong>Specialization:</strong> {doctorInfo.specialization}</p>
                    <p><strong>Experience:</strong> {doctorInfo.experience}</p>
                    <p><strong>Contact:</strong> {doctorInfo.contact}</p>
                    <p><strong>Email:</strong> {doctorInfo.email}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorComp;
