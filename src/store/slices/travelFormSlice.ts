import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Travel } from "@/types/travel";

export type TravelFormState = Omit<Travel, "id" | "isMock"> & {
  imageFile: File | null;
};

const defaultState: TravelFormState = {
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
  imageFile: null,
};

const getInitialState = (): TravelFormState => {
  if (typeof window === "undefined") return defaultState;

  try {
    const saved = localStorage.getItem("travelForm");
    if (saved) {
      return {
        ...defaultState,
        ...JSON.parse(saved),
        imageFile: null,
      };
    }
  } catch (error) {
    console.warn("Failed to load form from localStorage", error);
  }

  return defaultState;
};

const travelFormSlice = createSlice({
  name: "travelForm",
  initialState: getInitialState(),
  reducers: {
    updateField: <K extends keyof TravelFormState>(
      state: TravelFormState,
      action: PayloadAction<{ key: K; value: TravelFormState[K] }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetForm: () => ({ ...defaultState }), // 🔥 Тут главное изменение
  },
});

export const { updateField, resetForm } = travelFormSlice.actions;
export default travelFormSlice.reducer;
