
// import { Route, Routes, useLocation } from "react-router-dom";
// import "./App.css";
// import ChatbotComponent from './ChatbotComponent';
// import "bootstrap/dist/css/bootstrap.min.css";
// import DashboardSectionView from "./View/DashboardSectionView/DashboardSectionView.jsx";
// import PatientManagementView from "./View/PatientManagementView/PatientManagementView.jsx";
// import MeettingHistoryView from "./View/MeettingHistoryView/MeettingHistoryView.jsx";
// import DoctorSettingsView from "./View/DoctorSettingsView/DoctorSettingsView.jsx";
// import CommunicationSectionView from "./View/CommunicationSectionView/CommunicationSectionView.jsx";
// import AnalyticsSectionView from "./View/AnalyticsSectionView/AnalyticsSectionView.jsx";
// import AnalyticsSection2View from "./View/AnalyticsSection2View/AnalyticsSection2View.jsx";
// import PaymentSectionView from "./View/PaymentSectionView/PaymentSectionView.jsx";
// import LandingPageView from "./View/LandingPageView/LandingPageView.jsx";
// import AppointmentScheduleView from "./View/AppointmentScheduleView/AppointmentScheduleView.jsx";
// import Sidebar from "./Component/dashboard/Sidebar.jsx";
// import MainDashboard from "./Component/dashboard/MainDashboard.jsx";
// import KeyMetrics from "./Component/dashboard/KeyMetrics.jsx";
// import RecentActivities from "./Component/dashboard/RecentActivities.jsx";
// import SystemStats from "./Component/dashboard/SystemStats.jsx";
// import DoctorsComponent from "./Component/doctormanagement/DoctorsComponent.jsx";
// import DoctorDetails from "./Component/doctormanagement/DoctorDetails.jsx";
// import BillingComponent from "./Component/billing/BillingComponent.jsx";
// import Header from "./Component/dashboard/Header.jsx";
// import AppointmentComp from "./Component/appointment/AppointmentComp.jsx";
// import DashboardComp from "./Component/appointment/DashboardComp.jsx";
// import SchedulingComp from "./Component/appointment/SchedulingComp.jsx";
// import ManagementComp from "./Component/appointment/ManagementComp.jsx";
// import ReportComp from "./Component/appointment/ReportComp.jsx";
// import SettingComp from "./Component/appointment/SettingComp.jsx";

// import DoctorLogin from "./Component/auth/doctor/DoctorLogin.jsx";
// import DoctorForget from "./Component/auth/doctor/DoctorForget.jsx";
// import { Box } from "@mui/material";
// import ProtectedRoute from "./Component/auth/protectedRoutes/ProtectedRoutes.jsx";
// import Consultation from "./Component/CommunicationSection/Consultaion.jsx";
// import EmailSent from "./Component/auth/doctor/EmailSent.jsx";
// import CreatePassword from "./Component/auth/doctor/CreatePasssword.jsx";
// import AdminConsultation from "./Component/dashboard/adminConsultation/AdminConsultation.jsx";
// import MeetingHistory from "./Component/dashboard/meetingHistory/MeetingHistory.jsx";
// import ActivityLogs from "./Component/dashboard/activityLogs/ActivityLogs.jsx";
// import CheckoutForm from "./Component/doctormanagement/CheckOutForm.jsx";
// import Error from "./Component/auth/Error.jsx";
// import Reports from "./Component/reports/Reports.jsx";
// import DocInvoice from "./Component/doctorInvoice/DocIInvoice.jsx";
// import BookOnly from "./Component/bookOnly/BookOnly.jsx";
// import BecomeDoctor from "./Component/becomeDoctor/BecomeDoctor.jsx";
// import Team from "./Component/team/Team.jsx";

// function App() {
//   const location = useLocation();

//   const showHeaderAndSidebarRoutes = [
//     "/dashboard",
//     "/key-metrics",
//     "/admin-consultation",
//     "/meeting-history",
//     "/recent-activities",
//     "/activity-logs",
//     "/system-stats",
//     "/doctors-management",
//     "/doctor-details",
//     "/payment-calculation",
//     "/appointments/dashboard",
//     "/appointments/scheduling",
//     "/appointments/management",
//     "/appointments/report",
//     "/appointments/setting",
//     "/admin-reports"
//   ];

//   const noHeaderSidebarRoutes = ["/doctorLogin", "/doctorforget"];

