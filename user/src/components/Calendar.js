import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Handle date selection logic here
  };

  return (
    <div>
      <h3>Attendance Calendar</h3>
      <div>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="ISO 8601"
        />
      </div>
    </div>
  );
}

export default AttendanceCalendar;
