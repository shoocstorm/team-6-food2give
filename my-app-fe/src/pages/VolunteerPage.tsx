import React from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import '../assets/css/home.css';
import JobPosting from '../parts/volunteers/JobPosting';

interface VolunteerPageProps {
  volunteerId: string;
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ volunteerId } : VolunteerPageProps) => {
  return (
    <>
    <Header title={`Welcome, ${volunteerId}!`} />
    <div style={{margin: "20px 0px"}}>
      <Container className="container-box" >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <JobPosting/>
        </Grid>
        <Grid item xs={4}>
          <JobPosting/>
        </Grid>
        <Grid item xs={4}>
          <JobPosting/>
        </Grid>
        <Grid item xs={4}>
          <JobPosting/>
        </Grid>
      </Grid>
      </Container>
      </div>

    </>
  );
};

export default VolunteerPage;
