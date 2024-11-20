import React from 'react';
import "./LandingAward.css";
import { Link } from 'react-router-dom';
import call from "../../images/land-call-icon.svg"
import { Button } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
const LandingAward = () => {
    return (
        <div className='LandingAward-otr'>
            <div className="LandingAward-inr">
                <div className="upperAward-otr">
                    <div className="upperAward-inr">
                        <p className="upperaward-heading">Need A Check-Up? Book an Appointment Today! </p>
                        <Button sx={{ bgcolor: "#14467B", color: "white" }}>
          <Link  to='/patientBookAppointment' style={{ color: "white", textDecoration: 'none' }}>
              Book Appointment <LocalHospitalIcon />
            </Link>
          </Button>
                    </div>
                </div>
                {/* <div className='bottomAward-otr'>
                    <div className="bottomAward-inr">
                        <p className="award-heading">We are Finalist Health Investor <span className='award-heading-span'>Award 2022</span> </p>
                        <p className="award-detail">08 June Grosvenor House Hotel</p>
                    </div>
                </div> */}
            </div>
        </div>
        
    )
}

export default LandingAward
