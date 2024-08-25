import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography } from "@mui/material";
import AcceptDeliveryModal from "../AcceptDeliveryModal";
import { useState } from "react";

export interface BeneficiaryDeliveryCardProps {
  donorId: string;
  donorLocation: string;
  numOfMealsRequested: number;
  status: string;
}

const NotAcquiredCard: React.FC<BeneficiaryDeliveryCardProps> = ({
    donorId, donorLocation, numOfMealsRequested, status
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <>
        <Button
          variant="outlined"
          className="!mt-2 w-full"
          onClick={() => setIsModalOpen(true)}
          disabled={isAccepted}
        >
          {isAccepted ? "Looking for volunteers" : "Order"}
        </Button>
     
      <AcceptDeliveryModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setIsAccepted(true);  // Update the state to reflect acceptance
          setIsModalOpen(false);
        }}
        status={status}
      />
    </>
  );
};

export default NotAcquiredCard;
