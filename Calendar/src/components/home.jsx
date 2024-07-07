import React, { useState } from 'react';
import EventList from './eventList';
import MyCalendar from './calendar'; // Renomeado para evitar conflitos
import BigCalendarComponent from './bigCalendar'; // Renomeado para evitar conflitos

import '../styles/home.css';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className='body-home'>
        <div className='sidebar'>
          <EventList />
          <MyCalendar onDateChange={handleDateChange} />
        </div>
        <BigCalendarComponent selectedDate={selectedDate} />
      </div>
    </>
  );
}
