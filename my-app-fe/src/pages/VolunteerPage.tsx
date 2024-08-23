import React from 'react';
import { Grid } from '@mui/material';
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
      </div>

    </>
  );
};

export default VolunteerPage;
