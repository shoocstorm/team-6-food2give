import { Card, CardMedia, Box, Stack, Typography, Divider, CardActionArea, CardContent } from "@mui/material"
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
    <Card className="border border-white/20"  sx={{ borderRadius: '5%', margin: 1 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
            component="img"
            height="100"
            image={previewImage}
            alt="Placeholder image"
            sx={{ height: 100 }}
          />
          <CardContent className="flex flex-col ">
          <Typography variant="body1" style={{textAlign: "left"}}>Order #{orderId}</Typography>
          <Typography gutterBottom variant="body2" component="div" align="left">
            Delivering <strong>{numberOfMeals}</strong> meals
          </Typography>
          {/* <Typography variant="caption" color="text.secondary" align="left">
            <strong>Collectable points:</strong> {pointsEarned} 
          </Typography> */}
          </CardContent>
      </CardActionArea>

    </Card>
  )
}

export default JobPosting

