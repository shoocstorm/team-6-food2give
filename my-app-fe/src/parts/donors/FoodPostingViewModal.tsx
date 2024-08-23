import React from "react";
import { Box, Modal, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import FoodPostingView, {
  FoodPostingViewMode,
  FoodPostingViewModel,
} from "./FoodPostingView";
import ProgressBar from "../components/ProgressBar";
import { AccessTimeOutlined, CheckOutlined } from "@mui/icons-material";
import BeneficiaryOrderRequestCard, {
  BeneficiaryOrderRequestCardProps,
} from "./BeneficiaryOrderRequestCard";

export interface FoodPostingViewModalProps {
  foodPosting: FoodPostingViewModel;
  isModalOpen: boolean;
  onClose: () => void;
}

const FoodPostingViewModal: React.FC<FoodPostingViewModalProps> = ({
  foodPosting,
  isModalOpen,
  onClose,
}: FoodPostingViewModalProps) => {
  let frac =
    1 -
    (foodPosting.consumeBy!.unix() - dayjs().unix()) /
      (foodPosting.consumeBy!.unix() - foodPosting.preparedAt!.unix());
  frac = frac > 1 ? 1 : frac;

  return (
    <Modal open={isModalOpen} onClose={onClose} className="m-4 overflow-scroll">
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
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <FoodPostingView
          formState={foodPosting}
          onClose={onClose}
          viewMode={FoodPostingViewMode.MATCHING}
        />
        <Tooltip title="Meals given out" arrow>
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="grow">
              <ProgressBar
                fraction={
                  (foodPosting as FoodPostingViewModel).numMealsTaken ??
                  0 / foodPosting.numOfMeals
                }
              />
            </div>
            <CheckOutlined color="primary" />
          </div>
        </Tooltip>
        <Tooltip title="Time to expiry" arrow className="mt-2 mb-2">
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="grow">
              <ProgressBar fraction={frac} />
            </div>
            <AccessTimeOutlined color="primary" />
          </div>
        </Tooltip>
        {foodPosting.requests?.map(
          (req: BeneficiaryOrderRequestCardProps, idx: number) => (
            <BeneficiaryOrderRequestCard {...req} key={idx} />
          )
        )}
      </Box>
    </Modal>
  );
};

export default FoodPostingViewModal;
