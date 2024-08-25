import { CloseOutlined, Error } from "@mui/icons-material";
import {
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
  submitButtonText: string;
}

const AddFoodTNCForm: React.FC<AddFoodTNCFormProps> = ({
  prompts,
  handleNext,
  onClose,
  resetFormState,
  submitButtonText,
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
    <>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6">Check terms & conditions</Typography>
        <IconButton
          onClick={() => {
            onClose();
            resetFormState();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>

      <div className="flex flex-col gap-3">
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
            key={idx}
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
        {submitButtonText}
      </Button>
    </>
  );
};

export default AddFoodTNCForm;
