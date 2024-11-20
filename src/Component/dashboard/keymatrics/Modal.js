// src/components/dashboard/FeeBox.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Modal.css'; // Import CSS for FeeBox

const FeeBox = ({ type, data, onClose }) => {
    const renderContent = () => {
        switch (type) {
            case 'consultation':
                return (
                    <>
                        <h3 className="fee-box-heading">Consultation Fee</h3>
                        <p className="fee-box-text">Doctor: ${data.doctor} per session</p>
                        <p className="fee-box-text">Specialists: ${data.specialists} per session</p>
                        <h3 className="fee-box-heading">Discount</h3>
                        <p className="fee-box-text">First time patient: ${data.firstTimePatient} off</p>
                        <p className="fee-box-text">Referral: ${data.referral} off</p>
                        <h3 className="fee-box-heading">Action</h3>
                        <button className="fee-box-button">Edit Fee</button>
                        <button className="fee-box-button">Generate Fee</button>
                    </>
                );
            case 'subscription':
                return (
                    <>
                        <h3 className="fee-box-heading">Subscription Plan: {data.plan}</h3>
                        <p className="fee-box-text">Next Billing Date: {data.nextBillingDate}</p>
                        <p className="fee-box-text">Expiry Date: {data.expiryDate}</p>
                        <h3 className="fee-box-heading">Action</h3>
                        <button className="fee-box-button">Edit Subscription</button>
                        <button className="fee-box-button">Pause Subscription</button>
                        <button className="fee-box-button">Cancel Subscription</button>
                    </>
                );
            case 'advertising':
                return (
                    <p>Advertising Fee information goes here.</p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fee-box-modal">
            <div className="fee-box-content">
                <button className="fee-box-close" onClick={onClose}><FaTimes size={20} /></button>
                {renderContent()}
            </div>
        </div>
    );
};

export default FeeBox;
