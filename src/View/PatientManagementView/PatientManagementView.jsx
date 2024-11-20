import React from "react";
import Usewrapper from "../../Component/Usewrapper/Usewrapper";
import PatientManagementSection from "../../Component/PatientManagementSection/PatientManagementSection";

const PatientManagementView = () => {
  return (
    <>
      <Usewrapper title="Patients Management">
        <PatientManagementSection />
      </Usewrapper>
    </>
  );
};

export default PatientManagementView;
