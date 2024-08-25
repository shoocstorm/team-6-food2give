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
} from "@mui/material";
import React,{ useState } from "react";

interface InventoryPostingProps {
    name: string;
    consumeBy: string;
    tags: string[];
    quantity: number;
    onGiveaway: (itemName: string, giveawayAmount: number) => void;
}

const InventoryPosting: React.FC<InventoryPostingProps> = ({ name, consumeBy, tags, quantity, onGiveaway }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [giveawayAmount, setGiveawayAmount] = useState<number | string>('');

    const handleCardClick = () => {
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setGiveawayAmount(1);
    };

    const handleConfirm = () => {
        const numericAmount = typeof giveawayAmount === 'number' ? giveawayAmount : parseInt(giveawayAmount, 10);
      
        if (!isNaN(numericAmount) && numericAmount > 0 && numericAmount <= quantity) {
          onGiveaway(name, numericAmount);
        }
      
        setIsDialogOpen(false);
        setGiveawayAmount(1); 
      };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '') {
          setGiveawayAmount('');
        } else {
          const numericValue = parseInt(value, 10); 
          if (!isNaN(numericValue) && numericValue >= 1) {
            setGiveawayAmount(numericValue);
          }
        }
      };

    return (
        <>
            <Card
                className="border border-white/20"
                sx={{ borderRadius: '5%', margin: 1 }}
                onClick={handleCardClick}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={"https://via.placeholder.com/300x140"}
                        alt="Placeholder image"
                        sx={{ height: 140 }}
                    />
                    <CardContent className="flex flex-col justify-start">
                        <Typography gutterBottom variant="body1" component="div" align="left">
                            {name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" align="left">
                            By {consumeBy}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" align="left">
                            {quantity} boxes
                        </Typography>
                        <div
                            className="text-left relative right-1 mt-2 flex gap-2"
                            style={{ gap: '8px', flexWrap: 'wrap' }}
                        >
                            {tags.map((tag: string, idx: number) => (
                                <Chip
                                    key={idx}
                                    label={tag}
                                    sx={{
                                        marginRight: "2px",
                                        fontSize: "0.6rem",
                                        height: "24px",
                                        '& .MuiChip-label': {
                                            padding: '0 8px',
                                        },
                                        color: "white", backgroundColor: "green.500"
                                    }}
                                />
                            ))}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog open={isDialogOpen} onClose={handleCancel}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'background.default', 
                        color: '#ffffff', 
                        borderRadius: "10px"
                    }
                }}>
                <DialogTitle>Giveaway Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Amount to Give Away"
                        type="number"
                        placeholder="1"
                        fullWidth
                        value={giveawayAmount}
                        onChange={handleAmountChange}
                        inputProps={{max: quantity }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InventoryPosting;