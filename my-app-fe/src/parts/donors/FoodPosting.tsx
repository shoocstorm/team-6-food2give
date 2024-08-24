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
          <CardContent className="flex flex-col">
            
            <Typography gutterBottom variant="body2" component="div" align="left">
              {name}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="left">
              Consume by: {consumeBy?.toString()}
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
