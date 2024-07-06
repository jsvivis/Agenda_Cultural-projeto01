import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Container,
  MenuItem,
  Box,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    IdEvento: '',
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
        const formattedEvents = response.data.map(evento => ({
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
        }));
        setEvents(formattedEvents);
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

  const formatDateTimeForInput = (dateTimeString) => {
    if (!dateTimeString) {
      return ''; // Retorna uma string vazia se a data for nula
    }
    const dateObj = new Date(dateTimeString);
    return dateObj.toISOString().slice(0, 16); // Formato 'yyyy-MM-ddThh:mm'
  };

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
    setCurrentEvent(null); // Reset currentEvent for adding new event
    setFormData({
      IdEvento: '',
      Nome: '',
      Descricao: '',
      HorarioInicial: formatDateTimeForInput(start),
      HorarioFinal: formatDateTimeForInput(end),
      Valor: '',
      PublicoTotal: '',
      IdEspacoCultural: '',
      IdEspaco: '',
      IdCategoria: '',
    });
    setOpen(true);
  };

  const handleSelectEvent = async (event) => {
    setCurrentEvent(event);

    try {
      const response = await axios.get(`http://localhost:3000/evento/${event.IdEvento}`);
      const eventData = response.data;

      setFormData({
        IdEvento: eventData.IdEvento || '',
        Nome: eventData.Nome || '',
        Descricao: eventData.Descricao || '',
        HorarioInicial: formatDateTimeForInput(eventData.HorarioInicial),
        HorarioFinal: formatDateTimeForInput(eventData.HorarioFinal),
        Valor: eventData.Valor || '',
        PublicoTotal: eventData.PublicoTotal || '',
        IdEspacoCultural: eventData.IdEspacoCultural || '',
        IdEspaco: eventData.IdEspaco || '',
        IdCategoria: eventData.IdCategoria || '',
      });

      // Busca os espaços culturais e espaços baseado no IdEspacoCultural
      fetchEspacos(eventData.IdEspacoCultural);
    } catch (error) {
      console.error('Erro ao buscar evento para edição:', error);
      // Se ocorrer erro, preencha o formulário com os dados do evento selecionado
      setFormData({
        IdEvento: event.IdEvento, // Usando event.IdEvento conforme sugerido pelo servidor
        Nome: event.title,
        Descricao: event.descricao,
        HorarioInicial: formatDateTimeForInput(event.start),
        HorarioFinal: formatDateTimeForInput(event.end),
        Valor: event.valor,
        PublicoTotal: event.publicoTotal,
        IdEspacoCultural: event.idEspacoCultural,
        IdEspaco: event.idEspaco,
        IdCategoria: event.idCategoria,
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
    setFormData({
      IdEvento: '',
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
        response = await axios.put(`http://localhost:3000/evento/${currentEvent.IdEvento}`, formData);
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{currentEvent ? 'Editar Evento' : 'Adicionar Evento'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Preencha os campos abaixo para {currentEvent ? 'editar' : 'adicionar'} um evento.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nome"
              name="Nome"
              label="Nome"
              type="text"
              fullWidth
              required
              value={formData.Nome}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="descricao"
              name="Descricao"
              label="Descrição"
              type="text"
              fullWidth
              multiline
              required
              rows={4}
              value={formData.Descricao}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="horarioInicial"
              name="HorarioInicial"
              label="Horário Inicial"
              type="datetime-local"
              fullWidth
              required
              value={formData.HorarioInicial}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="horarioFinal"
              name="HorarioFinal"
              label="Horário Final"
              type="datetime-local"
              fullWidth
              required
              value={formData.HorarioFinal}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="valor"
              name="Valor"
              label="Valor"
              type="number"
              fullWidth
              required
              value={formData.Valor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="publicoTotal"
              name="PublicoTotal"
              label="Público Total"
              type="number"
              fullWidth
              required
              value={formData.PublicoTotal}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="idEspacoCultural">Espaço Cultural</InputLabel>
              <Select
                label="Espaço Cultural"
                native
                value={formData.IdEspacoCultural}
                onChange={handleChange}
                inputProps={{
                  name: 'IdEspacoCultural',
                  id: 'idEspacoCultural',
                }}
              >
                <option aria-label="None" value="" />
                {espacosCulturais.map((espacoCultural) => (
                  <option key={espacoCultural.IdEspacoCultural} value={espacoCultural.IdEspacoCultural}>
                    {espacoCultural.Nome}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="idEspaco">Espaço</InputLabel>
              <Select
                label="Espaço"
                native
                value={formData.IdEspaco}
                onChange={handleChange}
                inputProps={{
                  name: 'IdEspaco',
                  id: 'idEspaco',
                }}
              >
                <option aria-label="None" value="" />
                {espacos.map((espaco) => (
                  <option key={espaco.IdEspaco} value={espaco.IdEspaco}>
                    {espaco.Nome}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="idCategoria">Categoria</InputLabel>
              <Select
                label="Categoria"
                value={formData.IdCategoria}
                onChange={handleChange}
                inputProps={{
                  name: 'IdCategoria',
                  id: 'idCategoria',
                }}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: categoria.Cor,
                          marginRight: '8px',
                        }}
                      />
                      {categoria.Nome}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar open={successMessage !== ''} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorMessage !== ''} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BigCalendar;
