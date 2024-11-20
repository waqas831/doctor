// src/components/dashboard/RecentActivities.js
import React from 'react';
import CommonHeader from './CommonHeader';
import './RecentActivities.css'; // Import the CSS file

const RecentActivities = () => {
    // Sample activities data
    const activities = [
        { activity: 'Doctor joined as a new doctor', time: '2 hours ago' },
        { activity: 'Patient signed up', time: '4 hours ago' },
        { activity: 'Consultation completed', time: '6 hours ago' },
        { activity: 'Subscription renewed', time: '8 hours ago' },
        { activity: 'New specialist added', time: '10 hours ago' },
        { activity: 'System update completed', time: '12 hours ago' },
        { activity: 'Doctor profile updated', time: '14 hours ago' },
        { activity: 'Patient profile updated', time: '16 hours ago' },
        { activity: 'New feedback received', time: '18 hours ago' },
        { activity: 'Appointment rescheduled', time: '20 hours ago' },
        { activity: 'Medication order placed', time: '1 day ago' },
        { activity: 'Insurance claim processed', time: '2 days ago' },
        { activity: 'New report generated', time: '3 days ago' },
        { activity: 'Clinic hours updated', time: '4 days ago' },
        { activity: 'New policy added', time: '5 days ago' },
    ];

    // Slice to get only the last 17 activities
    const recentActivities = activities.slice(-17);

    return (
        <div className="recent-activities">
            <CommonHeader title="Admin Dashboard" />
            <div className="recent-activities-content">
                <h2>Recent Activities</h2>
                <ul className="activity-list">
                    {recentActivities.map((item, index) => (
                        <li key={index} className="activity-item">
                            <div className="activity-dot"></div>
                            <div className="activity-description">
                                <p>{item.activity}</p>
                                <p className="activity-time">{item.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentActivities;
