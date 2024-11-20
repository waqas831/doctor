import React from 'react';
import './Header.css'; 
import GplineImg from '../../assets/Group 2 1.png'; 
import Avatar from 'react-avatar';  
import { IoNotificationsOutline } from 'react-icons/io5'
import {  FaEllipsisV } from 'react-icons/fa';

const Header = ({name}) => {
    return (
        <header className="header-bar">
            <div className="header-left">
                <img src={GplineImg} alt="Gpline Logo" className="logo" />
            </div>
            <div className="header-right">
                <div className="notification">
                    <IoNotificationsOutline className="icon" />
                </div>
                <div className="profile-info">
                    <p className="name">{name}</p>
                    <p className="role">Admin</p>
                </div>
                <Avatar name="Admin" size="40" round={true} className="profile-pic" />
                <FaEllipsisV className="icon" />
            </div>
        </header>
    );
};

export default Header;