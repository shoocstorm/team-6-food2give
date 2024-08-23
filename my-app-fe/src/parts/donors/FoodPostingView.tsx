import React from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { FoodPostingForm } from "./AddFoodPostingModal";

export enum FoodPostingViewMode {
  FORM,
  MATCHING,
}

export interface FoodPostingViewProps {
  formState: FoodPostingForm;
  handleNext: () => void; // submission
  onClose: () => void;
  resetFormState: () => void;
}

const FoodPostingView: React.FC<FoodPostingViewProps> = ({
  formState,
  handleNext,
  onClose,
  resetFormState,
}: FoodPostingViewProps) => {
  // Form state

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        border: "1px solid #77dd77",
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6">Check terms and conditions</Typography>
        <IconButton
          onClick={() => {
            onClose();
            resetFormState();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>
      <Divider className="!mt-2 !mb-2" />
      <Typography variant="h5" gutterBottom>
        {formState.name || "No Name Provided"}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        {formState.tags.map((tag, index) => (
          <Chip key={index} label={tag} variant="outlined" />
        ))}
      </Stack>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {`Requested At: `}
        {formState.preparedAt
          ? formState.preparedAt.toString()
          : "Not specified"}
        <br />
        {`Consume By: `}
        {formState.consumeBy ? formState.consumeBy.toString() : "Not specified"}
        <br />
        Recurring: {formState.recurring ? "Yes" : "No"}
      </Typography>
      {formState.selectedDays.map((day, index) => (
        <Chip key={index} label={day} variant="outlined" />
      ))}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleNext}
        sx={{ marginTop: "10px" }}
      >
        Submit Post
      </Button>
    </Box>
  );
};

export default FoodPostingView;
