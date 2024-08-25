import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import FoodPostingViewModal from "./FoodPostingViewModal";
import { useState } from "react";
import { FoodPostingViewModel } from "./FoodPostingView";

export interface FoodPostingProps {
  foodPosting: FoodPostingViewModel;
}

const FoodPosting: React.FC<FoodPostingProps> = ({ foodPosting }) => {
  const { name, consumeBy, tags } = foodPosting;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="m-2"  sx={{ borderRadius: '5%', margin: 2 }}>
        <CardActionArea onClick={() => setIsModalOpen(true)}>
          <CardMedia
            component="img"
            height="100"
            image={
              foodPosting.imagePreview ?? "https://via.placeholder.com/300x140"
            }
            alt="Placeholder image"
            sx={{ height: 100 }}
          />
          <CardContent>
            <div className="flex flex-row gap-2 justify-center">
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Chip
                sx={{ borderRadius: 0 }}
                label={`${foodPosting.numMealsTaken}/${
                  foodPosting.numOfMeals ?? 0
                } meal(s) taken`}
                className="mb-4"
              />
            </div>
            <Typography variant="body2" color="text.secondary">
              Consume by:{" "}
              {consumeBy
                ?.tz("Asia/Singapore")
                .format("DD/MM/YYYY HH:mm:ss [SGT]")}
            </Typography>
            <div className="text-left relative right-1 mt-2">
            {tags.map((tag: string, idx: number) => (
              <Chip key={idx} label={tag} sx={{ marginRight: "3px " }} />
            ))}
            </div>
            
          </CardContent>
        </CardActionArea>
      </Card>
      <FoodPostingViewModal
        foodPosting={foodPosting}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FoodPosting;
