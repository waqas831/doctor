import React from 'react';
import { Link } from 'react-router-dom';
import arrow from "../../images/NAVdowm-arrow.svg";
import search from "../../images/nav-search.svg";



function NavMainMenu() {
    return (
        <div className='NavMainMenu_main'>
            <div className='container'>
                <div className='wrapper'>
                    <ul className='menu_ul'>
                        <li className='menu_li'>
                            <Link className='menu_linkk ' to="">
                                <span>
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className='menu_li'>
                            <p className='menu_linkk '>
                                <span>
                                Service
                                </span>
                                <img src={arrow} alt="" className='arrow'/>
                            </p>
                            <div className='menu_dropdown_otr'>
                                <div className='menu_dropdown_inr'>
                                    <ul className='menu_dropdown_ul'>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk' to="">
                                                <span>
                                                Video Consultation
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Phone consultation
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk' to="">
                                                <span>
                                                Sick Certificate
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Prescription
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        
                        <li className='menu_li'>
                            <p className='menu_linkk '>
                                <span>
                                Treatment
                                </span>
                                <img src={arrow} alt="" className='arrow'/>
                            </p>
                            <div className='menu_dropdown_otr'>
                                <div className='menu_dropdown_inr'>
                                    <ul className='menu_dropdown_ul'>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Video Consultation
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Phone consultation
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Sick Certificate
                                                </span>
                                            </Link>
                                        </li>
                                        <li className='menu_dropdown_li'>
                                            <Link className='menu_dropdown_Linkk ' to="">
                                                <span>
                                                Prescription
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className='menu_li'>
                            <Link className='menu_linkk ' to="">
                                <span>
                                Pricing
                                </span>
                            </Link>
                        </li>
                        
                        <li className='menu_li'>
                            <Link className='menu_linkk ' to="">
                                <span>
                                Our Team
                                </span>
                            </Link>
                        </li>
                        <li className='menu_li'>
                            <Link className='menu_linkk' to="">
                                <span>
                                Contact
                                </span>
                            </Link>
                        </li>
                        <li className='menu_li'>
                            <Link>
                            <img src={search} alt="" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavMainMenu