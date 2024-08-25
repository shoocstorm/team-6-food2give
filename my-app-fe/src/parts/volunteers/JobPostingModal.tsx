import {
  Card,
  CardMedia,
  Box,
  Stack,
  Typography,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import jobPosting from "../../interfaces/JobPosting";

interface JobPostingModalProps {
  jobPosting: jobPosting;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  onFinish: () => void;
  onCancel: () => void;
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({
  jobPosting,
  open,
  onClose,
  onAccept,
  onFinish,
  onCancel,
}) => {
  const {
    orderId,
    pickupInstructions,
    timeToExpiry,
    tripDuration,
    donorLocation,
    destinationId,
    numberOfMeals,
    orderAssigned,
    previewImage,
  } = jobPosting;
  return (
    <Modal open={open} onClose={onClose} className="m-4 overflow-scroll">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <Stack spacing={2} style={{ padding: "15px" }}>
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Order #{orderId}
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image={previewImage}
            alt="Placeholder image"
            sx={{ height: 300 }}
          />
          <Stack spacing={1} style={{ textAlign: "left", margin: "10px" }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Order Details
              </Typography>
              <Typography variant="body1" color="error">
                <strong>Time to Expiry:</strong> {timeToExpiry} mins
              </Typography>
              <Typography variant="body1">
                <strong>Donor location:</strong> {donorLocation}
              </Typography>
              <Typography variant="body1">
                <strong>Delivery point:</strong> {destinationId}
              </Typography>
              <Typography variant="body1">
                <strong>Number of Meals:</strong> {numberOfMeals}
              </Typography>

              <Typography variant="body1">
                <strong>Estimated delivery duration:</strong> {tripDuration}{" "}
                mins
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Box display="flex" alignItems="center">
              <InfoIcon color="info" sx={{ marginRight: 1 }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Pick up instructions
                </Typography>
                <Typography variant="body1">{pickupInstructions}</Typography>
              </Box>
            </Box>
          </Stack>
          {orderAssigned ? (
            <Button
              variant="contained"
              size="large"
              onClick={onFinish}
              color="success"
            >
              Finish Order
            </Button>
          ) : null}
          {orderAssigned ? (
            <Button
              variant="contained"
              size="large"
              onClick={onCancel}
              color="error"
            >
              Cancel Order
            </Button>
          ) : (
            <Button variant="contained" size="large" onClick={onAccept}>
              Accept Order
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default JobPostingModal;
