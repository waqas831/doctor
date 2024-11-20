import React from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa'; // Import icons from react-icons
import './Note.css'; // Import CSS for styling

const Note = () => {
    return (
        <div className="note">
            <div className="note-header">
                <h3>Note</h3>
                <div className="note-actions">
                    <FaPlus className="action-icon" />
                    <FaEllipsisV className="action-icon" />
                </div>
            </div>
            <div className="note-content">
                <p className="note-date">15/08/2024</p>
                <p className="note-text">
                    Patient Having Severe Sinusitis About Two To Three Months Ago With Facial Discomfort, 
                    Nasal Congestion, Eye Pain, And Postnasal Drip. Symptoms.
                </p>
                <p className="note-text">
                    Probable Environmental Inhalant Allergies. Probable Food Allergies, And History Of Asthma.
                </p>
                <p className="note-text">
                    Patient Having Severe Sinusitis About Two To Three Months Ago With Facial Discomfort, 
                    Nasal Congestion, Eye Pain, And Postnasal Drip. Symptoms.
                </p>
                <p className="note-text">
                    Probable Environmental Inhalant Allergies. Probable Food Allergies, And History Of Asthma.
                </p>
            </div>
        </div>
    );
};

export default Note;
