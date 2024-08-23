import { Button, Card, Typography } from "@mui/material";
import Header from "../parts/Header";
import "../assets/css/donorPage.css";
import { AddCircleOutline } from "@mui/icons-material";
import FoodPosting, { FoodPostingProps } from "../parts/donors/FoodPosting";
import { useState } from "react";
import AddFoodPostingModal from "../parts/donors/AddFoodPostingModal";
import { generateBreadcrumbs } from "../util/generateBreadcrumbs";

interface DonorPageProps {
  donorId: string;
}

const DUMMY_CARDS: FoodPostingProps[] = [
  {
    name: "pasta",
    preparedAt: "23 August 2024 14:20",
    consumeBy: "23 August 2024 19:20",
    tags: ["halal", "spicy", "soy", "soy", "soy", "soy", "soy"],
    recurring: false,
  },
  {
    name: "pasta",
    preparedAt: "23 August 2024 14:20",
    consumeBy: "23 August 2024 19:20",
    tags: ["halal", "spicy", "soy", "soy", "soy", "soy", "soy"],
    recurring: false,
  },
  {
    name: "pasta",
    preparedAt: "23 August 2024 14:20",
    consumeBy: "23 August 2024 19:20",
    tags: ["halal", "spicy", "soy", "soy", "soy", "soy", "soy"],
    recurring: false,
  },
  {
    name: "pasta",
    preparedAt: "23 August 2024 14:20",
    consumeBy: "23 August 2024 19:20",
    tags: ["halal", "spicy", "soy", "soy", "soy", "soy", "soy"],
    recurring: false,
  },
  {
    name: "pasta",
    preparedAt: "23 August 2024 14:20",
    consumeBy: "23 August 2024 19:20",
    tags: ["halal", "spicy", "soy", "soy", "soy", "soy", "soy"],
    recurring: false,
  },
];

const DonorPage: React.FC<DonorPageProps> = ({ donorId }: DonorPageProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
            {DUMMY_CARDS.map((post: FoodPostingProps, idx: number) => (
              <FoodPosting key={idx} {...post} />
            ))}
          </div>
        </Card>
      </Card>
    </>
  );
};

export default DonorPage;
