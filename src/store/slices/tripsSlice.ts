// store/slices/tripsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Travel } from "@/types/travel";
import { AppThunk } from "../index";
import { deleteTripFromFirebase } from "@/lib/trips/delete/deleteTripFromFirebase";

interface TripsState {
  mock: Travel[];
  user: Travel[];
  loading: boolean;
  loaded: boolean;
}

const initialState: TripsState = {
  mock: [],
  user: [],
  loading: true,
  loaded: false,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setMockTrips: (state, action: PayloadAction<Travel[]>) => {
      state.mock = action.payload;
    },
    setUserTrips: (state, action: PayloadAction<Travel[]>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    removeUserTrip: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((t) => t.id !== action.payload);
    },
    resetTrips: () => initialState,
  },
});

export const { setMockTrips, setUserTrips, setLoading, setLoaded, resetTrips, removeUserTrip } = tripsSlice.actions;
export default tripsSlice.reducer;

export const deleteTrip = (id: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const allTrips = [...state.trips.user, ...state.trips.mock];
  const trip = allTrips.find((t) => t.id === id);
  const uid = state.auth.user?.uid;

  if (!trip || trip.meta.isMock) return;

  if (uid) {
    await deleteTripFromFirebase(uid, id);
    dispatch(removeUserTrip(id));
  } else {
    const updated = state.trips.user.filter((t) => t.id !== id);
    localStorage.setItem("trips", JSON.stringify(updated));
    dispatch(removeUserTrip(id));
  }
};
