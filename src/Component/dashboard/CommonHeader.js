// src/components/dashboard/CommonHeader.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonHeader.css';

const CommonHeader = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('');

    const handleNavigation = (path) => {
        setActiveButton(path); // Set the active button state
        navigate(`/${path}`); // Navigate to the selected path
    };

    return (
        <div className="common-header">
            <h1>Admin Dashboard</h1>
            <div className="navigation-buttons">
                <button
                    className={activeButton === 'key-metrics' ? 'active' : ''}
                    onClick={() => handleNavigation('key-metrics')}
                >
                    Key Metrics
                </button>
                <button
                    className={activeButton === 'recent-activities' ? 'active' : ''}
                    onClick={() => handleNavigation('recent-activities')}
                >
                    Recent Activities
                </button>
                <button
                    className={activeButton === 'system-stats' ? 'active' : ''}
                    onClick={() => handleNavigation('system-stats')}
                >
                    System Stats
                </button>
            </div>
        </div>
    );
};

export default CommonHeader;
