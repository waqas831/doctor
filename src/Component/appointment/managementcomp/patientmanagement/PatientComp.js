// src/components/patientmanagement/PatientComp.js
import React from 'react';
import './PatientComp.css';

const PatientComp = () => {
    const patientInfo = {
        name: "John Smith",
        email: "John123@Gmail.Com",
        pastAppointments: 5,
        upcomingAppointments: 2,
        image: "https://randomuser.me/api/portraits/men/1.jpg", // Example patient image URL
        gender: "Male",
        birthday: "25/05/98",
        phoneNumber: "0300989098",
        address: "Abc House Street#3",
        city: "New York",
        zipCode: "4567",
        registrationDate: "23/3/23",
        memberStatus: "Active Member"
    };

    const notes = [
        "The Patient Needs To Get Full Amount Of Test",
        "Follow up in two weeks for further examination",
        "Patient has been prescribed medication for 7 days",
        "Refer to a specialist for further tests",
        "Patient should increase hydration and rest",
        "Patient has a history of allergies to penicillin",
        "Patient is allergic to peanuts",
        "Patient has a family history of diabetes",
        "Patient has a family history of heart disease",
        "Patient has a family history of cancer"
    ];

    const documents = [
        { name: "Blood Test.Pdf", size: "27kb" },
        { name: "Medical Prescription.Pdf", size: "45kb" },
        { name: "X-Ray Result.Pdf", size: "2Mb" },
        { name: "X-Ray Result2.Pdf", size: "3Mb" }
    ];

    return (
        <div className="patient-comp">
            {/* Patient Info and Details Wrapper */}
            <div className="patient-info-details-wrapper">
                {/* Patient Info Section */}
                <div className="patient-info">
                    <img src={patientInfo.image} alt={patientInfo.name} className="patient-image" />
                    <h2>{patientInfo.name}</h2>
                    <p className="patient-email">{patientInfo.email}</p>

                    <div className="appointment-info">
                        <div className="appointment-count">
                            <p>Past</p>
                            <p>{patientInfo.pastAppointments}</p>
                        </div>
                        <div className="appointment-count">
                            <p>Upcoming</p>
                            <p>{patientInfo.upcomingAppointments}</p>
                        </div>
                    </div>

                    <div className="message-buttons">
                        <button className="message-btn">Send Message</button>
                        <button className="email-btn">Send Email</button>
                    </div>
                </div>

                {/* Patient Details Section */}
                <div className="patient-details">
                    <div className="details-grid">
                        <div className="detail-item">
                            <p><strong>Gender</strong></p>
                            <p>{patientInfo.gender}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Birthday</strong></p>
                            <p>{patientInfo.birthday}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Phone Number</strong></p>
                            <p>{patientInfo.phoneNumber}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Address</strong></p>
                            <p>{patientInfo.address}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>City</strong></p>
                            <p>{patientInfo.city}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Zip Code</strong></p>
                            <p>{patientInfo.zipCode}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Registration Date</strong></p>
                            <p>{patientInfo.registrationDate}</p>
                        </div>
                        <div className="detail-item">
                            <p><strong>Member Status</strong></p>
                            <p>{patientInfo.memberStatus}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes and File/Documents Section */}
            <div className="extra-info-row">
                {/* Notes Section */}
                <div className="notes-container">
                    <h3>Notes</h3>
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                    <button className="save-note-btn">Save Note</button>
                </div>

                {/* File/Documents Section */}
                <div className="documents-container">
                    <h3>File/Documents</h3>
                    <ul>
                        {documents.map((doc, index) => (
                            <li key={index}>
                                {doc.name} <span>{doc.size}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="add-file-btn">Add File</button>
                </div>
            </div>
        </div>
    );
};

export default PatientComp;
