// BIBLIOTECAS
import React from 'react';

// FRAMEWORK - MATERIAL UI
import { Container, Grid, Box, Typography, Avatar, IconButton, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import EventNoteIcon from '@mui/icons-material/EventNote';

// IMPORTAÇÕES
import EventList from './eventList';
import Calendar from './calendar';
import BigCalendar from './bigCalendar';

// CSS
import '../styles/home.css';
export default function Home() {
    return (
        <>
        <div className='body-home'>
            <div className='sidebar'>
                <EventList />
                <Calendar />
            </div>
            <BigCalendar />
        </div>
        </>
    )
}