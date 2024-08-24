import React, {useState} from 'react';
import { Container, Grid, Modal, Typography } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import '../assets/css/home.css';
import JobPosting from '../parts/volunteers/JobPosting';
import JobPostingModal from '../parts/volunteers/JobPostingModal';
import jobPosting from '../interfaces/JobPosting';

interface VolunteerPageProps {
  volunteerId: string;
}

const availableJobPostings = [
  {
    orderId: "34",
    foodPostingId: "123765",
    donorId: "Swensens",
    donorLocation: "Bishan Street 1",
    destinationId: "Toa Payoh Lorong 6",
    orderAssigned: false,
    numberOfMeals: 15,
    pointsEarned: 20,
    tripDuration: 35,
    pickupInstructions: "Collect at the back of the restaurant",
    timeToExpiry: 78
  },
  {
    orderId: "29",
    foodPostingId: "789345",
    donorId: "Astons",
    donorLocation: "Holland Village Street 1",
    destinationId: "Jurong Point Lorong 6",
    orderAssigned: false,
    numberOfMeals: 25,
    pointsEarned: 55,
    tripDuration: 45,
    pickupInstructions: "Buy 3 steaks and get the order from us",
    timeToExpiry: 91
  },
]

const currentJobPosting = {
  orderId: "78",
  foodPostingId: "789345",
  donorId: "Bread Talk",
  donorLocation: "Changi Street 23",
  destinationId: "Tampines Point",
  orderAssigned: true,
  numberOfMeals: 20,
  pointsEarned: 50,
  tripDuration: 20,
  pickupInstructions: "Collect at counter",
  timeToExpiry: 115
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ volunteerId } : VolunteerPageProps) => {
  const [selectedJob, setSelectedJob] = useState<jobPosting>(currentJobPosting)
  const [isOpen, setIsOpen] = useState(false)
  const [availableJobs, setAvailableJobs] = useState(availableJobPostings)
  const [currentJob, setCurrentJob] = useState(currentJobPosting)

  return (
    <>
    <Header title={`Welcome, ${volunteerId}!`} />
    <div style={{margin: "30px"}}>
      <Container className="container-box" >
      <Grid container spacing={3}>
      <Grid item lg={12}>
          <Typography style={{textAlign: "left"}} variant="h4">Currently Delivering</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
            <JobPosting jobPosting={currentJob} onClick={() => {
              setIsOpen(true)
              setSelectedJob(currentJob)
              }}/>
          </Grid>
        <Grid item lg={12}>
          <Typography style={{textAlign: "left"}} variant="h4">Available Orders</Typography>
        </Grid>
        {availableJobPostings.map(posting => (
          <>
          <Grid item xs={12} lg={4}>
            <JobPosting jobPosting={posting} onClick={() => {
              setIsOpen(true)
              setSelectedJob(posting)
            }}/>
          </Grid>
          </>
          ))}
      </Grid>
      </Container>
      </div>
      <JobPostingModal jobPosting={selectedJob} open={isOpen} onClose={() => setIsOpen(false)} onAccept={() => null}/>
    </>
  );
};

export default VolunteerPage;