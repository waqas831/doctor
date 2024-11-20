// src/components/dashboard/PayoutComponent.js
import React from 'react';
import './PayoutComponent.css';
import { FaCreditCard, FaMoneyCheckAlt, FaHistory } from 'react-icons/fa';

const PayoutComponent = () => {
    const doctors = [
        {
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            name: 'Dr Abc',
        },
        {
            image: 'https://randomuser.me/api/portraits/women/75.jpg',
            name: 'Dr Abc',
        },
        {
            image: 'https://randomuser.me/api/portraits/men/65.jpg',
            name: 'Dr Abc',
        },
    ];

    const payouts = [
        { label: 'Scheduling Payout', icon: <FaCreditCard /> },
        { label: 'Processing Payout', icon: <FaMoneyCheckAlt /> },
        { label: 'Report And History', icon: <FaHistory /> },
    ];

    return (
        <div className="payout-container">
            {payouts.map((payout, index) => (
                <div className="payout-row" key={index}>
                    {/* Left Button */}
                    <button className="left-button">
                        <span className="icon">{payout.icon}</span>
                        {payout.label}
                    </button>

                    {/* Right Doctor Button */}
                    <button className="right-doctor-info">
                        <img
                            src={doctors[index].image}
                            alt={doctors[index].name}
                            className="doctor-image"
                        />
                        <div className="doctor-details">
                            <span className="doctor-name">
                                {doctors[index].name}
                            </span>
                        </div>
                        <span className="verified-icon">✔️</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PayoutComponent;
