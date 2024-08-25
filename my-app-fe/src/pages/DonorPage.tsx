import { Button, Card, Typography } from "@mui/material";
import Header from "../parts/Header";
import "../assets/css/donorPage.css";
import { AddCircleOutline } from "@mui/icons-material";
import FoodPosting, { FoodPostingProps } from "../parts/donors/FoodPosting";
import { useEffect, useState } from "react";
import AddFoodPostingModal from "../parts/donors/AddFoodPostingModal";
// import { generateBreadcrumbs } from "../util/generateBreadcrumbs";
import { getFoodPosting } from "../api/donor";
// import dayjs from "dayjs";
import Profile from "../parts/components/Profile";

interface DonorPageProps {
  donorId: string;
}

// Keep for reference

// const DUMMY_CARDS: FoodPostingProps[] = [
//   {
//     foodPosting: {
//       orderId: "ord1",
//       name: "Nasi Lemak",
//       numOfMeals: 20,
//       preparedAt: dayjs("22 August 2024 14:20"),
//       consumeBy: dayjs("22 August 2024 18:20"),
//       tags: ["halal", "soy"],
//       recurring: false,
//       image: null,
//       imagePreview: "",
//       selectedDays: [],
//       numMealsTaken: 0,
//       requests: [
//         {
//           orderId: "ord1",
//           beneficiaryName: "Woodlands FSC",
//           numOfMealsRequested: 2,
//           subtitles: ["Finding driver..."],
//         },
//       ],
//     },
//   },
// ];

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
      <Header />
      <div className="flex flex-row items-center">
        <Profile name="John" imageUrl="/profile/john.jpg"/>
        <Button
            sx={{color: "white", backgroundColor: "green.400", px:2}}
            startIcon={<AddCircleOutline />}
            style={{ height: "fit-content" }}
            onClick={() => setIsAddModalOpen(true)}

          >
            Add
          </Button>
      </div>
      
      <AddFoodPostingModal
          donorId={donorId}
          isModalOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        
        
        <Card className="p-5">
          <div className="grid grid-cols-2 w-full">
            {foodDonations.map((post: FoodPostingProps, idx: number) => (
              <FoodPosting key={idx} {...post} />
            ))}
          </div>
        </Card>
    </>
  );
};

export default DonorPage;
