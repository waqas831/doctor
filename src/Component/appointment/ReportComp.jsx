// src/components/report/ReportComp.js
import React from 'react';
import TrafficDetails from './reportcomp/TrafficDetails'; // Import the TrafficDetails component
import InpatientVsOutpatient from './reportcomp/InpatientVsOutpatient';
import PatientBar from './reportcomp/PatientBar';
import AppointmentSummary from './reportcomp/AppointmentSummary';
const ReportComp = () => {
    return (
        <div className="report-comp">
            <TrafficDetails />
            <InpatientVsOutpatient />
            <PatientBar />
            <AppointmentSummary />
        </div>
    );
};

export default ReportComp;
