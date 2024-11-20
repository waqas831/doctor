import React from 'react';
import "./LandingWrapper.css";

const LandingWrapper = (props) => {
  return (
    <div className='LandingWrapper'>
      <p className="wrapperheading">{props.heading}</p>
      <div className="wrapper-bt-otr">
        <p className="wrapper-bt">
          {props.bt}
          
        </p>
      </div>
      <div className="wrapper-detail-otr">
      <p className={props.detailclass}>{props.detail}
      </p>
      </div>
    </div>
  )
}

export default LandingWrapper
