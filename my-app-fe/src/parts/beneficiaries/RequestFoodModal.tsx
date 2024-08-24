import { Box, Stack, Typography, Modal, Button, TextField, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";
interface RequestFoodModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (quantityNeeds: number, deliveryOption: string, storagePoint: string | null, notes: string) => void;
}
const RequestFoodModal: React.FC<RequestFoodModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [quantityNeeds, setQuantityNeeds] = useState<number>(1);
  const [deliveryOption, setDeliveryOption] = useState<string>("pickup");
  const [needsStorage, setNeedsStorage] = useState<boolean>(false);
  const [storagePoint, setStoragePoint] = useState<string>("refrigeration");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const handleSubmit = () => {
    onSubmit(quantityNeeds, deliveryOption, needsStorage ? storagePoint : null, additionalNotes);
    onClose();
  };
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
            Request Form
          </Typography>
          <TextField
            label="Quantity Needed"
            type="number"
            value={quantityNeeds}
            onChange={(e) => setQuantityNeeds(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Delivery Option"
            select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            fullWidth
          >
            <MenuItem value="Self-pickup">Pickup</MenuItem>
            <MenuItem value="Delivery by volunteers">Delivery</MenuItem>
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={needsStorage}
                onChange={(e) => setNeedsStorage(e.target.checked)}
                color="primary"
              />
            }
            label="Do you need to store the food?"
          />
          {needsStorage && (
            <TextField
              label="Choose Storage Point"
              select
              value={storagePoint}
              onChange={(e) => setStoragePoint(e.target.value)}
              fullWidth
            >
              <MenuItem value="Marsiling Community Fridge">Refrigeration</MenuItem>
            </TextField>
          )}
          <TextField
            label="Additional Notes"
            multiline
            rows={4}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            fullWidth
          />
          <Button variant="contained" size="large" onClick={handleSubmit} color="success">
            Submit Request
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
export default RequestFoodModal;