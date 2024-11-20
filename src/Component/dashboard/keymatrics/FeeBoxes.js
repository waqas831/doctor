// src/components/dashboard/FeeBoxes.js
import React, { useState } from 'react';
import { FaDollarSign, FaCreditCard, FaAd } from 'react-icons/fa';
import './FeeBoxes.css';
import FeeBox from './Modal.js'; // Import FeeBox component

const FeeBoxes = ({ consultationFee, subscriptionFee, advertisingFee }) => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (type) => {
        setSelectedBox(type);
    };

    const handleCloseModal = () => {
        setSelectedBox(null);
    };

    return (
        <div className="fee-boxes">
            <div className="fee-box" onClick={() => handleBoxClick('consultation')}>
                <FaDollarSign size={40} />
                <h3>Consultation Fee</h3>
                <p>${consultationFee}</p>
            </div>
            <div className="fee-box" onClick={() => handleBoxClick('subscription')}>
                <FaCreditCard size={40} />
                <h3>Subscription Fee</h3>
                <p>${subscriptionFee}</p>
            </div>
            <div className="fee-box" onClick={() => handleBoxClick('advertising')}>
                <FaAd size={40} />
                <h3>Advertising Fee</h3>
                <p>${advertisingFee}</p>
            </div>

            {/* Render FeeBox modal */}
            {selectedBox && (
                <FeeBox
                    type={selectedBox}
                    data={{
                        doctor: 50,
                        specialists: 50,
                        firstTimePatient: 10,
                        referral: 5,
                        plan: 'Premium',
                        nextBillingDate: '22/03/24',
                        expiryDate: '22/03/24'
                    }}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default FeeBoxes;
