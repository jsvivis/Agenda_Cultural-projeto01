// BIBLIOTECAS
import React from 'react';
import { useNavigate } from 'react-router-dom';

// FRAMEWORKS - MATERIAL UI
import { Container, Grid, Box, Typography, Avatar, IconButton, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const theme = createTheme();

const useRedirect = (path) => {
  const navigate = useNavigate();
  return () => navigate(path);
};

export default function Navbar() {

  const navigateToManager = useRedirect('/manager');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            width: '100%', height: '80px', backgroundColor: '#222222', m: 0, p: 0 }}>
          <Typography variant="h4" component="h1" 
          sx={{width: '27%', color: '#fff', display: 'flex', justifyContent: 'center'}}>
            Agenda Instituto
          </Typography>
          <Box sx={{ width: '58%', display: 'flex', justifyContent: 'center'}}>
            <Button sx={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', border: 'solid 2px #fff',
                borderRadius: '5px', '&:hover': { border: 'solid 2px #fff', color: 'green' }
                 }}
                 onClick={navigateToManager}
                 >
                Gerenciador
            </Button>
          </Box>
          <Box sx={{ width: '15%', display: 'flex', justifyContent: 'center'}}>
          <Avatar>
            <CalendarMonthIcon />
          </Avatar>
          </Box>
        </Box>
    </ThemeProvider>
  );
}

