import React, { useState } from 'react';
import { Box, Container, Grid, Modal, Typography, Card } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import '../assets/css/home.css';
import JobPosting from '../parts/volunteers/JobPosting';
import JobPostingModal from '../parts/volunteers/JobPostingModal';
import jobPosting, { emptyJobPosting } from '../interfaces/JobPosting';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from '../parts/components/Profile';
import SearchBar from "../parts/components/SearchBar";

interface VolunteerPageProps {
  volunteerId: string;
}
const availableJobPostings = [
  {
    orderId: "78",
    foodPostingId: "789345",
    donorId: "Crave",
    donorLocation: "Marsiling",
    destinationId: "Woodlands Community Care Centre",
    orderAssigned: false,
    numberOfMeals: 20,
    pointsEarned: 50,
    tripDuration: 20,
    pickupInstructions: "Collect at our counter",
    timeToExpiry: 115,
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
    previewImage: "/beneficiary/food_3.png"
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

const VolunteerAllOrdersPage: React.FC<VolunteerPageProps> = ({ volunteerId }: VolunteerPageProps) => {
  const [selectedJob, setSelectedJob] = useState<jobPosting>(emptyJobPosting())
  const [isOpen, setIsOpen] = useState(false)
  const [availableJobs, setAvailableJobs] = useState(availableJobPostings)
  const [currentJob, setCurrentJob] = useState(currentJobPosting)
  const [searchQuery, setSearchQuery] = useState("");
  const idToken = localStorage.getItem('idToken')
  const userId = localStorage.getItem('userId')

  const onAccept = async () => {
    try {
      const payload = {
        originLocation: {
          address: selectedJob.donorLocation,
          postalCode: "987654", // Replace with actual data if available
        },
        destinationLocation: {
          address: selectedJob.destinationId,
          postalCode: "123987", // Replace with actual data if available
        },
        pointsAvailable: selectedJob.pointsEarned,
        numberOfMeals: selectedJob.numberOfMeals,
        donorListingId: selectedJob.foodPostingId,
        userId: userId,
      };
      // Make a POST request to your backend to accept the order
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/add`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Order accepted successfully:", response.data);
        setIsOpen(false);
        alert("SUCCESS")
        // Optionally update the UI, for example, move the order from availableJobs to currentJob
      }
    } catch (error) {
      console.error("Error accepting the order:", error);
    }
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
      <Header />
      <Profile name="Anderson Lim" imageUrl="/profile/volunteerRider.jpg" />
      <>
        <ul className="w-screen flex flex-row justify-around">
          {SECTIONS.map((section, idx) => {
            const word = section.toLowerCase().replaceAll(" ", "-");
            const formattedLink = word === "currently-delivering" ? "/volunteer" : ``;

            return (
              <li key={idx} className="relative text-xl text-white">
                <Link to={formattedLink} className="text-white no-underline">
                  {section}
                </Link>
                <hr className={`absolute left-0 right-0 top-8 ${word === "orders-to-fulfil" ? 'bg-white h-1 border-0' : 'hidden'}`}></hr>
              </li>
            )
          }
          )}
        </ul>
        <div className="w-full border-t border-2 relative top-1 bg-slate-800 border-b border-white border-opacity-10" />

      </>
      <Card className="p-5 h-screen">
        <SearchBar
          setSearchQuery={setSearchQuery}
          className="mt-4 w-full"
        />

        <div className="w-full grid grid-cols-2 mt-4" >
          {availableJobs.map(posting => (
            <>
              <Grid item xs={12} lg={4}>
                <JobPosting jobPosting={posting} onClick={() => {
                  setIsOpen(true)
                  setSelectedJob(posting)
                }} />
              </Grid>
            </>
          ))}
        </div>
      </Card>
      <JobPostingModal jobPosting={selectedJob} open={isOpen} onClose={() => setIsOpen(false)} onAccept={onAccept} onFinish={onFinish} onCancel={onFinish} />
    </>
  );
};

export default VolunteerAllOrdersPage;
