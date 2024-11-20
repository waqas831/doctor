import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardSectionView from "../View/DashboardSectionView/DashboardSectionView";
import PatientManagementView from "../View/PatientManagementView/PatientManagementView";
import MeettingHistoryView from "../View/MeettingHistoryView/MeettingHistoryView";
import AppointmentScheduleView from "../View/AppointmentScheduleView/AppointmentScheduleView";
import DoctorSettingsView from "../View/DoctorSettingsView/DoctorSettingsView";
import CommunicationSectionView from "../View/CommunicationSectionView/CommunicationSectionView";
import AnalyticsSectionView from "../View/AnalyticsSectionView/AnalyticsSectionView";
import AnalyticsSection2View from "../View/AnalyticsSection2View/AnalyticsSection2View";
import PaymentSectionView from "../View/PaymentSectionView/PaymentSectionView";
import LandingPageView from "../View/LandingPageView/LandingPageView";
import ChatbotComponent from "../ChatbotComponent";


const OurRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardSectionView />} />
        <Route path="/patientmanagement" element={<PatientManagementView />} />
        <Route path="/meetinghistory" element={<MeettingHistoryView />} />
        <Route path="/doctorsetting" element={<DoctorSettingsView />} />
        <Route path="/communication" element={<CommunicationSectionView />} />
        <Route path="/analytics" element={<AnalyticsSectionView />} />
        <Route path="/analytics2" element={<AnalyticsSection2View />} />
        <Route path="/payment" element={<PaymentSectionView />} />
        <Route path="/LandingPage" element={<LandingPageView />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />

        <Route
          path="/AppointmentSchedule"
          element={<AppointmentScheduleView />}
        />
      </Routes>
    </>
  );
};

export default OurRoutes;
