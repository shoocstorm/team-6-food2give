import { Button, Card, Typography } from "@mui/material";
import Header from "../parts/Header";
import "../assets/css/donorPage.css";
import { AddCircleOutline } from "@mui/icons-material";
import FoodPosting, { FoodPostingProps } from "../parts/donors/FoodPosting";
import { useEffect, useState } from "react";
import AddFoodPostingModal from "../parts/donors/AddFoodPostingModal";
import { generateBreadcrumbs } from "../util/generateBreadcrumbs";
import { getFoodPosting } from "../api/donor";

interface DonorPageProps {
  donorId: string;
}

// Note: Pls use deployed server for the backend
const DonorPage: React.FC<DonorPageProps> = ({ donorId }: DonorPageProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [foodDonations, setFoodDonations] = useState<FoodPostingProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: FoodPostingProps[] = await getFoodPosting(donorId);

      setFoodDonations(
        data.map((don: FoodPostingProps) => ({
          foodPosting: {
            ...don.foodPosting,
            numMealsTaken: 10,
            requests: [
              {
                orderId: "ord1",
                beneficiaryName: "Woodlands Community Care Centre",
                numOfMealsRequested: 2,
                subtitles: ["Driver 5 mins away..."],
                accepted: false,
              },
              {
                orderId: "ord2",
                beneficiaryName: "Woodlands FSC",
                numOfMealsRequested: 2,
                subtitles: ["Finding driver..."],
                accepted: false,
              },
            ],
          },
        }))
      );
    };

    if (!isAddModalOpen) {
      fetchData();
    }
  }, [donorId, isAddModalOpen]);

  return (
    <>
      <Header title={`Welcome, ${donorId}!`} />
      <div className="breadcrumbs">
        {generateBreadcrumbs(["Donor", "Homepage"], ["/"])}
      </div>
      <Card raised className="container-box">
        <div className="flex justify-between items-center">
          <Typography variant="h4" fontWeight="semibold">
            My donations
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            style={{ height: "fit-content" }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add
          </Button>
        </div>
        <br />
        <AddFoodPostingModal
          donorId={donorId}
          isModalOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        <Card className="p-5">
          <div className="card-grid">
            {foodDonations.map((post: FoodPostingProps, idx: number) => (
              <FoodPosting key={idx} {...post} />
            ))}
          </div>
        </Card>
      </Card>
    </>
  );
};

export default DonorPage;
