import React from "react";
import Usewrapper from "../../Component/Usewrapper/Usewrapper";
import PaymentSection from "../../Component/PaymentSection/PaymentSection";
import Invoice from "./Invoice";

const DocInvoice = () => {
  return (
    <>
     <Usewrapper title="Invoice Record">
     <Invoice/>

      </Usewrapper>
    </>
  );
};

export default DocInvoice;
