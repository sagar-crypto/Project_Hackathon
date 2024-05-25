import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Grid, Paper, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Chat from 'views/chatbot';

// Create a green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#8bc34a',
    },
  },
});

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Navbar */}
        <AppBar position="static" style={{ marginBottom: '20px' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              EUDR Compliance Portal
            </Typography>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: '30px', marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom>
              What is EUDR?
            </Typography>
            <Typography variant="body1" paragraph>
              The European Union Deforestation Regulation (EUDR) is a new regulatory framework
              aimed at reducing the impact of products placed on the EU market on global deforestation
              and forest degradation. The EUDR mandates strict due diligence obligations for companies
              to ensure that commodities and products do not contribute to deforestation and ecosystem
              destruction.
            </Typography>
            <Typography variant="h4" gutterBottom>
              Why is EUDR Important?
            </Typography>
            <Typography variant="body1" paragraph>
              Deforestation and forest degradation have significant adverse effects on biodiversity, climate change,
              and the livelihoods of indigenous peoples. By enforcing the EUDR, the European Union aims to:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  Protect biodiversity and natural habitats.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Mitigate climate change by preserving carbon sinks.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Promote sustainable and responsible supply chains.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Support the rights and livelihoods of indigenous peoples and local communities.
                </Typography>
              </li>
            </ul>
          </Paper>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" size="large" onClick={handleSignUp}>
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" size="large" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Container>
        <div style={{ bottom: 30, right: 100 }}>
          <Chat />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
