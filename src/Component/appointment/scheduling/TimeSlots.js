import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Use react-calendar for the date selection
import './TimeSlots.css'; // CSS for the component
import { Box } from '@mui/material';

const SchedulingComp = () => {
    // State to handle the selected time slot and date
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const timeSlots = [
        '10:00am - 10:15am', '10:15am - 10:30am', '10:30am - 10:45am',
        '10:45am - 11:00am', '11:00am - 11:15am', '11:15am - 11:30am',
        '11:30am - 11:45am', '11:45am - 12:00pm', '12:00pm - 12:15pm'
    ];

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    return (
        <Box display={"flex"} justifyContent={"center"} flexDirection={["column","column","row"]}>
           <Box width={["100%","100%", "50%"]}>
           <div className="slots-container">
                <h3>Select Slots</h3>
                <div className="slots-grid">
                    {timeSlots.map((slot, index) => (
                        <button
                            key={index}
                            className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
                            onClick={() => handleSlotClick(slot)}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

           </Box>
            
            <Box width={["100%","100%", "50%"]} display={"flex"} justifyContent={"center"}>
            <div className="calendar-container">
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                />
            </div>
            </Box>
        </Box>
    );
};

export default SchedulingComp;
