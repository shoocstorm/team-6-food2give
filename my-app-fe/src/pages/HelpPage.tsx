
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../parts/Header'; // Adjust the path as needed

const HelpPage: React.FC = () => {
  return (
    <>
      <Header />
      <Box className="help-container" sx={{ padding: 3 }}>
        <Typography variant="h4" className="help-title" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>What is Food Hero?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Food Hero is a platform that connects food donors, beneficiaries, and volunteers to reduce food waste and
              help those in need.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography>How can I donate food?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To donate food, you need to register as a donor. Once registered, you can post food items that are
              available for donation, and beneficiaries or volunteers will collect them.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
            <Typography>What are the responsibilities of a volunteer?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Volunteers help with the collection and delivery of food donations. They can set their availability and
              accept tasks that match their location and preferences.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
            <Typography>How can I become a beneficiary?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Beneficiaries, such as organizations or individuals in need, can register on the platform. Once registered,
              they can request food donations according to their needs.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
            <Typography>What should I do if I face issues with the platform?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If you encounter any issues, you can contact support through the contact form on this page or consult the
              other FAQs for guidance.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default HelpPage;
