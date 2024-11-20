import React from 'react';
import './Schedule.css';

const Schedule = () => {
  // Doctor information
  const doctor = {
    name: "Dr. Josh Smith",
    photo: "profile.jpg", // You can place the profile image in the public folder or update the path
    specialization: "Sr. Neurologist"
  };

  // Week dates information
  const weekDates = {
    start: "May 12",
    end: "May 18, 2024",
    days: ["Monday 12", "Tuesday 13", "Wednesday 14", "Thursday 15", "Friday 16", "Saturday 17", "Sunday 18"]
  };

  // Time slots for each day
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
    "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM"
  ];

  // Schedule data: each row is a time slot, and each column corresponds to a day
  const schedule = [
    ["Booked", "Booked", "", "", "", "", ""],
    ["", "", "Booked", "", "", "", ""],
    ["", "", "", "", "Booked", "", ""],
    ["", "", "", "", "Booked", "", ""],
    ["", "", "", "Booked", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["Booked", "", "", "", "", "", ""],
    ["", "", "", "", "Booked", "", ""],
    ["", "", "", "Booked", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["Booked", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  // Function to check if the slot is disabled
  const isSlotDisabled = (day, timeIndex, dayIndex) => {
    const customDisabledSlots = [
      { day: "Monday 12", time: "12:00 PM" }, // Example of a custom disabled slot
      { day: "Wednesday 14", time: "09:30 AM" }
    ];
    
    // Disable weekends (Saturday and Sunday)
    if (day.includes("Saturday") || day.includes("Sunday")) {
      return true;
    }

    // Disable specific custom slots
    return customDisabledSlots.some(
      (slot) => slot.day === day && slot.time === timeSlots[timeIndex]
    );
  };

  // Click handler for slots
  const handleSlotClick = (time, dayIndex) => {
    alert(`Slot clicked: ${time}, Day: ${weekDates.days[dayIndex]}`);
  };

  return (
    <div className="schedule-container">
      <div className="calendar">
        <div className="calendar-header">
          <button className="calendar-nav">{"<"}</button>
          <span>{weekDates.start} - {weekDates.end}</span>
          <button className="calendar-nav">{">"}</button>
        </div>
        <div className="calendar-grid">
          <div className="days-row">
            <div></div> {/* Empty top-left corner */}
            {weekDates.days.map((day, index) => (
              <div 
                key={index} 
                className="day-label" 
                style={{ backgroundColor: day.includes("Saturday") || day.includes("Sunday") ? "#fff" : "#e6f7ff" }}
              >
                {day}
              </div>
            ))}
          </div>
          {timeSlots.map((time, i) => (
            <div key={i} className="time-row">
              <div className="time-label">{time}</div>
              {schedule[i].map((status, j) => {
                const isDisabled = isSlotDisabled(weekDates.days[j], i, j);
                return (
                  <div
                    key={j}
                    className={`time-slot ${status ? "booked" : ""} ${isDisabled ? "disabled" : ""}`}
                    onClick={() => !isDisabled && handleSlotClick(time, j)}
                    title={isDisabled ? "Booking not available" : ""}
                    style={isDisabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                  >
                    {status || (isDisabled ? "Unavailable" : "")}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
