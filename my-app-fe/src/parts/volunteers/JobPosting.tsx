import { Card, CardMedia, LinearProgress, Stack, Typography } from "@mui/material"
import React from "react"

interface JobPostingProps {
  
}
const JobPosting: React.FC<JobPostingProps> = ({} : JobPostingProps) => {
  return (
    <Card>
      <Stack spacing={2} style={{padding: "15px"}}>
        <Typography variant="h5">Swensens to Toa Payoh CC</Typography>
        <CardMedia
            component="img"
            height="140"
            image="https://i.pinimg.com/564x/4e/89/61/4e896119923bb3b72823e5dc6657abb6.jpg"
            alt="Placeholder image"
          />
        <LinearProgress variant="determinate" value={50}/>
        <Stack spacing={2} style={{textAlign: "left", margin: "10px"}}>
          <Typography variant="body1">time to restaurant: 5 mins</Typography>
          <Typography variant="body1">delivery time: 23 mins</Typography>
          <Typography variant="body1">Estimated delivery time: 23 mins</Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default JobPosting