//   return (
//     <div className="App">
//       {showHeaderAndSidebarRoutes.some(route => location.pathname.startsWith(route)) &&
//       !noHeaderSidebarRoutes.includes(location.pathname) ? (
//         <div className="app-container">
//           <Header />
//           <div className="main-content" style={{ display: "flex" }}>
//             <Sidebar />
//             <div className="content-area" style={{ width: "100%" }}>
//               <Routes>
//                 <Route path="/dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
//                 <Route path="/key-metrics" element={<ProtectedRoute role={"admin"}><KeyMetrics /></ProtectedRoute>} />
//                 <Route path="/recent-activities" element={<ProtectedRoute role={"admin"}><RecentActivities /></ProtectedRoute>} />
//                 <Route path="/meeting-history" element={<ProtectedRoute role={"admin"}><MeetingHistory /></ProtectedRoute>} />
//                 <Route path="/system-stats" element={<ProtectedRoute role={"admin"}><SystemStats /></ProtectedRoute>} />
//                 <Route path="/doctors-management" element={<ProtectedRoute role={"admin"}><DoctorsComponent /></ProtectedRoute>} />
//                 <Route path="/doctor-details" element={<ProtectedRoute role={"admin"}><DoctorDetails /></ProtectedRoute>} />
//                 <Route path="/admin-consultation" element={<ProtectedRoute role={"admin"}><AdminConsultation /></ProtectedRoute>} />
//                 <Route path="/payment-calculation" element={<ProtectedRoute role={"admin"}><BillingComponent /></ProtectedRoute>} />
//                 <Route path="/activity-logs" element={<ProtectedRoute role={"admin"}><ActivityLogs /></ProtectedRoute>} />
//                 <Route path="/admin-reports" element={<ProtectedRoute role={"admin"}><Reports /></ProtectedRoute>} />
                
//                 <Route path="/appointments" element={<ProtectedRoute role={"admin"}><AppointmentComp /></ProtectedRoute>}>
//                   <Route path="dashboard" element={<ProtectedRoute role={"admin"}><DashboardComp /></ProtectedRoute>} />
//                   <Route path="scheduling" element={<ProtectedRoute role={"admin"}><SchedulingComp /></ProtectedRoute>} />
//                   <Route path="management" element={<ProtectedRoute role={"admin"}><ManagementComp /></ProtectedRoute>} />
//                   <Route path="report" element={<ProtectedRoute role={"admin"}><ReportComp /></ProtectedRoute>} />
//                   <Route path="setting" element={<ProtectedRoute role={"admin"}><SettingComp /></ProtectedRoute>} />
//                 </Route>
//             <Route path="*" element={<Error />} />

//               </Routes>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="no-sidebar-header-content">
//           <Routes>
//             <Route path="/userDashboard" element={<ProtectedRoute role="Doctor"><DashboardSectionView /></ProtectedRoute>} />
//             <Route path="/patientmanagement" element={<ProtectedRoute role="Doctor"><PatientManagementView /></ProtectedRoute>} />
//             <Route path="/meetinghistory" element={<ProtectedRoute role="doctor"><MeettingHistoryView /></ProtectedRoute>} />
//             <Route path="/doctorsetting" element={<ProtectedRoute role="Doctor"><DoctorSettingsView /></ProtectedRoute>} />
//             <Route path="/communication" element={<ProtectedRoute role="Doctor"><CommunicationSectionView /></ProtectedRoute>} />
//             <Route path="/analytics" element={<ProtectedRoute role="Doctor"><AnalyticsSectionView /></ProtectedRoute>} />
//             <Route path="/analytics2" element={<ProtectedRoute role="Doctor"><AnalyticsSection2View /></ProtectedRoute>} />
//             <Route path="/payment" element={<ProtectedRoute role="Doctor"><PaymentSectionView /></ProtectedRoute>} />
//             <Route path="/AppointmentSchedule" element={<ProtectedRoute role="Doctor"><AppointmentScheduleView /></ProtectedRoute>} />
//             <Route path="/consultation" element={<ProtectedRoute role="Doctor"><Consultation /></ProtectedRoute>} />
//             <Route path="/doctorInvoice" element={<ProtectedRoute role="Doctor"><DocInvoice /></ProtectedRoute>} />
//             {/* <Route path="*" element={<Error />} /> */}
//           </Routes>

