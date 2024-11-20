import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Statistics.css';
import { Box } from '@mui/material';

// Dummy data for the chart
const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 200 },
  { name: 'Fri', value: 278 },
  { name: 'Sat', value: 189 },
  { name: 'Sun', value: 239 },
];

const Statistics = () => {
    return (
        <Box width={"98%"} display={"flex"} flexDirection={["column","column","row"]}>
            {/* Total Patient Card */}
            <Box className="stat-card" width={["100%","100%","50%"]} m={1} >
                <div className="stat-header">
                    <FaUser className="stat-icon" />
                    <h3>Total Patient</h3>
                </div>
                <div className="stat-data">
                    <h2>4567</h2>
                    <span className="stat-change">▼ 10.89%</span>
                </div>
                <div className="stat-graph">
                    <ResponsiveContainer width="100%" height={50}>
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="value" stroke="#14467B" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="stat-footer">Patient Who Visited Last Week</p>
            </Box>

            {/* Total Consultation Card */}
            <Box className="stat-card" width={["100%","100%","50%"]}  m={1}>
                <div className="stat-header">
                    <FaCalendarAlt className="stat-icon" />
                    <h3>Total Consultation</h3>
                </div>
                <div className="stat-data">
                    <h2>8767</h2>
                    <span className="stat-change">▲ 10.89%</span>
                </div>
                <div className="stat-graph">
                    <ResponsiveContainer width="100%" height={50}>
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="value" stroke="#14467B" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="stat-footer">Patient Who Consulted Last Week</p>
            </Box>
        </Box>
    );
};

export default Statistics;
