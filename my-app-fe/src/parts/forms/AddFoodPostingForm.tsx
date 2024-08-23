import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  Chip,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FoodPostingForm } from "../donors/AddFoodPostingModal";

export interface AddFoodPostingFormProps {
  formState: FoodPostingForm;
  setFormState: React.Dispatch<React.SetStateAction<FoodPostingForm>>;
  onClose: () => void;
  resetFormState: () => void;
  handleNext: () => void;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddFoodPostingForm: React.FC<AddFoodPostingFormProps> = ({
  formState,
  setFormState,
  onClose,
  resetFormState,
  handleNext,
}: AddFoodPostingFormProps) => {
  const handleDaysChange = (event: SelectChangeEvent<string[]>) => {
    setFormState((form) => ({
      ...form,
      selectedDays: event.target.value as string[],
    }));
  };

  const handleTagsChange = (_: any, newValue: string[]) => {
    setFormState((form) => ({
      ...form,
      tags: newValue,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormState((form) => {
        const previewUrl = URL.createObjectURL(event.target.files![0]);
        return {
          ...form,
          image: event.target.files![0],
          imagePreview: previewUrl,
        };
      });
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Typography variant="h6">Add Food Posting</Typography>
        <IconButton
          onClick={() => {
            onClose();
            resetFormState();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>
      {formState.imagePreview && (
        <img
          src={formState.imagePreview}
          alt="Preview"
          style={{ width: "100%", height: "200px", borderRadius: 8 }}
        />
      )}
      <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        {formState.image ? formState.image.name : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      <TextField
        fullWidth
        margin="normal"
        label="Food Name"
        value={formState.name}
        onChange={(e) =>
          setFormState((form) => ({ ...form, name: e.target.value }))
        }
      />
      <TextField
        type="number"
        label="Number of Meals"
        value={formState.numOfMeals}
        fullWidth
        margin="normal"
      />
      <DateTimePicker
        label="Prepared At"
        value={formState.preparedAt}
        sx={{ margin: "10px 0px", width: "100%" }}
        onChange={(newValue: Dayjs | null) =>
          setFormState((form) => ({ ...form, preparedAt: newValue }))
        }
      />
      <DateTimePicker
        label="Consume By"
        value={formState.consumeBy}
        sx={{ margin: "10px 0px", width: "100%" }}
        onChange={(newValue: Dayjs | null) =>
          setFormState((form) => ({ ...form, consumeBy: newValue }))
        }
      />
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={formState.tags}
        onChange={handleTagsChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Tags"
            placeholder="Add a tag"
          />
        )}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formState.recurring}
            onChange={(e) =>
              setFormState((form) => ({
                ...form,
                recurring: e.target.checked,
              }))
            }
          />
        }
        label="Recurring"
      />
      {formState.recurring && (
        <FormControl fullWidth>
          <InputLabel>Days of the Week</InputLabel>
          <Select
            multiple
            value={formState.selectedDays}
            onChange={handleDaysChange}
            input={<OutlinedInput label="Days of the Week" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleNext}
        sx={{ marginTop: "10px" }}
      >
        Next
      </Button>
    </>
  );
};

export default AddFoodPostingForm;