//           <Routes>
//             <Route path="/" element={<LandingPageView />} />
//             <Route path="/team" element={<Team />} />
//             <Route path="/applyAsDoctor" element={<BecomeDoctor />} />
//             <Route path="/patientBookAppointment" element={<BookOnly />} />
//             <Route path="/doctorforget" element={<DoctorForget />} />
//             <Route path="/doctorLogin" element={<DoctorLogin />} />
//             <Route path="/emailSent" element={<EmailSent />} />
//             <Route path="/createPassword" element={<CreatePassword />} />
//             {/* <Route path="*" element={<Error />} /> */}

//           </Routes>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
 
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ChatbotComponent from './ChatbotComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardSectionView from "./View/DashboardSectionView/DashboardSectionView.jsx";
import PatientManagementView from "./View/PatientManagementView/PatientManagementView.jsx";
import MeettingHistoryView from "./View/MeettingHistoryView/MeettingHistoryView.jsx";
import DoctorSettingsView from "./View/DoctorSettingsView/DoctorSettingsView.jsx";
import CommunicationSectionView from "./View/CommunicationSectionView/CommunicationSectionView.jsx";
import AnalyticsSectionView from "./View/AnalyticsSectionView/AnalyticsSectionView.jsx";
import AnalyticsSection2View from "./View/AnalyticsSection2View/AnalyticsSection2View.jsx";
import PaymentSectionView from "./View/PaymentSectionView/PaymentSectionView.jsx";
import LandingPageView from "./View/LandingPageView/LandingPageView.jsx";
import AppointmentScheduleView from "./View/AppointmentScheduleView/AppointmentScheduleView.jsx";
import Sidebar from "./Component/dashboard/Sidebar.jsx";
import MainDashboard from "./Component/dashboard/MainDashboard.jsx";
import KeyMetrics from "./Component/dashboard/KeyMetrics.jsx";
import RecentActivities from "./Component/dashboard/RecentActivities.jsx";
import SystemStats from "./Component/dashboard/SystemStats.jsx";
import DoctorsComponent from "./Component/doctormanagement/DoctorsComponent.jsx";
import DoctorDetails from "./Component/doctormanagement/DoctorDetails.jsx";
import BillingComponent from "./Component/billing/BillingComponent.jsx";
import Header from "./Component/dashboard/Header.jsx";
import AppointmentComp from "./Component/appointment/AppointmentComp.jsx";
import DashboardComp from "./Component/appointment/DashboardComp.jsx";
import SchedulingComp from "./Component/appointment/SchedulingComp.jsx";
import ManagementComp from "./Component/appointment/ManagementComp.jsx";
import ReportComp from "./Component/appointment/ReportComp.jsx";
import SettingComp from "./Component/appointment/SettingComp.jsx";

import DoctorLogin from "./Component/auth/doctor/DoctorLogin.jsx";
import DoctorForget from "./Component/auth/doctor/DoctorForget.jsx";
import { Box } from "@mui/material";
import ProtectedRoute from "./Component/auth/protectedRoutes/ProtectedRoutes.jsx";
import Consultation from "./Component/CommunicationSection/Consultaion.jsx";
import EmailSent from "./Component/auth/doctor/EmailSent.jsx";
import CreatePassword from "./Component/auth/doctor/CreatePasssword.jsx";
import AdminConsultation from "./Component/dashboard/adminConsultation/AdminConsultation.jsx";
import MeetingHistory from "./Component/dashboard/meetingHistory/MeetingHistory.jsx";
import ActivityLogs from "./Component/dashboard/activityLogs/ActivityLogs.jsx";
import CheckoutForm from "./Component/doctormanagement/CheckOutForm.jsx";
import Error from "./Component/auth/Error.jsx";
import Reports from "./Component/reports/Reports.jsx";
import DocInvoice from "./Component/doctorInvoice/DocIInvoice.jsx";
import BookOnly from "./Component/bookOnly/BookOnly.jsx";
import BecomeDoctor from "./Component/becomeDoctor/BecomeDoctor.jsx";
import Team from "./Component/team/Team.jsx";
import PrivacyPolicy from "./Component/policy/PrivacyPolicy.jsx";
import TermAndServices from "./Component/policy/TermAndServices.jsx";
import RefundCancellation from "./Component/policy/RefundCancellation.jsx";

