import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Travel } from "@/types/travel";

// Убираем поля, которые не нужны в форме
type TravelFormState = Omit<Travel, "id" | "isMock">;

const initialState: TravelFormState = {
  country: "",
  city: "",
  startDate: "",
  endDate: "",
  budget: 0,
  rating: 0,
  lat: 0,
  lng: 0,
  imagePath: "",
  imageUrl: "",
  description: "",
  imageFile: "",
};

const travelFormSlice = createSlice({
  name: "travelForm",
  initialState,
  reducers: {
    updateField: <K extends keyof TravelFormState>(
      state: TravelFormState,
      action: PayloadAction<{ key: K; value: TravelFormState[K] }>
    ) => {
      const { key, value } = action.payload;
      console.log(action, key, value);
      state[key] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = travelFormSlice.actions;
export default travelFormSlice.reducer;
