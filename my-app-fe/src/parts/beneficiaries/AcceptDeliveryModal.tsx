import { Box, Modal } from "@mui/material";
import AddFoodTNCForm from "../forms/AddFoodTNCForm";
import {Button} from "@mui/material";

export interface AcceptOrderModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const AcceptDeliveryModal: React.FC<AcceptOrderModalProps> = ({
  isModalOpen,
  onClose,
  onAccept,
}: AcceptOrderModalProps) => {
    const handleSubmit = () => {
        onAccept();
        onClose();
    }
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
        <h1 className="text-white">
            Are you sure you want to accept this delivery?
        </h1>
        <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: "10px" }}
      >
        Accept
      </Button>
      </Box>
    </Modal>
  );
};

export default AcceptDeliveryModal;
