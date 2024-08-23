import { Box, Modal } from "@mui/material";
import AddFoodTNCForm from "../forms/AddFoodTNCForm";

export interface AcceptOrderModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const AcceptOrderModal: React.FC<AcceptOrderModalProps> = ({
  isModalOpen,
  onClose,
  onAccept,
}: AcceptOrderModalProps) => {
  const ACCEPT_ORDER_PROMPTS = [
    "The food has been stored safely from the time of posting till now.",
    "The food is still safe for consumption till the date stated.",
    "In accordance to the Good Samaritan Food Donation Bill, you will be free from liability and eligible to donate when the above measures are taken.",
  ];

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
        <AddFoodTNCForm
          prompts={ACCEPT_ORDER_PROMPTS}
          handleNext={onAccept}
          onClose={onClose}
          resetFormState={() => {}}
          submitButtonText="Accept Order"
        />
      </Box>
    </Modal>
  );
};

export default AcceptOrderModal;
