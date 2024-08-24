import { Card, CardMedia, Box, Stack, Typography, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import foodPosting from "../../interfaces/FoodPosting";
import dayjs from "dayjs";
import RequestFoodModal from "./RequestFoodModal";

interface FoodPostingModalProps {
  foodPosting: foodPosting;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const FoodPostingModal: React.FC<FoodPostingModalProps> = ({
  foodPosting,
  open,
  onClose,
  onAccept,
}) => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const {
    donorName,
    donorLocation,
    name,
    numOfMeals,
    preparedAt,
    consumeBy,
    tags,
    recurring,
    timeToExpiry,
  } = foodPosting;

  const handleRequestClick = () => {
    setIsRequestModalOpen(true);
  };

  const handleRequestModalClose = () => {
    setIsRequestModalOpen(false);
  };

  const handleRequestSubmit = () => {
    setIsRequestModalOpen(false);
  };

  return (
    <>
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
              {donorName} has donated {name}
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image="https://top.changiairport.com/content/dam/cag-top/shop/image/1455.jpg"
              alt="Placeholder image"
            />
            <Stack spacing={1} style={{ textAlign: "left", margin: "10px" }}>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Donation Details
                </Typography>
                <Typography variant="body1">
                  <strong>Number of Meals:</strong> {numOfMeals}
                </Typography>
                <Typography variant="body1">
                  <strong>Donor location:</strong> {donorLocation}
                </Typography>

              
                {tags && tags.length > 0 && (
                  <Typography variant="body1">
                    <strong>Tags:</strong> {tags.join(", ")}
                  </Typography>
                )}

                <Typography variant="body1">
                  <strong>Prepared at:</strong> {dayjs(preparedAt).format("YYYY-MM-DD HH:mm:ss")}
                </Typography>
                <Typography variant="body1">
                  <strong>Consume by:</strong> {dayjs(consumeBy).format("YYYY-MM-DD HH:mm:ss")}
                </Typography>
                <Typography variant="body1">
                  <strong>Recurring:</strong> {recurring ? "Yes" : "No"}
                </Typography>
                <Typography variant="h6" fontWeight="bold" style={{ marginTop: "10px" }}>
                  Real time tracking
                </Typography>
                <Typography variant="body1">
                  <strong>This order will be safe for consumption until:</strong> {timeToExpiry} minutes remaining
                </Typography>
              </Box>
            </Stack>
            <Button variant="contained" size="large" onClick={handleRequestClick} color="success">
              Request
            </Button>
          </Stack>
        </Box>
      </Modal>

      <RequestFoodModal
        open={isRequestModalOpen}
        onClose={handleRequestModalClose}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
};

export default FoodPostingModal;
