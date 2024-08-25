import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

interface BaPostingProps {
  name: string;
  location: string;
  distance: number;
  consumeBy: string;
  tags: string[];
  quantity: number;
  onOrder: (item: BaPostingProps, orderQuantity: number) => void;
  image?: string;
}

const BaPosting: React.FC<BaPostingProps> = (props) => {
  const {
    name,
    consumeBy,
    tags,
    quantity,
    distance,
    location,
    onOrder,
    image = "https://via.placeholder.com/300x140",
  } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<number | string>("");
  const [isPending, setIsPending] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setOrderQuantity(1);
    setIsPending(false);
  };

  const handleOrder = () => {
    const numericAmount =
      typeof orderQuantity === "number"
        ? orderQuantity
        : parseInt(orderQuantity, 10);

    if (
      !isNaN(numericAmount) &&
      numericAmount > 0 &&
      numericAmount <= quantity
    ) {
      setIsPending(true);
      setTimeout(() => {
        onOrder(props, numericAmount);
        setIsDialogOpen(false);
        setIsPending(false);
        setOrderQuantity("");
      }, 5000);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setOrderQuantity("");
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 1) {
        setOrderQuantity(numericValue);
      }
    }
  };

  return (
    <>
      <Card
        className="border border-white/20"
        sx={{ borderRadius: "5%", margin: 1 }}
        onClick={handleCardClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="Placeholder image"
            sx={{ height: 140 }}
          />
          <CardContent className="flex flex-col">
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              align="left"
            >
              {name}
            </Typography>
            <Typography variant="caption" className="!font-bold" align="left">
              {location}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="left">
              By {consumeBy}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="left">
              {quantity} boxes
            </Typography>
            <div
              className="text-left relative right-1 mt-2 flex gap-2"
              style={{ gap: "8px", flexWrap: "wrap" }}
            >
              {tags.map((tag: string, idx: number) => (
                <Chip
                  key={idx}
                  label={tag}
                  sx={{
                    marginRight: "2px",
                    fontSize: "0.6rem",
                    height: "24px",
                    "& .MuiChip-label": {
                      padding: "0 8px",
                    },
                    color: "white",
                    backgroundColor: "green.500",
                  }}
                />
              ))}
            </div>
          </CardContent>
          <div className="absolute top-2 left-2 bg-highlight p-2 rounded-md">
            <Typography className="!italic">{distance}m</Typography>
          </div>
        </CardActionArea>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "background.default",
            color: "#ffffff",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>{isPending ? "Order Pending" : "Order Item"}</DialogTitle>
        <DialogContent>
          {isPending ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <CircularProgress />
              <Typography variant="body2" style={{ marginLeft: "10px" }}>
                Please wait for the beneficiary to verify your order...
              </Typography>
            </div>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Order Quantity"
                type="number"
                fullWidth
                value={orderQuantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: quantity }}
              />
            </>
          )}
        </DialogContent>
        {!isPending && (
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleOrder} color="primary" variant="contained">
              Collect to Store
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default BaPosting;
