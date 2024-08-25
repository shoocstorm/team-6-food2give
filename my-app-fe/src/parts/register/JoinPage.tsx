import React, { useState } from 'react';
import { 
  Typography, Card, CardContent, Button, Grid, Box, 
  Stepper, Step, StepLabel, TextField, useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import StorageVolunteer from '../../assets/img/warehouse.png'
import Beneficiary from '../../assets/img/house.png'
import Delivery from '../../assets/img/delivery-man.png'
import Donor from '../../assets/img/shelter.png'
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';

interface FormData {
  name?: string;
  email?: string;
  password?: string;
  retypePassword?: string;
  address?: string; // Add address field
  postalCode?: string;
  contactPerson?: string;
  phoneNumber?: string;
  phone?: string;
  storageCapacity?: number;
  availableFrom: Dayjs | null;
  availableTo: Dayjs | null;
  organisation?: string;
}

const roles = [
  { name: 'Beneficiary', icon: <img src={Beneficiary} alt="Storage Volunteer" width="50" height="50" /> },
  { name: 'Storage Volunteer', icon: <img src={StorageVolunteer} alt="Storage Volunteer" width="50" height="50" /> },
  { name: 'Delivery Volunteer', icon: <img src={Delivery} alt="Storage Volunteer" width="50" height="50" /> },
  { name: 'Donor', icon: <img src={Donor} alt="Storage Volunteer" width="50" height="50" /> }
];

const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    availableFrom: null,
    availableTo: null,
  });

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setActiveStep(1);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, { 
            ...formData, 
            roles: [selectedRole.toLowerCase().replace(" ", "")] 
        });
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
        console.error('Registration failed:', error);
        navigate('/');
    }
};

  const commonFields = (
    <>
      <TextField fullWidth label="Full Name (as in NRIC)" name="name" onChange={handleFormChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email Address" name="email" type="email" onChange={handleFormChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Password" name="password" type="password" onChange={handleFormChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Retype Password" name="retypePassword" type="password" onChange={handleFormChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Address" name="address" onChange={handleFormChange} sx={{ mb: 2 }} /> {/* New address field */}
    </>
  );

  const roleSpecificFields = {
    'Beneficiary': (
      <>
        <TextField fullWidth label="Location (Postal Code)" name="postalCode" onChange={handleFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Contact Person" name="contactPerson" onChange={handleFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Phone Number" name="phoneNumber" onChange={handleFormChange} sx={{ mb: 2 }} />
      </>
    ),
    'Storage Volunteer': (
      <>
        <TextField fullWidth label="Phone Number (+65)" name="phone" onChange={handleFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Postal Code" name="postalCode" onChange={handleFormChange} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <DatePicker
            label="Available From"
            value={formData.availableFrom}
            onChange={(newValue) => setFormData({ ...formData, availableFrom: newValue })}
          />
          <DatePicker
            label="Available To"
            value={formData.availableTo}
            onChange={(newValue) => setFormData({ ...formData, availableTo: newValue })}
          />
        </Box>
        <TextField fullWidth label="Storage Capacity (units)" name="storageCapacity" type="number" onChange={handleFormChange} sx={{ mb: 2 }} />
      </>
    ),
    'Delivery Volunteer': (
      <>
        <TextField fullWidth label="Location (Postal Code)" name="postalCode" onChange={handleFormChange} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <DatePicker
            label="Available From"
            value={formData.availableFrom}
            onChange={(newValue) => setFormData({ ...formData, availableFrom: newValue })}
          />
          <DatePicker
            label="Available To"
            value={formData.availableTo}
            onChange={(newValue) => setFormData({ ...formData, availableTo: newValue })}
          />
        </Box>
      </>
    ),
    'Donor': (
      <>
        <TextField fullWidth label="Phone" name="phone" onChange={handleFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Organisation Name/UEN Number" name="organisation" onChange={handleFormChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Location (Postal Code)" name="postalCode" onChange={handleFormChange} sx={{ mb: 2 }} />
      </>
    )
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', color: theme.palette.text.primary }}>
        <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 2, px:20, justifyContent: 'center' }}>
          <Step>
            <StepLabel>Select Role</StepLabel>
          </Step>
          <Step>
            <StepLabel>Register</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 ? (
          <Box sx={{ maxWidth: 600, margin: 'auto', mt: 2, p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" className="py-2">
              Join as a
            </Typography>
            <Grid container spacing={2}>
              {roles.map((role) => (
                <Grid item xs={6} key={role.name}>
                  <Card 
                    onClick={() => handleRoleSelect(role.name)} 
                    sx={{ 
                      cursor: 'pointer', 
                      bgcolor: theme.palette.background.paper,
                      '&:hover': {
                        bgcolor: theme.palette.green[500],
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="h3" sx={{ mb: 1 }}>{role.icon}</Typography>
                      <Typography variant="body1" align="center">
                        {role.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 600, margin: 'auto', mt: 2, p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" className="py-2">
              Register as a {selectedRole}
            </Typography>
            <form onSubmit={handleRegister}>
              {commonFields}
              {roleSpecificFields[selectedRole as keyof typeof roleSpecificFields]}
              <Button 
                type="submit"
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ 
                  mt: 2,
                  bgcolor: theme.palette.green[300],
                  '&:hover': {
                    bgcolor: theme.palette.green[400],
                  }
                }}
              >
                Register
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default JoinPage;
