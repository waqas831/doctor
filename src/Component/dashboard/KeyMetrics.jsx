
import React, { useEffect, useState } from 'react';
import CommonHeader from './CommonHeader';
import './KeyMetrics.css'; 
import { FaUserMd, FaUserPlus, FaCalendarAlt } from 'react-icons/fa'; 
import StatsAndCalendar from './keymatrics/StatsAndCalendar';
import FeeBoxes from './keymatrics/FeeBoxes';
import axios from 'axios';
import BACKEND_LOCAL from '../../Api';

const KeyMetrics = ({ totalPatients, totalDoctors, totalConsultations }) => {
    const [totalDoc, setTotalDoc] = useState([])
    const patientStatsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [30, 40, 35, 50, 60, 70, 80, 90, 85, 95, 100, 110]
    };
    const back = process.env.REACT_APP_BACKEND_LOCAL;
    const doctor = async () =>{
        try {
            const res = await axios.get(`${back}/api/v0.1/Doctor`)
            setTotalDoc(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
     doctor()
    }, [])

    return (
        <div className="key-metrics">
            <CommonHeader />
            <div className="key-metrics-content">
                <div className="metric-box">
                    <FaUserPlus size={40} />
                    <h3>Total Patients</h3>
                    <p>{totalPatients}</p>
                </div>
                <div className="metric-box">
                    <FaUserMd size={40} />
                    <h3>Total Doctorss</h3>
                    <p>{totalDoctors}</p>
                </div>
                <div className="metric-box">
                    <FaCalendarAlt size={40} />
                    <h3>Total Consultations</h3>
                    <p>{totalConsultations}</p>
                </div>
            </div>
            <StatsAndCalendar data={patientStatsData}/>
            <FeeBoxes 
                consultationFee={20} 
                subscriptionFee={20} 
                advertisingFee={20} 
            />
        </div>
    );
};

export default KeyMetrics;