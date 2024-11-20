// src/components/dashboard/CardComp.js
import React from 'react';
import './CardComp.css';
import { FaPaperPlane, FaPlus, FaBars } from 'react-icons/fa';
import cardImage from '../../assets/debit.png'; // Import the image from the assets folder

const CardComp = () => {
  return (
    <div className="card-comp-wrapper">
      {/* Debit Card Container */}
      <div className="card-container">
        <div className="debit-card-section">
          <div className="card-image">
            <img
              src={cardImage} // Use the imported image
              alt="Card Image"
              className="card-img"
            />
          </div>
          <div className="add-card">
            <div className="add-card-placeholder">+ Add Debit Card</div>
          </div>
        </div>
      </div>

      {/* Total Balance Container */}
      <div className="balance-container">
        <h2>Dr Boston Total Balance</h2>
        <div className="balance-amount">$509.50</div>
        <p className="balance-period">From December 2023 - May 2024</p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-button send">
            <FaPaperPlane />
            <span>Send</span>
          </button>
          <button className="action-button add">
            <FaPlus />
            <span>Add</span>
          </button>
          <button className="action-button menu">
            <FaBars />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComp;
