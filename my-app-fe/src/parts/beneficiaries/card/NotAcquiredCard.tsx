import { SentimentSatisfiedAltOutlined } from "@mui/icons-material";
import { Button, Card, Typography, Box } from "@mui/material";
import AcceptDeliveryModal from "../AcceptDeliveryModal";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { BeneficiaryViewModel } from "../BeneficiaryPosting";
import axios from "axios";


export interface BeneficiaryDeliveryCardProps {
  donorId: string;
  donorLocation: string;
  numOfMealsRequested: number;
  status: string;
  beneficiaryPosting: BeneficiaryViewModel;
}

const NotAcquiredCard: React.FC<BeneficiaryDeliveryCardProps> = ({
    donorId, donorLocation, numOfMealsRequested, status, beneficiaryPosting
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [orderCount, setOrderCount] = useState<number>(1);
  const handleAdd = () => setOrderCount(orderCount + 1);
  const handleRemove = () => {
    if (orderCount > 0) setOrderCount(orderCount - 1);
  };
  const idToken = localStorage.getItem('idToken')
  const userId = localStorage.getItem('userId')
  const handleAccept = async () => {
    try {
      const payload = {
        originLocation: {
          address: beneficiaryPosting.donorLocation,
          postalCode: "987654", // Replace with actual data if available
        },
        destinationLocation: {
          address: beneficiaryPosting.location,
          postalCode: "123987", // Replace with actual data if available
        },
        pointsAvailable: 10,
        numberOfMeals: numOfMealsRequested,
        donorListingId: donorId,
        userId: userId,
      };
      // Make a POST request to your backend to accept the order
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/add`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Order accepted successfully:", response.data);
        setIsModalOpen(false);
        alert("SUCCESS")
        // Optionally update the UI, for example, move the order from availableJobs to currentJob
      }
    } catch (error) {
      alert("You need to log in");
    }
  };
  return (
    <>
        <div className="flex flex-row justify-center gap-8">
            {!isAccepted &&  orderCount > 1 && <RemoveIcon sx={{ fontSize: 32,
            color: "green.300", 
            border: '1px solid', 
            borderRadius: '10%',
            }}
            onClick={handleRemove}
            />}
           
            {/* There should be a indicator here to show the current number */}
            <Box
          sx={{
            minWidth: 50,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid gray',
            borderRadius: '4px',
          }}
        >
          <Typography variant="h6">{orderCount}</Typography>
        </Box>
        {!isAccepted && <AddIcon sx={{ fontSize: 32,
            color: "green.300", 
            border: '1px solid', 
            borderRadius: '10%',
            }} 
            onClick={handleAdd}
            />
        }
        </div>

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
          handleAccept();
          setIsAccepted(true);  // Update the state to reflect acceptance
          setIsModalOpen(false);
        }}
        status={status}
        orderCount={orderCount}
      />
    </>
  );
};

export default NotAcquiredCard;
