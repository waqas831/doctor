import React, { useState } from "react";
import Calendar from "react-calendar";
import "./CustomCalender.css";
const CustomCalender = ({ onDateChange }) => {
  const [range, setRange] = useState([null, null]);

  const handleDateClick = (date) => {
    // If no start date, set the first date as start
    if (!range[0]) {
      setRange([date, null]);
      onDateChange(date, null); // Pass selected start date to the parent
    }
    // If start date exists and no end date, set the second date
    else if (range[0] && !range[1]) {
      if (date < range[0]) {
        setRange([date, range[0]]); // In case the second date is before the first one
        onDateChange(date, range[0]); // Pass both dates to the parent
      } else {
        setRange([range[0], date]);
        onDateChange(range[0], date); // Pass both dates to the parent
      }
    }
    // If both start and end dates exist, reset the range and start over
    else {
      setRange([date, null]);
      onDateChange(date, null); // Reset and pass the new start date to the parent
    }
  };

  const isDateInRange = (date) => {
    if (!range[0] || !range[1]) return false;
    return date > range[0] && date < range[1];
  };

  const isStartOrEndDate = (date) => {
    return (
      (range[0] && date.getTime() === range[0].getTime()) ||
      (range[1] && date.getTime() === range[1].getTime())
    );
  };
  return (
    <>
      <div className="calendar-container">
        <h3>Select Date</h3>
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              if (isStartOrEndDate(date)) {
                return "highlight-start-end";
              } else if (isDateInRange(date)) {
                return "highlight-range";
              }
            }
          }}
          prevLabel={<span>&lt;</span>} // Customize the navigation arrows
          nextLabel={<span>&gt;</span>}
          minDetail="month" // Show only month view
          showNeighboringMonth={false} // Hide neighboring month dates
        />
      </div>
    </>
  );
};

export default CustomCalender;
