import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { Button, TextField, Box, Typography, Grid, Link } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import foodDeliveryImage from '../../assets/img/foodBank.jpg';  
import Header from '../../parts/Header';
import { useAuth } from '../../context/AuthProvider';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            email,
            password,
        });

        console.log('Login successful:', response.data);
        localStorage.setItem('idToken', response.data.idToken);
        localStorage.setItem('userId', response.data.userId);

        // Redirect to the rewards page or any other page
        navigate('/rewards');
    } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials and try again.');
    }
};

  return (
    <>
      <Header />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Box}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121212',
            padding: 3,
          }}
        >
          <Typography component="span" variant="h4" color="primary" sx={{ color: 'primary.main', marginBottom: 2, fontWeight: '800'}}>
            Welcome Back
          </Typography>
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
              InputLabelProps={{
                style: { color: '#b0b0b0' },
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ input: { color: '#ffffff' }, marginBottom: 2 }}
              InputLabelProps={{
                style: { color: '#b0b0b0' },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                marginTop: 3,
                marginBottom: 2,
                backgroundColor: '#77dd77',
                ':hover': {
                  backgroundColor: '#57A588',
                },
              }}
            >
              Sign in
            </Button>
          </form>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography>New here?</Typography>
              <Link href="/join" variant="body2" sx={{ color: '#77dd77' }}>
                Register for an account
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${foodDeliveryImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',  
            backgroundPosition: 'center',  
            backgroundColor: '#2d4008',
          }}
        />
      </Grid>
    </>
  );
};

export default LoginPage;
