import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { Dayjs } from "dayjs";
import AddFoodPostingForm from "../forms/AddFoodPostingForm";
import AddFoodTNCForm from "../forms/AddFoodTNCForm";
import FoodPostingView, { FoodPostingViewMode } from "./FoodPostingView";
import { addFoodPosting } from "../../api/donor";

export interface AddFoodPostingModalProps {
  donorId: string;
  isModalOpen: boolean;
  onClose: () => void;
}

export const DEFAULT_FOOD_POSTING_FORM_VALUES = {
  tags: [],
  image: null,
  imagePreview: null,
  name: "",
  preparedAt: null,
  consumeBy: null,
  recurring: false,
  selectedDays: [],
  numOfMeals: 0,
};

export interface FoodPostingForm {
  tags: string[];
  image: File | null;
  imagePreview: string | null;
  name: string;
  preparedAt: Dayjs | null;
  consumeBy: Dayjs | null;
  recurring: boolean;
  selectedDays: string[];
  numOfMeals: number;
}

export enum AddFoodPostingFormStage {
  DETAILS,
  TNC,
  VERIFY,
}

const AddFoodPostingModal: React.FC<AddFoodPostingModalProps> = ({
  donorId,
  isModalOpen,
  onClose,
}: AddFoodPostingModalProps) => {
  // Form state
  const [formState, setFormState] = useState<FoodPostingForm>(
    DEFAULT_FOOD_POSTING_FORM_VALUES
  );
  const [stage, setStage] = useState<AddFoodPostingFormStage>(
    AddFoodPostingFormStage.DETAILS
  );

  // Form handlers
  const resetFormState = () => {
    setFormState(DEFAULT_FOOD_POSTING_FORM_VALUES);
    setStage(AddFoodPostingFormStage.DETAILS);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        onClose();
        resetFormState();
      }}
      className="m-4 overflow-scroll"
    >
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
        {stage === AddFoodPostingFormStage.DETAILS ? (
          <AddFoodPostingForm
            formState={formState}
            onClose={onClose}
            setFormState={setFormState}
            resetFormState={resetFormState}
            handleNext={() => setStage(AddFoodPostingFormStage.TNC)}
          />
        ) : stage === AddFoodPostingFormStage.TNC ? (
          <AddFoodTNCForm
            prompts={[
              "I agree that the food must not be unsafe and unsuitable at the time it is donated.",
              "As per FoodHero policy, there are food safety template cards attached to the food boxes to fill.",
              "Through the food safety cards, I agree to inform the recipient of any particular handling requirements to ensure the food remains safe to consume.",
              "Through the food safety cards, I agree to inform the recipient of any time limit within which the food remains safe and suitable.",
              "I agree that I will take all reasonable measures to comply with food safety and hygiene requirements up to the point of donation.",
            ]}
            handleNext={() => setStage(AddFoodPostingFormStage.VERIFY)}
            onClose={onClose}
            resetFormState={resetFormState}
            submitButtonText="Review Post"
          />
        ) : (
          <FoodPostingView
            formState={formState}
            handleNext={async () => {
              await addFoodPosting(donorId, formState);
              onClose();
            }}
            onClose={onClose}
            resetFormState={resetFormState}
            viewMode={FoodPostingViewMode.FORM}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AddFoodPostingModal;
