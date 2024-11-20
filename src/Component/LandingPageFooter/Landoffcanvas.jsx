import React from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import location from "../../images/land-navloc.svg";
import clock from "../../images/landclock.svg";
import earphone from "../../images/landearphone.svg";
import imga from "../../images/landNavImg.svg";
import Accordion from 'react-bootstrap/Accordion';
import officon from "../../images/menu_open_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
const Landoffcanvas = ({ name, ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow} className=" off-btn">
                <img src={officon} alt="" />
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end" {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={imga} className='off-img' alt="" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='off-wrapper'>
                        <ul className='off-menu_ul'>
                            <li className='menu_li1'>
                                <Link className='menu_linkk ' to="">
                                    <span>
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li className='menu_li1'>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><span className='acc-head'>Service</span></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='menu_dropdown_otr1'>
                                                <div className='menu_dropdown_inr1'>
                                                    <ul className='menu_dropdown_ul1'>
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
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                            </li>
                            <li className='menu_li1'>
                                <Accordion>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header><span className='acc-head'>Treatment</span></Accordion.Header>
                                        <Accordion.Body>
                                            <div className='menu_dropdown_otr1'>
                                                <div className='menu_dropdown_inr1'>
                                                    <ul className='menu_dropdown_ul1'>
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
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                            </li>
                            <li className='menu_li1'>
                                <Link className='menu_linkk ' to="">
                                    <span>
                                        Pricing
                                    </span>
                                </Link>
                            </li>

                            <li className='menu_li1'>
                                <Link className='menu_linkk ' to="">
                                    <span>
                                        Our Team
                                    </span>
                                </Link>
                            </li>
                            <li className='menu_li1'>
                                <Link className='menu_linkk' to="">
                                    <span>
                                        Contact
                                    </span>
                                </Link>
                            </li>
                            <li className='menu_li1'>
                                <Link>
                                    {/* <img src={search} alt="" /> */}
                                </Link>
                            </li>
                        </ul>
                        <div className="NavUpper-inr-left1">
                            <Link className="contact1">
                                <img src={location} alt="img" className='nav-icon' />
                                <div className="contect-detail">
                                    <p className="contect-heading">One Canada Square,</p>
                                    <p className="contect-para">Canary Wharf, United Kingdom.</p>
                                </div>
                            </Link>
                            <Link className="contact1">
                                <img src={clock} alt="img" className='nav-icon' />
                                <div className="contect-detail">
                                    <p className="contect-heading">Monday-Friday: 9am to 5pm</p>
                                    <p className="contect-para">Saturday / Sunday: Closed</p>
                                </div>
                            </Link>
                            <Link className="contact1">
                                <img src={earphone} alt="img" className='nav-icon' />
                                <div className="contect-detail">
                                    <p className="contect-heading">+12 123 456 789</p>
                                    <p className="contect-para">info@yoursite.com</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

export default Landoffcanvas
