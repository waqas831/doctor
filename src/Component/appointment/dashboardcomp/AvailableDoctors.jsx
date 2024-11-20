import React, { useState } from 'react';
import './AvailableDoctors.css';

const AvailableDoctors = () => {
    const doctorsList = [
        { id: 1, name: 'Dr. Alex Robert', specialization: 'Cardiologist', available: true },
        { id: 2, name: 'Dr. Emily Watson', specialization: 'Neurologist', available: false },
        { id: 3, name: 'Dr. Liam Smith', specialization: 'Pediatrician', available: true },
        { id: 4, name: 'Dr. Ava Green', specialization: 'Dermatologist', available: false },
        { id: 5, name: 'Dr. Noah Brown', specialization: 'General Practitioner', available: true },
        { id: 5, name: 'Dr. Noah Brown', specialization: 'General Practitioner', available: true }
    ];

    return (
        <div className="available-doctors">
            <h3>Available Doctors</h3>
            <ul>
                {doctorsList.map((doctor) => (
                    <li key={doctor.id} className={`doctor-item ${doctor.available ? 'available' : 'unavailable'}`}>
                        <div className="doctor-info">
                            <span className="doctor-name">{doctor.name}</span>
                            <span className="doctor-specialization">{doctor.specialization}</span>
                        </div>
                        <span className={`doctor-status ${doctor.available ? 'available' : 'unavailable'}`}>
                            {doctor.available ? 'Available' : 'Unavailable'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AvailableDoctors;
