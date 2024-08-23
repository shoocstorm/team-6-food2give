import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Dayjs } from "dayjs";
import AddFoodPostingForm from "../forms/AddFoodPostingForm";
import AddFoodTNCForm from "../forms/AddFoodTNCForm";
import FoodPostingView from "./FoodPostingView";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
          prompts={["test1", "test2"]}
          handleNext={() => setStage(AddFoodPostingFormStage.VERIFY)}
          onClose={onClose}
          resetFormState={resetFormState}
        />
      ) : (
        <FoodPostingView
          formState={formState}
          handleNext={() => {}}
          onClose={onClose}
          resetFormState={resetFormState}
        />
      )}
    </Modal>
  );
};

export default AddFoodPostingModal;
