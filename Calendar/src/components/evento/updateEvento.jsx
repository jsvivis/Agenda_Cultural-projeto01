import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FestivalIcon from '@mui/icons-material/Festival';
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  TextField,
  Typography,
  Alert,
  TextareaAutosize,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function UpdateEvento() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [evento, setEvento] = useState({
    Nome: "",
    Descricao: "",
    ImagemEvento: "",
    HorarioInicial: "",
    HorarioFinal: "",
    Valor: "",
    Publico: "",
    PublicoTotal: "",
    Ativo: false,
  });
  const [espacosCulturais, setEspacosCulturais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/evento/${id}`);
        const eventoData = response.data[0]; // Acessa o primeiro objeto no array
        setEvento({
          Nome: eventoData.Nome,
          Descricao: eventoData.Descricao,
          ImagemEvento: eventoData.ImagemEvento,
          HorarioInicial: eventoData.HorarioInicial,
          HorarioFinal: eventoData.HorarioFinal,
          Valor: eventoData.Valor,
          Publico: eventoData.Publico,
          PublicoTotal: eventoData.PublicoTotal,
          Ativo: eventoData.Ativo,
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar evento");
      } finally {
        setLoading(false);
      }
    };

    const fetchEspacosCulturais = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/espacocultural"
        );
        setEspacosCulturais(response.data);
      } catch (error) {
        console.error("Erro ao carregar espaços culturais:", error);
      }
    };

    fetchEvento();
    fetchEspacosCulturais();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEvento({ ...evento, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/evento/${id}`, {
        Nome: evento.Nome,
        Descricao: evento.Descricao,
        ImagemEvento: evento.ImagemEvento,
        HorarioInicial: evento.HorarioInicial,
        HorarioFinal: evento.HorarioFinal,
        Valor: evento.Valor,
        Publico: evento.Publico,
        PublicoTotal: evento.PublicoTotal,
        Ativo: evento.Ativo,
      });
      setError(null);
      setSuccessMessage("Evento atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar evento");
    }
  };

  const handleVoltar = () => {
    navigate("/buscarevento"); // Navegar de volta para a página
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <FestivalIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Atualizar Evento
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, width: "50%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Nome"
              label="Nome"
              name="Nome"
              autoComplete="off"
              value={evento.Nome}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="ImagemEvento"
              label="Imagem do Evento"
              name="ImagemEvento"
              autoComplete="off"
              value={evento.ImagemEvento}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="HorarioInicial"
              label="Horário Inicial"
              name="HorarioInicial"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={evento.HorarioInicial}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="HorarioFinal"
              label="Horário Final"
              name="HorarioFinal"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={evento.HorarioFinal}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Valor"
              label="Valor"
              name="Valor"
              type="number"
              autoComplete="off"
              value={evento.Valor}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Publico"
              label="Público"
              name="Publico"
              type="number"
              autoComplete="off"
              value={evento.Publico}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="PublicoTotal"
              label="Público Total"
              name="PublicoTotal"
              type="number"
              autoComplete="off"
              value={evento.PublicoTotal}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextareaAutosize
                id="Descricao"
                name="Descricao"
                aria-label="Descrição"
                minRows={3}
                placeholder="Descrição do evento"
                value={evento.Descricao}
                onChange={handleChange}
                style={{ width: "100%", resize: "vertical", padding: "10px" }}
              />
            </FormControl>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Ativo</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={evento.Ativo}
                      onChange={handleChange}
                      name="Ativo"
                    />
                  }
                  label="Ativo"
                />
              </FormGroup>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                onClick={handleVoltar}
                sx={{ width: 150 }}
              >
                Voltar
              </Button>
            </Box>
          </Box>
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateEvento;
