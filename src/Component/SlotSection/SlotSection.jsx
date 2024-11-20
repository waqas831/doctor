import React, { useState } from "react";
import "./SlotSection.css";
import videoIcon from "../../images/VideoCall.svg";
import callIcon from "../../images/Call.svg";
import InPerson from "../../images/InPerson.svg";
const SlotSection = () => {
  const slots = [
    "10:00am - 10:15am",
    "10:15am - 10:30am",
    "10:30am - 10:45am",
    "10:45am - 11:00am",
    "11:00am - 11:15am",
    "11:15am - 11:30am",
    "11:30am - 11:45am",
    "11:45am - 12:00pm",
    "12:00pm - 12:15pm",
    "12:15pm - 12:30pm",
    "12:30pm - 12:45pm",
    "12:45pm - 1:00pm",
    "1:00pm - 1:15pm",
    "1:15pm - 1:30pm",
    "1:30pm - 1:45pm",
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const [selectedType, setSelectedType] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType(type); // Only one selection at a time
  };
  return (
    <>
      <div className="slot-selection-container">
        <h3>
          Select Slots <span>(Slots Time 15 mins)</span>
        </h3>
        <div className="slot-grid">
          {slots.map((slot, index) => (
            <div
              key={index}
              className={`slot-item ${selectedSlot === slot ? "selected" : ""}`}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
        <div className="appointment-type-container">
          <h3>Select Appointment Type</h3>
          <div className="appointment-type-grid">
            <div
              className={`appointment-type-item ${
                selectedType === "Video Call" ? "selected" : ""
              }`}
              onClick={() => handleTypeClick("Video Call")}
            >
              <img src={videoIcon} alt="Video Call" />
              <span>Video Call</span>
            </div>
            <div
              className={`appointment-type-item ${
                selectedType === "Audio Call" ? "selected" : ""
              }`}
              onClick={() => handleTypeClick("Audio Call")}
            >
              <img src={callIcon} alt="Audio Call" />
              <span>Audio Call</span>
            </div>
            <div
              className={`appointment-type-item ${
                selectedType === "In-Person" ? "selected" : ""
              }`}
              onClick={() => handleTypeClick("In-Person")}
            >
              <img src={InPerson} alt="In-Person" />
              <span>In-Person</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotSection;
