import React from 'react';
import "./LandingPrice.css";
import LandingWrapper from '../LandingWrapper/LandingWrapper';
import price from "../../images/landprice-sign.svg";
import tick from "../../images/landcorrect.svg";
import pos1 from "../../images/landPosImg.svg";
import pos2 from "../../images/landposimg2.svg";
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';

const LandingPrice = () => {
    return (
        <div className='LandingPrice'>
            <div className='wrapper-up'>
                <LandingWrapper
                    heading="GP- Line"
                    bt="Pricing"
                    detailclass="wrapper-detail1"
                    detail="Experience seamless and secure consultations with your healthcare provider. Get personalized medical advice and care from the comfort of your home."
                />
            </div>
            <div className="container-price">
                <div className="row-price">
                    <div className="LandingPrice-otr">
                        <div className="LandingPrice-inr">
                            <img src={pos1} alt="" className='postion-price' />
                            <div className="price-detail">
                                <p className="pricehead">Telephonic Consultation</p>
                                <p className="deatal-price">Convenient, Accessible, and Reliable Healthcare</p>
                                <ul className="ul-price">
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" />Choose a time that suits you best.</p></li>
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" /> Discuss your symptoms, medical history, and any concerns you may have.</p></li>
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" />Discuss potential treatment options, and recommend any necessary follow-up steps</p></li>
                                </ul>
                            </div>
                            <div className="price"><p className="detailPrice"><EuroSymbolIcon sx={{fontSize:72,mr:2}} />35</p></div>
                        </div>
                    </div>
                    <div className="LandingPrice-otr">
                        <div className="LandingPrice-inr">
                            <img src={pos2} alt="" className='postion-price' />
                            <div className="price-detail">
                                <p className="pricehead">Video Consultation</p>
                                <p className="deatal-price">Convenient, Accessible, and Reliable Healthcare</p>
                                <ul className="ul price">
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" />Choose a time that suits you best.</p></li>
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" /> Discuss your symptoms, medical history, and any concerns you may have.</p></li>
                                    <li className="li-price"><p className="para-price"><img src={tick} className='tick' alt="" />Discuss potential treatment options, and recommend any necessary follow-up steps</p></li>
                                </ul>
                            </div>
                            <div className="price"><p className="detailPrice"><EuroSymbolIcon sx={{fontSize:72,mr:2}}/>35</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPrice
