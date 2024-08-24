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
      <Card sx={{ border: "1px solid #77dd77" }}>
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
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Consume by: {consumeBy?.toString()}
            </Typography>
            <br />
            {tags.map((tag: string, idx: number) => (
              <Chip key={idx} label={tag} sx={{ marginRight: "2px " }} />
            ))}
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
