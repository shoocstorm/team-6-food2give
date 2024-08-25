import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import Header from '../parts/Header'; // Import Header component
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../assets/css/home.css';
import { useNavigate } from 'react-router-dom'; 



const Home: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMenuItemClick = (route: string) => {
    navigate(route); // Navigate to the specified route
    // If you have a drawer or any other UI element to close, you can manage it here
    // setDrawerOpen(false); // Example: Close drawer after navigation
  };
  return (
    <>
      <Header />
      <Box className="home-container overflow-auto h-screen px-2">
        <Typography variant="body1" className="home-title flex-col flex pt-10 py-2 font-light" sx={{fontWeight:'200'}}>
          Want to make a difference?{' '}
          <Typography
            variant="h4"
            component="span"
            sx={{ color: 'primary.main', fontWeight:'800' }}
            className="py-2"
          >
            Volunteer for <br/>
            Food Hero
          </Typography>

          <Typography variant="body1" className="home-description px-4">
            Join us in the fight against food waste and help make the world a better place.
          </Typography>

        </Typography>
      <div className="flex flex-row gap-4">
        <Button variant="contained" className="home-button" sx={{backgroundColor:"green.400",color:'white', fontWeight:'600'}} 
        endIcon={<ChevronRightIcon />}
        onClick={() => handleMenuItemClick('/join')}>
          Sign up
        </Button>
        <Button variant="contained" className="home-button" sx={{backgroundColor:"green.400",color:'white', fontWeight:'600'}} 
        endIcon={<ChevronRightIcon />}
        onClick={() => handleMenuItemClick('/login')}>
          Login
        </Button>
      </div>
      <img src="/home/foodDel.png" alt="food delivery" className="w-80 h-80 relative bottom-5"/>
      <div className="flex flex-col gap-2 mb-10">
        <Typography variant="body1" className="home-title flex-col flex py-2 font-light" sx={{fontWeight:'300'}}>
            Help reduce waste
            <Typography
              variant="h4"
              component="span"
              sx={{ color: 'primary.main', fontWeight:'800' }}
              className="py-2">
                It's Easy
              </Typography>
        </Typography>

        <div className="flex flex-row justify-evenly">
          <img src="/home/storage.png" alt="kitchen" className="w-36 h-36"/>
          <div className="flex flex-col px-4">
            <Typography variant="body1" align="left">
              Volunteer your storage
            </Typography>
            <Typography variant="caption" className="home-description" align="left" sx={{fontWeight:'300'}}> 
              Offer your fridge to store food that would otherwise go to waste.
            </Typography>
          </div>
        </div>

        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col px-4">
            <Typography variant="body1" align="left">
              Volunteer to deliver
            </Typography>
            <Typography variant="caption" className="home-description" align="left" sx={{fontWeight:'300'}}>
              Help deliver food to organizations that need it. 
            </Typography>
          </div>
          <img src="/home/delivery.png" alt="kitchen" className="w-36 h-36 relative bottom-4"/>

        </div>

        <div className="flex flex-row justify-evenly">
          <img src="/home/donateFood.png" alt="kitchen" className="w-36 h-36"/>
          <div className="flex flex-col px-4">
            <Typography variant="body1" align="left">
              Volunteer to donate
            </Typography>
            <Typography variant="caption" className="home-description" align="left" sx={{fontWeight:'300'}}> 
              Donate food that you would otherwise throw away.
            </Typography>
          </div>
        </div>

        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col px-4">
            <Typography variant="body1" align="left">
              Order donated food
            </Typography>
            <Typography variant="caption" className="home-description" align="left" sx={{fontWeight:'300'}}> 
              Order food from our partners to meet your needs.
            </Typography>
          </div>
          <img src="/home/familyDinner.png" alt="kitchen" className="w-36 h-36"/>

        </div>

      </div>
      {/* <div className="grid grid-cols-2 gap-4 ">
        <Typography className="p-4 rounded-lg" variant="caption"
        sx={{backgroundColor:"green.300", color:"white"}}>
          Promotional Material
        </Typography>
        <Typography className="p-4 rounded-lg" variant="caption"
        sx={{backgroundColor:"green.300", color:"white"}}>
          Promotional Material
        </Typography>
        <Typography className="p-4 rounded-lg" variant="caption"
        sx={{backgroundColor:"green.300", color:"white"}}>
          Promotional Material
        </Typography>
        <Typography className="p-4 rounded-lg" variant="caption"
        sx={{backgroundColor:"green.300", color:"white"}}>
          Promotional Material
        </Typography>
      </div> */}


      </Box>
    </>
  );
};

export default Home;
