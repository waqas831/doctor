import React from 'react';
import { FaHeartbeat, FaWaveSquare } from 'react-icons/fa'; // Import icons from react-icons
import './Vitals.css'; // Import CSS for styling

const Vitals = () => {
    return (
        <div className="vitals">
            <div className="vitals-header">
                <h3>Vitals</h3>
                <FaWaveSquare className="action-icon" />
            </div>
            <div className="vitals-content">
                <div className="vital-item">
                    <FaHeartbeat className="vital-icon" />
                    <div className="vital-info">
                        <p className="vital-label">Blood Pressure</p>
                        <p className="vital-value">121/75</p>
                    </div>
                </div>
                <div className="vital-item">
                    <FaWaveSquare className="vital-icon" />
                    <div className="vital-info">
                        <p className="vital-label">Pulse</p>
                        <p className="vital-value">67 BPM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vitals;
