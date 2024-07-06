import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {
  Container,
  CssBaseline,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Button,
} from '@mui/material';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    Nome: '',
    Descricao: '',
    HorarioInicial: '',
    HorarioFinal: '',
    Valor: '',
    PublicoTotal: '',
    IdEspacoCultural: '',
    IdEspaco: '',
    IdCategoria: '',
  });
  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [espacos, setEspacos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/evento');
        setEvents(response.data.map(evento => ({
          id: evento.IdEvento,
          title: evento.Nome,
          start: new Date(evento.HorarioInicial),
          end: new Date(evento.HorarioFinal),
          descricao: evento.Descricao,
          valor: evento.Valor,
          publicoTotal: evento.PublicoTotal,
          idEspacoCultural: evento.IdEspacoCultural,
          idEspaco: evento.IdEspaco,
          idCategoria: evento.IdCategoria,
          categoriaCor: evento.CorCategoria,
        })));
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get('http://localhost:3000/espacocultural');
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error('Erro ao buscar espaços culturais:', error);
      }
    };

    fetchEspacosCulturais();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'IdEspacoCultural') {
      fetchEspacos(value);
    }
  };

  const fetchEspacos = async (idEspacoCultural) => {
    try {
      const response = await axios.get(`http://localhost:3000/espaco/${idEspacoCultural}`);
      setEspacos(response.data);
    } catch (error) {
      console.error('Erro ao buscar espaços:', error);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setCurrentEvent({ start, end });
    setFormData({ ...formData, HorarioInicial: start, HorarioFinal: end });
    setOpen(true);
  };

  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setFormData({
      Nome: event.title,
      Descricao: event.descricao,
      HorarioInicial: event.start,
      HorarioFinal: event.end,
      Valor: event.valor,
      PublicoTotal: event.publicoTotal,
      IdEspacoCultural: event.idEspacoCultural,
      IdEspaco: event.idEspaco,
      IdCategoria: event.idCategoria,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
    setFormData({
      Nome: '',
      Descricao: '',
      HorarioInicial: '',
      HorarioFinal: '',
      Valor: '',
      PublicoTotal: '',
      IdEspacoCultural: '',
      IdEspaco: '',
      IdCategoria: '',
    });
  };

  const handleSave = async () => {
    try {
      let response;
      if (currentEvent) {
        //response = await axios.put(`http://localhost:3000/evento/${currentEvent.id}`, formData);
        response = await axios.post('http://localhost:3000/evento', formData);
      } else {
        response = await axios.post('http://localhost:3000/evento', formData);
      }
      console.log(response.data);
      setSuccessMessage('Evento salvo com sucesso!');
      setErrorMessage('');
      const newEvent = {
        id: formData.IdEvento,
        title: formData.Nome,
        start: formData.HorarioInicial,
        end: formData.HorarioFinal,
        descricao: formData.Descricao,
        valor: formData.Valor,
        publicoTotal: formData.PublicoTotal,
        idEspacoCultural: formData.IdEspacoCultural,
        idEspaco: formData.IdEspaco,
        idCategoria: formData.IdCategoria,
        categoriaCor: categorias.find(categoria => categoria.IdCategoria === formData.IdCategoria)?.CorCategoria || '',
      };
      if (currentEvent) {
        const updatedEvents = events.map(event => event.id === currentEvent.id ? newEvent : event);
        setEvents(updatedEvents);
      } else {
        setEvents([...events, newEvent]);
      }
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setSuccessMessage('');
      setErrorMessage('Erro ao salvar evento');
    }
    handleClose();
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.categoriaCor || '#3174ad';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return { style };
  };

  return (
    <Container component="main" maxWidth="lg" className={open ? 'blurredBackground' : ''}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: 500, width: '100%' }}
        />
        <Dialog open={open} onClose={handleClose} BackdropComponent={Backdrop} BackdropProps={{ invisible: true }}>
          <DialogTitle>{currentEvent ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {currentEvent ? 'Preencha os campos abaixo' : 'Preencha os campos abaixo'}
            </DialogContentText>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="Nome"
              autoFocus
              value={formData.Nome}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Descricao"
              label="Descrição"
              name="Descricao"
              autoComplete="Descricao"
              multiline
              rows={4}
              value={formData.Descricao}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioInicial"
              label="Horário Inicial"
              name="HorarioInicial"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.HorarioInicial}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioFinal"
              label="Horário Final"
              name="HorarioFinal"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.HorarioFinal}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Valor"
              label="Valor"
              name="Valor"
              autoComplete="Valor"
              value={formData.Valor}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PublicoTotal"
              label="Público Total"
              name="PublicoTotal"
              autoComplete="PublicoTotal"
              value={formData.PublicoTotal}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="IdEspacoCultural-label">Espaço Cultural</InputLabel>
              <Select
                labelId="IdEspacoCultural-label"
                id="IdEspacoCultural"
                name="IdEspacoCultural"
                value={formData.IdEspacoCultural}
                onChange={handleChange}
              >
                {espacosCulturais.map((espacoCultural) => (
                  <MenuItem key={espacoCultural.IdEspacoCultural} value={espacoCultural.IdEspacoCultural}>
                    {espacoCultural.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="IdEspaco-label">Espaço</InputLabel>
              <Select
                labelId="IdEspaco-label"
                id="IdEspaco"
                name="IdEspaco"
                value={formData.IdEspaco}
                onChange={handleChange}
              >
                {espacos.map((espaco) => (
                  <MenuItem key={espaco.IdEspaco} value={espaco.IdEspaco}>
                    {espaco.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="IdCategoria-label">Categoria</InputLabel>
              <Select
                labelId="IdCategoria-label"
                id="IdCategoria"
                name="IdCategoria"
                value={formData.IdCategoria}
                onChange={handleChange}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                    {categoria.Nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">Salvar</Button>
          </DialogActions>
        </Dialog>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </Container>
  );
};

export default BigCalendar;
