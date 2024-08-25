import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography } from "@mui/material";
import AcceptDeliveryModal from "../AcceptDeliveryModal";
import { useState } from "react";


export interface BeneficiaryDeliveryCardProps {
  driverName: string;
  donorLocation: string;
  numOfMealsRequested: number;
  status: string;
}

const DeliveryCard: React.FC<BeneficiaryDeliveryCardProps> = ({
  driverName, donorLocation, numOfMealsRequested, status
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <>
      <Card className="p-4 mb-2">
        <div className="flex flex-row items-center gap-2 my-2">
          <SentimentSatisfiedAltOutlined />
          <Typography variant="subtitle1"> {driverName} has reached</Typography>
        </div>
        <Typography fontWeight="bold">{`${numOfMealsRequested} meals to be delivered`}</Typography>
        
        <Button
          variant="outlined"
          className="!mt-2 w-full"
          onClick={() => setIsModalOpen(true)}
          disabled={isAccepted}
          sx={{color: 'white', backgroundColor: 'green.300'}}

        >
          {isAccepted ? "Accepted" : "Accept"}
        </Button>
      </Card>
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

export default DeliveryCard;
