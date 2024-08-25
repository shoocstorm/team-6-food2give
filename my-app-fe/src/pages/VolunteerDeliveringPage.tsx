import React, {useState} from 'react';
import { Box, Container, Grid, Modal, Typography } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import '../assets/css/home.css';
import JobPosting from '../parts/volunteers/JobPosting';
import JobPostingModal from '../parts/volunteers/JobPostingModal';
import jobPosting, { emptyJobPosting } from '../interfaces/JobPosting';
import { Link } from 'react-router-dom';

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
    timeToExpiry: 78,
    previewImage: "/beneficiary/food_1.jpeg"
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
    timeToExpiry: 91,
    previewImage: "/beneficiary/food_2.jpeg"
  },
  {
    orderId: "98",
    foodPostingId: "221343",
    donorId: "Jade Street",
    donorLocation: "Ocean Financial Centre. 10 Collyer Quay",
    destinationId: "Rochor CC",
    orderAssigned: false,
    numberOfMeals: 42,
    pointsEarned: 12,
    tripDuration: 22,
    pickupInstructions: "Help us make the market and we'll give you the food",
    timeToExpiry: 91,
    previewImage: "/beneficiary/food_3.jpeg"
  },
  {
    orderId: "78",
    foodPostingId: "789345",
    donorId: "Bread Talk",
    donorLocation: "Changi Street 23",
    destinationId: "Tampines Point",
    orderAssigned: false,
    numberOfMeals: 20,
    pointsEarned: 50,
    tripDuration: 20,
    pickupInstructions: "Collect at counter",
    timeToExpiry: 115,
    previewImage: "/beneficiary/food_4.jpeg"
  }
]

const SECTIONS = ["Currently Delivering", "Orders to Fulfil"]

const currentJobPosting = {
  orderId: "78",
  foodPostingId: "789345",
  donorId: "Crave",
  donorLocation: "Marsiling",
  destinationId: "Woodlands Community Care Centre",
  orderAssigned: true,
  numberOfMeals: 20,
  pointsEarned: 50,
  tripDuration: 20,
  pickupInstructions: "Collect at our counter",
  timeToExpiry: 115,
  previewImage: "/beneficiary/food_1.jpeg"
}

const VolunteerPage: React.FC<VolunteerPageProps> = ({ volunteerId } : VolunteerPageProps) => {
  const [selectedJob, setSelectedJob] = useState<jobPosting>(emptyJobPosting())
  const [isOpen, setIsOpen] = useState(false)
  const [availableJobs, setAvailableJobs] = useState(availableJobPostings)
  const [currentJob, setCurrentJob] = useState(currentJobPosting)

  const onAccept = () => {
    setCurrentJob({
      ...selectedJob,
      orderAssigned: true
    })
    setAvailableJobs(availableJobs.reduce((acc: any, curr: any) => {
      if (curr.orderId === selectedJob.orderId) return acc
      return [...acc, curr]
    }, []))
    setIsOpen(false)
  }

  const onFinish = () => {
    setCurrentJob(emptyJobPosting())
    setIsOpen(false)
  }

  return (
    <>
    <Header title={`Food Hero`} />
    <Typography variant="h5" fontWeight="semibold" align="left" className="p-4">
            Welcome {volunteerId}!
        </Typography>
    <>
          <ul className="w-screen flex flex-row justify-around">
              {SECTIONS.map((section, idx) => {
                const word = section.toLowerCase().replaceAll(" ", "-");
                const formattedLink = word === "currently-delivering" ? "" : section.toLowerCase().replaceAll(" ", "-");

                return (
                  <li key={idx} className="relative text-xl text-white">
                  <Link to={formattedLink} className="text-white no-underline">
                    {section}
                  </Link>
                  <hr className={`absolute left-0 right-0 top-8 ${word === "currently-delivering" ? 'bg-white h-1 border-0': 'hidden'}`}></hr>
                </li>
                )}
              )}
          </ul>
        <div className="w-full border-t border-2 relative top-1 bg-slate-800 border-b border-white border-opacity-10"/>
      
    </>
    <div style={{margin: "40px 80px"}}>
      <Container className="container-box" >
      <Grid container spacing={3}>
        { currentJob.orderAssigned ?
        <Grid item xs={12} lg={4}>
             <JobPosting jobPosting={currentJob} onClick={() => {
              setIsOpen(true)
              setSelectedJob(currentJob)
              }}/>
          </Grid> :<Grid item lg={12}> <Box><Typography>No orders currently! Head to the "Orders to Fulfil" tab to get started!</Typography></Box>
          </Grid>}
      </Grid>
      </Container>
      </div>
      <JobPostingModal jobPosting={selectedJob} open={isOpen} onClose={() => setIsOpen(false)} onAccept={onAccept} onFinish={onFinish} onCancel={onFinish}/>
    </>
  );
};

export default VolunteerPage;
