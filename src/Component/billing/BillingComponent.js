// src/components/dashboard/BillingComponent.js
import React from 'react';
import Card from './CardComp'; // Import the Card component
import './BillingComponent.css';
import PaymentInfoComp from './PaymentInfoComp'; // Import the PaymentInfoComp component
import PayoutComponent from './PayoutComponent';

const BillingComponent = () => {
  return (
    <div className="billing-component">
      <Card />
      <PaymentInfoComp />
      <PayoutComponent />
    </div>
  );
};

export default BillingComponent;
