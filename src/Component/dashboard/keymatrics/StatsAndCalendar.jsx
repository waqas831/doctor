// src/components/dashboard/StatsAndCalendar.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2'; // Chart.js library for the line chart
import Calendar from 'react-calendar'; // Calendar component from react-calendar
import 'chart.js/auto'; // Import chart.js auto to register necessary components
import './StatsAndCalendar.css'; // Import the CSS file for styling

const StatsAndCalendar = ({ data }) => {
    const [date, setDate] = useState(new Date());

    // Data for the line chart
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Number of Patients',
                data: data.values,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="stats-calendar-container">
            <div className="chart-container">
                <Line 
                    data={chartData} 
                    options={{ 
                        responsive: true, 
                        plugins: { 
                            legend: { display: false } 
                        }, 
                        scales: { 
                            y: { beginAtZero: true } 
                        } 
                    }} 
                />
            </div>
            <div className="calendar-container">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="dashboard-calendar"
                />
            </div>
        </div>
    );
};

export default StatsAndCalendar;
