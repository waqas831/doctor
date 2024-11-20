import React, { useState } from 'react';
import './SettingComp.css';

const SettingComp = () => {
    // State for toggling switches
    const [settings, setSettings] = useState({
        appointmentRemainder: true,
        scheduleChange: false,
        newAppointment: false,
        noShowAlert: true,
        patientNotification: true,
        staffNotification: true,
        waitlistsNotification: false,
        recallNotification: true,
    });

    // Handler to toggle switches
    const toggleSwitch = (settingName) => {
        setSettings({
            ...settings,
            [settingName]: !settings[settingName],
        });
    };

    return (
        <div className="settings-comp">
            <h2>Appointment Remainder</h2>
            <div className="setting-row">
                <div>
                    <p>Patient Notification For Upcoming Appointment</p>
                    <p>Doctor Notification For Upcoming Appointment</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.appointmentRemainder}
                            onChange={() => toggleSwitch('appointmentRemainder')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>Schedule Change</h2>
            <div className="setting-row">
                <div>
                    <p>Patient Notification For Appointment Rescheduling And Cancellations</p>
                    <p>Staff Notification Of Change To The Appointment Scheduling</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.scheduleChange}
                            onChange={() => toggleSwitch('scheduleChange')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>New Appointment</h2>
            <div className="setting-row">
                <div>
                    <p>Patient Notification Of Successful Appointment Booking</p>
                    <p>Staff Notification Of New Appointment Booking</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.newAppointment}
                            onChange={() => toggleSwitch('newAppointment')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>No-Show Alert</h2>
            <div className="setting-row">
                <div>
                    <p>Staff Notification When Patient Misses An Appointment</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.noShowAlert}
                            onChange={() => toggleSwitch('noShowAlert')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>Patient Notification</h2>
            <div className="setting-row">
                <div>
                    <p>Confirmation Of Appointment Detail</p>
                    <p>Request For Patient Information Update</p>
                    <p>Notification Of Test Results And Medical Records</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.patientNotification}
                            onChange={() => toggleSwitch('patientNotification')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>Staff Notification</h2>
            <div className="setting-row">
                <div>
                    <p>Assignment Of New Appointment</p>
                    <p>Change To Patient Information</p>
                    <p>System Update Or Maintenance Notification</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.staffNotification}
                            onChange={() => toggleSwitch('staffNotification')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>Waitlists Notification</h2>
            <div className="setting-row">
                <div>
                    <p>Patient Notification When Earlier Appointment Slot Is Available</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.waitlistsNotification}
                            onChange={() => toggleSwitch('waitlistsNotification')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <h2>Recall Notification</h2>
            <div className="setting-row">
                <div>
                    <p>Patient Notification For Follow-Up Appointment Or Checkup</p>
                </div>
                <div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={settings.recallNotification}
                            onChange={() => toggleSwitch('recallNotification')}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SettingComp;
