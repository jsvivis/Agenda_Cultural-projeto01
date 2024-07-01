import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import FestivalIcon from '@mui/icons-material/Festival';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const theme = createTheme();

function CreateEvento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nome: "",
    Descricao: "",
    ImagemEvento: "",
    HorarioInicial: "",
    HorarioFinal: "",
    Valor: "",
    PublicoTotal: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/evento", formData);
      console.log(formData)
      console.log(response.data);
      setSuccessMessage("Evento criado com sucesso!");
      setErrorMessage("");
      setFormData({
        Nome: "",
        Descricao: "",
        ImagemEvento: "",
        HorarioInicial: "",
        HorarioFinal: "",
        Valor: "",
        PublicoTotal: "",
      });
    } catch (error) {
      console.error(error);
      setSuccessMessage("");
      setErrorMessage("Erro ao criar evento");
    }
  };

  const handleVoltar = () => {
    navigate("/"); // Navegar de volta para a página
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Cadastrar Evento
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              id="ImagemEvento"
              label="Imagem Evento"
              name="ImagemEvento"
              autoComplete="Imagem"
              value={formData.ImagemEvento}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioInicial"
              label="Início"
              name="HorarioInicial"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.HorarioInicial}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="HorarioFinal"
              label="Final"
              name="HorarioFinal"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
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
              label="Publico Total"
              name="PublicoTotal"
              autoComplete="PublicoTotal"
              value={formData.PublicoTotal}
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
              value={formData.Descricao}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Button type="submit" variant="contained" sx={{ width: 150 }}>
                Cadastrar
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ width: 150 }}
                onClick={handleVoltar}
              >
                Voltar
              </Button>
            </Box>
          </Box>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateEvento;
