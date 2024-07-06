// BIBLIOTECAS
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

// FRAMEWORKS - MATERIAL UI
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/evento')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar eventos:', error);
      });
  }, []);

  const formatDateTime = (dateTimeString) => {
    try {
      return format(new Date(dateTimeString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateTimeString;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h6" component="h2">
        Eventos
      </Typography>
      <List>
        {events.map(event => (
          <ListItem key={event.IdEvento}>
            <ListItemText
              primary={event.Nome}
              secondary={formatDateTime(event.HorarioInicial)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
