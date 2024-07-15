// BIBLIOTECAS
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './login/authContext';
import { Button } from '@mui/material';

// FRAMEWORKS - MATERIAL UI
import { Box, Typography, IconButton, CssBaseline, TextField, InputAdornment, InputBase } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import HandymanIcon from '@mui/icons-material/Handyman';

const theme = createTheme();

const CustomSearch = styled(InputBase)(({ theme }) => ({
  width: '250px',
  backgroundColor: '#fff',
  borderRadius: '30px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  height: '40px',
  display: 'flex',
  alignItems: 'center',
}));

export default function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        width: '100%', height: '80px', backgroundColor: '#1E90FF', m: 0, p: 0
      }}>
        <Typography variant="h4" component="h1"
          sx={{ width: '27%', color: '#fff', display: 'flex', justifyContent: 'center' }}>

          {/* Voltar para a Home Page */}
          <Link to="/" style={{ color: '#FFF', textDecoration: 'none', fontFamily: 'Varela Round', marginLeft: '40px' }}>
            AGENDA CULTURAL
          </Link>

        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: 6 }}>

          <IconButton component={Link} to="/manager" sx={{ color: '#fff', ml: 5 }}>
            <HandymanIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
