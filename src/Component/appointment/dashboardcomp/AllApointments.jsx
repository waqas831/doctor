import React from 'react';
import './AllApointments.css'; // Adjust the CSS accordingly
import { FaCalendarCheck } from 'react-icons/fa'; // Icon from react-icons

const AllAppointments = () => {
    const appointments = [
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Confirm',
            image: 'https://randomuser.me/api/portraits/men/1.jpg' // Example image
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Booked',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Pending',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Confirm',
            image: 'https://randomuser.me/api/portraits/men/1.jpg' // Example image
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Booked',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Pending',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Confirm',
            image: 'https://randomuser.me/api/portraits/men/1.jpg' // Example image
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Booked',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Pending',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Confirm',
            image: 'https://randomuser.me/api/portraits/men/1.jpg' // Example image
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Booked',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
            doctor: 'Dr Abc',
            patient: 'Abc',
            date: '26-6-22',
            disease: 'Fever',
            status: 'Pending',
            image: 'https://randomuser.me/api/portraits/men/3.jpg'
        }
    ];

    return (
        <div className="all-appointments-container">
            <div className="header">
                <FaCalendarCheck className="appointments-icon" /> {/* Added icon */}
                <h2>All Appointments</h2>
            </div>
            <p className="upcoming-info">Upcoming Appointments Will Show Here</p> {/* Moved below */}
            
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Assigned Doctor</th>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Disease</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>
                                <img src={appointment.image} alt={appointment.doctor} className="doctor-image" />
                                {appointment.doctor}
                            </td>
                            <td>{appointment.patient}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.disease}</td>
                            <td>
                                <span className={`status ${appointment.status.toLowerCase()}`}>
                                    {appointment.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllAppointments;
