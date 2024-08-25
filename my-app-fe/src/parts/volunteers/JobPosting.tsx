import { Card, CardMedia, Box, Stack, Typography, Divider, CardActionArea } from "@mui/material"
import React from "react"
import InfoIcon from '@mui/icons-material/Info';
import jobPosting from "../../interfaces/JobPosting";
interface JobPostingProps {
  jobPosting: jobPosting,
  onClick: () => void
}

const JobPosting: React.FC<JobPostingProps> = ({
  jobPosting,
  onClick
} : JobPostingProps) => {
  const {orderId, tripDuration, numberOfMeals, pointsEarned, previewImage} = jobPosting || {}
  return (
    <Card>
      <CardActionArea onClick={onClick}>
      <Stack spacing={2} style={{padding: "15px"}}>
        <Typography variant="h5" style={{textAlign: "left"}}>Order #{orderId}</Typography>
        <CardMedia
            component="img"
            height="140"
            image={previewImage}
            alt="Placeholder image"
            sx={{ height: 200 }}
          />
        <Stack spacing={1} style={{textAlign: "left", margin: "10px"}}>
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Order Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="body2">
              <strong>Number of Meals:</strong> {numberOfMeals}
            </Typography>
            <Typography variant="body2">
              <strong>Collectable points:</strong> {pointsEarned}
            </Typography>
            <Typography variant="body2">
              <strong>Estimated trip duration:</strong> {tripDuration} mins
            </Typography>
            <Typography variant="body2">
              <strong>Distance to restaurant:</strong> 5km
            </Typography>
          </Box>
        </Stack>
      </Stack>
      </CardActionArea>

    </Card>
  )
}

export default JobPosting

