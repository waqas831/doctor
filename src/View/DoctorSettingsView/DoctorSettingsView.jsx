import React from "react";
import Usewrapper from "../../Component/Usewrapper/Usewrapper";
import DoctorSettingsSection from "../../Component/DoctorSettingsSection/DoctorSettingsSection";

const DoctorSettingsView = () => {
  return (
    <>
      <Usewrapper title="Setting">
        <DoctorSettingsSection />
      </Usewrapper>
    </>
  );
};

export default DoctorSettingsView;
