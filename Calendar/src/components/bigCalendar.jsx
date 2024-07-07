import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Container,
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
  MenuItem,
} from '@mui/material';
import { Alert } from '@mui/material';

const localizer = momentLocalizer(moment);

const BigCalendarComponent = ({ selectedDate }) => {
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
        IdEvento: event.id,
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
        response = await axios.put(`http://localhost:3000/evento/${currentEvent.id}`, formData);
      } else {
        response = await axios.post('http://localhost:3000/evento', formData);
      }
      console.log(response.data);
      setSuccessMessage('Evento salvo com sucesso!');
      setErrorMessage('');
      const newEvent = {
        id: response.data.IdEvento,
        title: response.data.Nome,
        start: new Date(response.data.HorarioInicial),
        end: new Date(response.data.HorarioFinal),
        descricao: response.data.Descricao,
        valor: response.data.Valor,
        publicoTotal: response.data.PublicoTotal,
        idEspacoCultural: response.data.IdEspacoCultural,
        idEspaco: response.data.IdEspaco,
        idCategoria: response.data.IdCategoria,
        categoriaCor: response.data.CategoriaCor,
      };
      if (currentEvent) {
        setEvents(events.map(event => (event.id === currentEvent.id ? newEvent : event)));
      } else {
        setEvents([...events, newEvent]);
      }
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setSuccessMessage('');
      setErrorMessage('Erro ao salvar evento. Por favor, tente novamente.');
    }
  };

  return (
    <Container maxWidth="false">
      <CssBaseline />
      <Box sx={{ margin: 2 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100vh', width: '100%' }} // Exemplo utilizando unidades de viewport
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        defaultView="week"
        views={['day', 'week', 'month']}
        date={selectedDate}
        onNavigate={() => {}}
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.categoriaCor || '#3174ad' },
        })}
      />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentEvent ? 'Editar Evento' : 'Adicionar Evento'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Preencha as informações do evento abaixo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="Nome"
              name="Nome"
              label="Nome"
              type="text"
              fullWidth
              value={formData.Nome}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="Descricao"
              name="Descricao"
              label="Descrição"
              type="text"
              fullWidth
              value={formData.Descricao}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="HorarioInicial"
              name="HorarioInicial"
              label="Horário Inicial"
              type="datetime-local"
              fullWidth
              value={formData.HorarioInicial}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="HorarioFinal"
              name="HorarioFinal"
              label="Horário Final"
              type="datetime-local"
              fullWidth
              value={formData.HorarioFinal}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="Valor"
              name="Valor"
              label="Valor"
              type="number"
              fullWidth
              value={formData.Valor}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="PublicoTotal"
              name="PublicoTotal"
              label="Público Total"
              type="number"
              fullWidth
              value={formData.PublicoTotal}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="espacoCulturalLabel">Espaço Cultural</InputLabel>
              <Select
                label="Espaço Cultural"
                labelId="espacoCulturalLabel"
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
            <FormControl fullWidth margin="dense">
              <InputLabel id="espacoLabel">Espaço</InputLabel>
              <Select
               label="Epaço"
                labelId="espacoLabel"
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
            <FormControl fullWidth margin="dense">
                <InputLabel id="categoriaLabel">Categoria</InputLabel>
                <Select
                  label="Categoria"
                  labelId="categoriaLabel"
                  id="IdCategoria"
                  name="IdCategoria"
                  value={formData.IdCategoria}
                  onChange={handleChange}
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.IdCategoria} value={categoria.IdCategoria}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: categoria.Cor, // Supondo que a cor está disponível como categoria.Cor
                            marginRight: 1,
                          }}
                        />
                        {categoria.Nome}
                      </Box>
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
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BigCalendarComponent;
