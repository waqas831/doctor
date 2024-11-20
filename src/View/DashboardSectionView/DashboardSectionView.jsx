import React from "react";
import Usewrapper from "../../Component/Usewrapper/Usewrapper";
import WelcomeSection from "../../Component/WelcomeSection/WelcomeSection";
import SuggestSection from "../../Component/SuggestSection/SuggestSection";
import DoctorProfileSection from "../../Component/DoctorProfileSection/DoctorProfileSection";
import NotesSection from "../../Component/NotesSection/NotesSection";
import Togglebutton from "../../Component/Togglebutton/Togglebutton";

const DashboardSectionView = () => {
  return (
    <>
      <Usewrapper title="Dashboard">
        {/* <Togglebutton /> */}
        <div className="welcome-docProfile">
          <WelcomeSection />
          <DoctorProfileSection />
        </div>
        <div className="suggestion-notes">
          <SuggestSection />
          <NotesSection />
        </div>
      </Usewrapper>
    </>
  );
};

export default DashboardSectionView;
