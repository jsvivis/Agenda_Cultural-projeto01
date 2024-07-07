import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/evento')
      .then(response => {
        // Ordenando os eventos por HorarioInicial após recebê-los da API
        const sortedEvents = response.data.sort((a, b) => {
          return new Date(a.HorarioInicial) - new Date(b.HorarioInicial);
        });
        setEvents(sortedEvents);
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
      <Box sx={{ width: '100%', maxHeight: '200px', overflowY: 'auto', mt: 2 }}>
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
      </Box>
    </Paper>
  );
}
