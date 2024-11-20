import React from 'react';
import { FaPills, FaPlus, FaEllipsisV } from 'react-icons/fa'; // Import icons from react-icons
import './CurrentMedication.css'; // Import CSS for styling

const medications = [
    { name: 'Desloratadine (Clarinex)' },
    { name: 'Ketorolac (Acular, Acuvail)' },
    { name: 'Azelastine (Astelin, Astepro)' },
    { name: 'Desloratadine (Clarinex)' },
    { name: 'Ketorolac (Acular, Acuvail)' },
    
];

const CurrentMedication = () => {
    return (
        <div className="current-medication">
            <div className="medication-header">
                <h3>Current Medication</h3>
                <div className="medication-actions">
                    <FaPlus className="action-icon" />
                    <FaEllipsisV className="action-icon" />
                </div>
            </div>
            <ul className="medication-list">
                {medications.map((med, index) => (
                    <li key={index} className="medication-item">
                        <FaPills className="pill-icon" />
                        <span className="medication-name">{med.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentMedication;
