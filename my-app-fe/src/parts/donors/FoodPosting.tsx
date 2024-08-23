import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";

export interface FoodPostingProps {
  name: string;
  preparedAt: string;
  consumeBy: string;
  tags: string[];
  recurring: boolean;
  recurDetails?: string;
}

const FoodPosting: React.FC<FoodPostingProps> = ({
  name,
  preparedAt,
  consumeBy,
  tags,
  recurring,
  recurDetails,
}: FoodPostingProps) => {
  return (
    <Card sx={{ border: "1px solid #77dd77" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/300x140"
          alt="Placeholder image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Consume by: {consumeBy}
          </Typography>
          <br />
          {tags.map((tag: string, idx: number) => (
            <Chip key={idx} label={tag} sx={{ marginRight: "2px " }} />
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FoodPosting;
