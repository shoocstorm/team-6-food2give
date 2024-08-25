import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography } from "@mui/material";
import AcceptDeliveryModal from "../AcceptDeliveryModal";
import { useState } from "react";

export interface BeneficiaryDeliveryCardProps {
  storageVolunteerName: string;
  donorLocation: string;
  numOfMealsRequested: number;
  status: string;
}

const ListedStorageCard: React.FC<BeneficiaryDeliveryCardProps> = ({
  storageVolunteerName, donorLocation, numOfMealsRequested, status
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <>
      <Card className="p-4 mb-2">
        <div className="flex flex-row items-center gap-2 my-2">
          <SentimentSatisfiedAltOutlined />
          <Typography variant="subtitle1"> {storageVolunteerName} has ordered 
            <Typography fontWeight="bold">{`${numOfMealsRequested} meals`}</Typography>
          </Typography>
        </div>
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

export default ListedStorageCard;
