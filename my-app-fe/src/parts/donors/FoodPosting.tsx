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
      <Card
        className="border border-white/20"
        sx={{ borderRadius: '5%', margin: 1 }}
      >
        <CardActionArea onClick={() => setIsModalOpen(true)}>
          <CardMedia
            component="img"
            height="140"
            image={
              foodPosting.imagePreview ?? "https://via.placeholder.com/300x140"
            }
            alt="Placeholder image"
            sx={{ height: 140 }}
          />
          <CardContent className="flex flex-col justify-start">
            <div className="flex flex-row justify-start">
              <Typography gutterBottom variant="body1" component="div" align="left">
                {name}
              </Typography>
            </div>

            <Chip
              sx={{ borderRadius: 2, color: "white", backgroundColor: "green.400" }}
              label={`${foodPosting.numMealsTaken}/${foodPosting.numOfMeals ?? 0
                } meal(s) taken`}
              className="mb-4"
              
            />

            <Typography variant="body2" color="text.secondary" align="left">
              By{" "}
              {consumeBy
                ?.tz("Asia/Singapore")
                .format("DD/MM HH:mm:ss [SGT]")}
            </Typography>
            <div
              className="text-left relative right-1 mt-2 flex gap-2"
              style={{ gap: '8px', flexWrap: 'wrap' }}
            >              {tags.map((tag: string, idx: number) => (
              <Chip key={idx} label={tag} sx={{
                marginRight: "2px",
                fontSize: "0.6rem",
                height: "24px",
                '& .MuiChip-label': {
                  padding: '0 8px',
                },
                color: "white", backgroundColor: "green.500"
              }} />
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
