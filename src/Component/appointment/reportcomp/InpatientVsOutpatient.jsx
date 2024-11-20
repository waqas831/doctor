// src/components/report/InpatientVsOutpatient.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './InpatientVsOutpatient.css';

const InpatientVsOutpatient = () => {
    // Chart data for inpatients vs outpatients
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels
        datasets: [
            {
                label: 'Inpatients',
                data: [50, 60, 70, 55], // Inpatients data
                backgroundColor: '#14467B', // Blue color for inpatients
            },
            {
                label: 'Outpatients',
                data: [70, 65, 80, 60], // Outpatients data
                backgroundColor: '#E6B800', // Yellow color for outpatients
            }
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Patients'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Weeks of the Month'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        maintainAspectRatio: false, // Allow control over chart size
    };

    return (
        <div className="inpatient-outpatient-chart">
            <h3>Inpatient vs Outpatient</h3>
            <div className="chart-container">
                <Bar data={data} options={options} width={400} height={200} />
            </div>
        </div>
    );
};

export default InpatientVsOutpatient;
