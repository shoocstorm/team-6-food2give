import React, { useState } from 'react';
import { Box, Card, Container, Grid, Stack, Typography, Button } from '@mui/material';


const initialRewards = [
  {
    id: 1,
    title: 'Free Coffee Voucher',
    description: 'Redeem a free coffee voucher at participating locations.',
    pointsRequired: 100,
  },
  {
    id: 2,
    title: '20 percent off food Voucher',
    description: 'Get a discount on your food purchase with this voucher.',
    pointsRequired: 100,
  },
  {
    id: 3,
    title: 'Free Meal Voucher',
    description: 'Enjoy a free meal at select restaurants.',
    pointsRequired: 100,
  },
  {
    id: 4,
    title: '1 for 1 drink Voucher',
    description: 'Redeem a free drink for any drink purchase at participating stores.',
    pointsRequired: 100,
  },
  {
    id: 5,
    title: '1 for 1 pizza Voucher',
    description: 'Redeem a free pizza for any pizza purchase at participating stores.',
    pointsRequired: 100,
  },
  {
    id: 6,
    title: 'Free Coffee Voucher',
    description: 'Redeem a free coffee voucher at participating locations.',
    pointsRequired: 100,
  },
];

export default function RewardsPage() {
  // State to manage user points
  const [points, setPoints] = useState(450); // Example initial points, this should come from your backend or state

  // State to manage redeemed rewards
  const [rewards, setRewards] = useState(initialRewards);

  // Handle redeeming a reward
  const handleRedeem = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && points >= reward.pointsRequired) {
      // Deduct points
      setPoints(points - reward.pointsRequired);
      
      // Optionally, remove the redeemed reward from the list (or mark it as redeemed)
      setRewards(rewards.filter(r => r.id !== rewardId));
      
      // Implement further redeem logic, such as an API call to the backend
      console.log(`Reward ${reward.title} redeemed!`);
    }
  };

  return (
    <Box
      id="rewards"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        {/* Points Display Section */}
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Your Rewards
          </Typography>
          <Typography variant="h5" sx={{ color: 'grey.400', fontWeight: 'bold', mt: 2 }}>
            Points Collected: {points}
          </Typography>
        </Box>

        {/* Rewards Cards Section */}
        <Grid container spacing={2.5}>
          {rewards.map((reward) => (
            <Grid item xs={12} sm={6} md={4} key={reward.id}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
               
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {reward.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400', mb: 1 }}>
                    {reward.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Points Required: {reward.pointsRequired}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={points < reward.pointsRequired}
                    onClick={() => handleRedeem(reward.id)}
                    sx={{ mt: 2 }}
                  >
                    Redeem
                  </Button>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
