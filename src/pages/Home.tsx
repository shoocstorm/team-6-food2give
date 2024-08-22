import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import '../assets/css/home.css';

const Home: React.FC = () => {
  const handleLoginClick = () => {
    console.log('Login button clicked');
  };

  return (
    <>
      <Header title="Food Hero" onButtonClick={handleLoginClick} />
      <Box className="home-container">
        <Typography variant="h3" className="home-title">
          Welcome to Food Hero
        </Typography>
        <Typography variant="body1" className="home-description">
          Join us in the fight against food waste and help make the world a better place.
        </Typography>
        <Button variant="contained" color="primary" className="home-button">
          Get Started
        </Button>
      </Box>
    </>
  );
};

export default Home;
