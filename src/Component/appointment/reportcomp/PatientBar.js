import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const PatientBar = () => {
    const data = [
        { month: 'Oct 2019', patients: 1500 },
        { month: 'Nov 2019', patients: 113 },
        { month: 'Dec 2019', patients: 3000 },
        { month: 'Jan 2020', patients: 2800 },
        { month: 'Feb 2020', patients: 2000 },
        { month: 'Mar 2020', patients: 4000 }
    ];

    return (
        <div className="patient-bar-container">
            {/* Title for the component */}
            <h3 className="patient-bar-title">Patient Information</h3>
            
            {/* Chart Container */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="patients" stroke="#32CD32" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PatientBar;
