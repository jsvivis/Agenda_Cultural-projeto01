// BIBLIOTECAS
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// FRAMEWORKS - MATERIAL UI
import { Paper, Typography } from '@mui/material';

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%', display: 'flex', 
        alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h6" component="h2">
        Calendário
      </Typography>
      <Calendar
        onChange={setDate}
        value={date}
      />
    </Paper>
  );
}