function App() {
  const location = useLocation();

  const showHeaderAndSidebarRoutes = [
    "/dashboard",
    "/key-metrics",
    "/admin-consultation",
    "/meeting-history",
    "/recent-activities",
    "/activity-logs",
    "/system-stats",
    "/doctors-management",
    "/doctor-details",
    "/payment-calculation",
    "/appointments/dashboard",
    "/appointments/scheduling",
    "/appointments/management",
    "/appointments/report",
    "/appointments/setting",
    "/admin-reports"
  ];

  const noHeaderSidebarRoutes = ["/doctorLogin", "/doctorforget"];

  return (
    <div className="App">
      {showHeaderAndSidebarRoutes.some(route => location.pathname.startsWith(route)) &&
      !noHeaderSidebarRoutes.includes(location.pathname) ? (
        <div className="app-container">
          <Header />
          <div className="main-content" style={{ display: "flex" }}>
            <Sidebar />
            <div className="content-area" style={{ width: "100%" }}>
              <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                <Route path="/key-metrics" element={<ProtectedRoute ><KeyMetrics /></ProtectedRoute>} />
                <Route path="/recent-activities" element={<ProtectedRoute ><RecentActivities /></ProtectedRoute>} />
                <Route path="/meeting-history" element={<ProtectedRoute ><MeetingHistory /></ProtectedRoute>} />
                <Route path="/system-stats" element={<ProtectedRoute ><SystemStats /></ProtectedRoute>} />
                <Route path="/doctors-management" element={<ProtectedRoute><DoctorsComponent /></ProtectedRoute>} />
                <Route path="/doctor-details" element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
                <Route path="/admin-consultation" element={<ProtectedRoute><AdminConsultation /></ProtectedRoute>} />
                <Route path="/payment-calculation" element={<ProtectedRoute ><BillingComponent /></ProtectedRoute>} />
                <Route path="/activity-logs" element={<ProtectedRoute ><ActivityLogs /></ProtectedRoute>} />
                <Route path="/admin-reports" element={<ProtectedRoute ><Reports /></ProtectedRoute>} />
                
                <Route path="/appointments" element={<ProtectedRoute ><AppointmentComp /></ProtectedRoute>}>
                  <Route path="dashboard" element={<ProtectedRoute ><DashboardComp /></ProtectedRoute>} />
                  <Route path="scheduling" element={<ProtectedRoute ><SchedulingComp /></ProtectedRoute>} />
                  <Route path="management" element={<ProtectedRoute ><ManagementComp /></ProtectedRoute>} />
                  <Route path="report" element={<ProtectedRoute ><ReportComp /></ProtectedRoute>} />
                  <Route path="setting" element={<ProtectedRoute ><SettingComp /></ProtectedRoute>} />
                </Route>
            <Route path="*" element={<Error />} />

              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-sidebar-header-content">
          <Routes>
            <Route path="/userDashboard" element={<ProtectedRoute ><DashboardSectionView /></ProtectedRoute>} />
            <Route path="/patientmanagement" element={<ProtectedRoute ><PatientManagementView /></ProtectedRoute>} />
            <Route path="/meetinghistory" element={<ProtectedRoute ><MeettingHistoryView /></ProtectedRoute>} />
            <Route path="/doctorsetting" element={<ProtectedRoute ><DoctorSettingsView /></ProtectedRoute>} />
            <Route path="/communication" element={<ProtectedRoute><CommunicationSectionView /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsSectionView /></ProtectedRoute>} />
            <Route path="/analytics2" element={<ProtectedRoute><AnalyticsSection2View /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentSectionView /></ProtectedRoute>} />
            <Route path="/AppointmentSchedule" element={<ProtectedRoute><AppointmentScheduleView /></ProtectedRoute>} />
            <Route path="/consultation" element={<ProtectedRoute><Consultation /></ProtectedRoute>} />
            <Route path="/doctorInvoice" element={<ProtectedRoute><DocInvoice /></ProtectedRoute>} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>

          <Routes>
            <Route path="/" element={<LandingPageView />} />
            <Route path="/team" element={<Team />} />
            <Route path="/applyAsDoctor" element={<BecomeDoctor />} />
            <Route path="/patientBookAppointment" element={<BookOnly />} />
            <Route path="/doctorforget" element={<DoctorForget />} />
            <Route path="/doctorLogin" element={<DoctorLogin />} />
            <Route path="/emailSent" element={<EmailSent />} />
            <Route path="/createPassword" element={<CreatePassword />} />
            <Route path="privayPolicy" element={<PrivacyPolicy />} />
            <Route path="/termsAndServices" element={<TermAndServices />} />
            <Route path="/refundAndCancellation" element={<RefundCancellation />} />
            {/* <Route path="*" element={<Error />} /> */}

          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
 