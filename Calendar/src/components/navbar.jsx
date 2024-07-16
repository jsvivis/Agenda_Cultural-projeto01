import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './login/authContext';
import { Box, Typography, IconButton, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Button } from '@mui/material';

const theme = createTheme();

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtém o usuário e a função de logout do contexto de autenticação

  // Função para obter o nome do usuário do localStorage
  const getUserNameFromLocalStorage = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      return userObj.nome;
    }
    return '';
  };

  const userName = getUserNameFromLocalStorage(); // Obtém o nome do usuário

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '80px',
          backgroundColor: '#1E90FF',
          m: 0,
          p: 0,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            width: '27%',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              color: '#FFF',
              textDecoration: 'none',
              fontFamily: 'Varela Round',
              marginLeft: '40px',
            }}
          >
            AGENDA CULTURAL
          </Link>
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: 6 }}>
            <Typography variant="body1" sx={{ color: '#fff', mr: 3 }}>
              Olá, {userName}.
            </Typography>
            <IconButton component={Link} to="/manager" sx={{ color: '#fff' }}>
              <HandymanIcon fontSize="large" />
            </IconButton>
            <Button variant="contained" color="primary" onClick={logout} sx={{ ml: 2 }}>
              Sair
            </Button>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
