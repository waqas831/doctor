// src/components/dashboard/PaymentInfoComp.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './PaymentInfoComp.css';

const PaymentInfoComp = () => {
    const presentAmount = 340.90;
    const amountDue = 40.90;
    const totalAmount = presentAmount + amountDue;
    const percentage = (presentAmount / totalAmount) * 100;

    return (
        <div className="payment-info-comp">
            {/* Left Section: Amount Information in a separate box */}
            <div className="payment-details-box">
                <div className="payment-details">
                    <h3>Present Amount</h3>
                    <p>${presentAmount.toFixed(2)}</p>

                    <h3>Amount Due</h3>
                    <p>${amountDue.toFixed(2)}</p>

                    <h3>Total Amount</h3>
                    <p>${totalAmount.toFixed(2)}</p>

                    <a href="#" className="track-link">Track Payment History</a>
                </div>
            </div>

            {/* Right Section: Circular Progress Chart in a separate box */}
            <div className="payment-chart-box">
                <div className="payment-chart">
                    <CircularProgressbar
                        value={percentage}
                        text={`$${presentAmount.toFixed(2)}`}
                        styles={buildStyles({
                            pathColor: "#14467B",
                            textColor: "#14467B",
                            trailColor: "#d6d6d6",
                            strokeLinecap: "round",
                        })}
                    />
                    <a href="#" className="track-link">Track Dashboard</a>
                </div>
            </div>
        </div>
    );
};

export default PaymentInfoComp;
