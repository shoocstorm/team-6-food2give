import React from "react";
import {
  Button,
  Chip,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { FoodPostingForm } from "./AddFoodPostingModal";
import { BeneficiaryOrderRequestCardProps } from "./BeneficiaryOrderRequestCard";

export enum FoodPostingViewMode {
  FORM,
  MATCHING,
}

export type FoodPostingViewModel = FoodPostingForm & {
  numMealsTaken?: number;
  requests?: BeneficiaryOrderRequestCardProps[];
};
export interface FoodPostingViewProps {
  formState: FoodPostingForm | FoodPostingViewModel;
  handleNext?: () => void; // submission
  onClose: () => void;
  resetFormState?: () => void;
  viewMode: FoodPostingViewMode;
}

const FoodPostingView: React.FC<FoodPostingViewProps> = ({
  formState,
  handleNext,
  onClose,
  resetFormState,
  viewMode,
}: FoodPostingViewProps) => {
  // Form state

  return (
    <>
      {viewMode === FoodPostingViewMode.FORM ? (
        <div className="flex flex-row justify-between items-center">
          <Typography variant="h6">Check terms and conditions</Typography>
          <IconButton
            onClick={() => {
              onClose();
              resetFormState!();
            }}
          >
            <CloseOutlined />
          </IconButton>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <Typography variant="h6">{`Thanks for donating ${formState}!`}</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </div>
      )}

      <Divider className="!mt-2 !mb-2" />
      {formState.imagePreview && (
        <img
          src={formState.imagePreview}
          alt="Preview"
          style={{ width: "100%", height: "200px", borderRadius: 8 }}
        />
      )}
      <Typography variant="h5" gutterBottom>
        {formState.name || "No Name Provided"}
      </Typography>
      <Chip
        sx={{ borderRadius: 0 }}
        label={`x ${formState.numOfMeals ?? 0} meal(s)`}
        className="mb-4"
      />
      <Stack direction="row" sx={{ mb: 1 }} flexWrap="wrap">
        {formState.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            className="mr-1 mb-1"
          />
        ))}
      </Stack>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {`Prepared At: `}
        {formState.preparedAt
          ? formState.preparedAt
              .tz("Asia/Singapore")
              .format("DD/MM/YYYY HH:mm:ss [SGT]")
          : "Not specified"}
        <br />
        {`Consume By: `}
        {formState.consumeBy
          ? formState.consumeBy
              .tz("Asia/Singapore")
              .format("DD/MM/YYYY HH:mm:ss [SGT]")
          : "Not specified"}
        <br />
        Recurring: {formState.recurring ? "Yes" : "No"}
      </Typography>
      {formState.selectedDays.map((day, index) => (
        <Chip key={index} label={day} variant="outlined" />
      ))}
      {viewMode === FoodPostingViewMode.FORM && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleNext}
          sx={{ marginTop: "10px" }}
        >
          Submit Post
        </Button>
      )}
    </>
  );
};

export default FoodPostingView;