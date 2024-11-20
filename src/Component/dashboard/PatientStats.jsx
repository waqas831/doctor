import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './PatientStats.css';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientStats = ({ data }) => {
    const [timePeriod, setTimePeriod] = useState('week');

    // Access the data passed as props
    const currentData = data[timePeriod];

    const chartData = {
        labels: currentData.labels,
        datasets: [{
            label: 'Number of Patients',
            data: currentData.values,
            backgroundColor: '#B6DC9F',
            hoverBackgroundColor: '#589D2F',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow custom sizing
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Period'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Patients'
                }
            }
        }
    };

    return (
        <div className="patient-stats">
            <div className="stats-header">
                <h2 className="stats-heading">Patients Statistics</h2>
                <div className="stats-buttons">
                    <button
                        className={`stats-button ${timePeriod === 'week' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`stats-button ${timePeriod === 'month' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`stats-button ${timePeriod === 'year' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('year')}
                    >
                        Year
                    </button>
                </div>
            </div>
            <div className="stats-graph">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PatientStats;
