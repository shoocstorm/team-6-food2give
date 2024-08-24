import axios from "axios";
import { FoodPostingForm } from "../parts/donors/AddFoodPostingModal";
import dayjs from "dayjs";
import { FoodPostingProps } from "../parts/donors/FoodPosting";
import { FoodPostingViewModel } from "../parts/donors/FoodPostingView";


export const addFoodPosting = async (donorId: string, foodPosting: FoodPostingForm) => {
  const data = new FormData();
  data.append('donorId', donorId);
  data.append('name', foodPosting.name);
  data.append('numOfMeals', foodPosting.numOfMeals.toString());
  data.append('preparedAt', (foodPosting.preparedAt ?? dayjs()).toISOString());
  data.append('consumeBy', (foodPosting.consumeBy ?? dayjs()).toISOString());
  data.append('recurring', foodPosting.recurring.toString());
  data.append('selectedDays', JSON.stringify(foodPosting.selectedDays));
  data.append('tags', JSON.stringify(foodPosting.tags));

  if (foodPosting.image) {
    data.append('image', foodPosting.image);
  }

  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/add-food`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  console.log(response);
}

export type FoodPostingGetData = FoodPostingViewModel & {
  donorId: string;
}

export const getFoodPosting = async (donorId: string): Promise<FoodPostingProps[]> => {
  const params = { donorId };
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-food-donations`, {params});

  const data =  response.data['food_donations'].map((e: FoodPostingGetData) => {
    const { donorId, ...rest } = e;
    

    return { foodPosting: {
      ...rest,
      consumeBy: dayjs(rest.consumeBy),
      preparedAt: dayjs(rest.preparedAt),
      selectedDays: JSON.parse(JSON.parse(JSON.stringify(rest.selectedDays))),
      tags: JSON.parse(JSON.parse(JSON.stringify(rest.tags))),
      imagePreview: rest.image,
    }};
  });
  console.log(data);
  return data;
}