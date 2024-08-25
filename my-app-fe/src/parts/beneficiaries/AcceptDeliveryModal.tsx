import { Box, Modal } from "@mui/material";
import AddFoodTNCForm from "../forms/AddFoodTNCForm";
import {Button} from "@mui/material";

export interface AcceptOrderModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  status: string;
  orderCount?: number;
}

const AcceptDeliveryModal: React.FC<AcceptOrderModalProps> = ({
  isModalOpen,
  onClose,
  onAccept,
  status,
  orderCount,
}: AcceptOrderModalProps) => {
    const handleSubmit = () => {
        onAccept();
        onClose();
    }
    const handleCancel = () => {
        onClose();
    }
    const caption = status === "Delivering" 
    ? "Are you sure you want to accept this delivery?" 
    : status === "Listed" 
    ? "Are you sure you want to accept this order?" 
    : `Are you sure you want to order ${orderCount || 0} boxes?`; // Default to 0 if orderCount is undefined

  return (
    <Modal open={isModalOpen} onClose={onClose} className="m-4 overflow-scroll">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          py: 4,
          px: 5,
          borderRadius: 10,
          border: "1px solid #616161",
          maxHeight: "80vh",
        }}
      >
       
        <h1 className="text-white">
            {caption}
        </h1>
        <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: "10px", color: 'white', backgroundColor: 'green.300'}}
      >
        Yes
      </Button>
      <Button
        variant="contained"
        onClick={handleCancel}
        fullWidth
        sx={{
            marginTop: "10px",
            backgroundColor: 'rgb(239 68 68)', // Tailwind's red-500
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgb(220 38 38)', // Tailwind's red-600 for hover
            },
          }}      >
        Cancel
      </Button>
      </Box>
    </Modal>
  );
};

export default AcceptDeliveryModal;
