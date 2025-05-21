// travelfromslice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Travel, TravelFormState } from "@/types/travel";

const defaultState: TravelFormState = {
  id: "",
  location: {
    city: "",
    country: "",
    lat: 0,
    lng: 0,
  },
  dates: {
    start: "",
    end: "",
  },
  budget: 0,
  rating: 0,
  media: {
    imagePath: "",
    imageUrl: "",
    previewUrl: "",
    imageFile: null as File | null,
  },
  description: "",
  meta: {
    isMock: false,
  },
};

const getInitialState = (): TravelFormState => {
  if (typeof window === "undefined") return defaultState;

  try {
    const saved = localStorage.getItem("localForm");
    if (saved) {
      return {
        ...defaultState,
        ...JSON.parse(saved),
        media: {
          ...defaultState.media,
          ...JSON.parse(saved).media,
          imageFile: null,
        },
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
    updateField: (state, action: PayloadAction<{ path: string; value: any }>) => {
      const { path, value } = action.payload;
      const keys = path.split(".");
      let current: any = state;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    },
    resetForm: () => ({ ...defaultState }),
    setAllFields: (state, action: PayloadAction<Travel>) => {
      const trip = action.payload;

      state.id = trip.id ?? "";

      state.location = {
        city: trip.location.city,
        country: trip.location.country,
        lat: trip.location.lat,
        lng: trip.location.lng,
      };

      state.dates = {
        start: trip.dates.start,
        end: trip.dates.end,
      };
      
      state.rating = trip.rating;
      state.budget = trip.budget;
      state.description = trip.description ?? "";
      state.media.imageUrl = trip.media.imageUrl || "";
      state.media.imagePath = trip.media.imagePath || "";
      state.media.imageFile = null;
      state.meta.isMock = trip.meta?.isMock ?? false;
    }
  },
});

export const { updateField, resetForm, setAllFields } = travelFormSlice.actions;
export default travelFormSlice.reducer;
