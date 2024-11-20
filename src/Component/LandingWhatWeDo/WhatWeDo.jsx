import React from 'react';
import "./WhatWeDo.css";
import LandingWrapper from '../LandingWrapper/LandingWrapper';
import time from "../../images/what-to-do-twenty-four 1.svg"
import battery from "../../images/what-battery.svg";
import test from "../../images/what-test.svg";
import ScaleIcon from '@mui/icons-material/Scale';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

const WhatWeDo = () => {
  return (
    <div className='WhatWeDo-otr'>
      <LandingWrapper
      heading="GP- Line"
      bt="What We Do"
      detailclass ="wrapper-detail"
      detail="We are committed to providing the highest quality medical care.
        Our team of experienced professionals is dedicated to your health and well-being."
      />
      <div className="container-fluid">
        <div className="row-custom">
          <div className="whatToDo-box-otr">
            <div className="whatToDo-box-inr">
              <div className="img-otr">
                <img src={time} alt="" />
              </div>
              <div className="whatTodo-detail">
                <p className="what-heading">Medical Care</p>
                <p className='what-detail'>Our experienced GPs can provide medical advice at the touch of a button individualized recovery plans.</p>
              </div>
            </div>
          </div>
          <div className="whatToDo-box-otr">
            <div className="whatToDo-box-inr">
              <div className="img-otr">
                <img src={battery} alt="" />
              </div>
              <div className="whatTodo-detail">
                <p className="what-heading">Prescription</p>
                <p className='what-detail'>We work around the clock to ensure your medication will reach you on the same day.</p>
              </div>
            </div>
          </div>
          <div className="whatToDo-box-otr">
            <div className="whatToDo-box-inr">
              <div className="img-otr">
                <img src={test} alt="" />
              </div>
              <div className="whatTodo-detail">
                <p className="what-heading">Sick Certificate</p>
                <p className='what-detail'>GPLINE offers online sick certificates as part of its telemedicine services.</p>
              </div>
            </div>
          </div>
          <div className="whatToDo-box-otr">
            <div className="whatToDo-box-inr">
              <div className="img-otr">
                {/* <img src={test} alt="" /> */}
                <ScaleIcon sx={{color:"#3ab6bb" ,fontSize:52}} />
              </div>
              <div className="whatTodo-detail">
                <p className="what-heading">Weight Loss</p>
                <p className='what-detail'>GPLINE offers personalized weight loss consultations, providing expert guidance and support.</p>
              </div>
            </div>
          </div>
          <div className="whatToDo-box-otr">
            <div className="whatToDo-box-inr">
              <div className="img-otr">
                {/* <img src={test} alt="" /> */}
                <FaceRetouchingNaturalIcon sx={{color:"#3ab6bb" ,fontSize:52}}/>
              </div>
              <div className="whatTodo-detail">
                <p className="what-heading">Dermatologist</p>
                <p className='what-detail'>Our dermatology services at GPLINE allow you to consult online for skin concerns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatWeDo
