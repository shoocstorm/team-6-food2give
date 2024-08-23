import { CloseOutlined, Error } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

export interface AddFoodTNCFormProps {
  prompts: string[];
  handleNext: () => void;
  onClose: () => void;
  resetFormState: () => void;
}

const AddFoodTNCForm: React.FC<AddFoodTNCFormProps> = ({
  prompts,
  handleNext,
  onClose,
  resetFormState,
}: AddFoodTNCFormProps) => {
  const [ticks, setTicks] = useState<boolean[]>(
    Array(prompts.length).fill(false)
  );

  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!ticks.every((t: boolean) => t)) {
      setIsError(true);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (isError && ticks.every((t: boolean) => t)) {
      setIsError(false);
    }
  }, [isError, ticks]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        border: "1px solid #77dd77",
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6">Check terms and conditions</Typography>
        <IconButton
          onClick={() => {
            onClose();
            resetFormState();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>

      <div className="flex flex-col">
        {prompts.map((prompt: string, idx: number) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={ticks[idx]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTicks((ticks) => {
                    const newTicks = [...ticks];
                    newTicks[idx] = !ticks[idx];
                    return newTicks;
                  })
                }
              />
            }
            label={prompt}
          />
        ))}
      </div>
      {isError && (
        <div className="flex flex-row items-center gap-2">
          <Error sx={{ color: "red" }} />
          <span className="text-red-500">
            You must ensure that all terms are met!
          </span>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ marginTop: "10px" }}
      >
        Review Post
      </Button>
    </Box>
  );
};

export default AddFoodTNCForm;
