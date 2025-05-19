// store/slices/tripsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Travel } from "@/types/travel";
import { AppThunk } from "../index";
import { deleteTripFromFirebase } from "@/lib/trips/delete/deleteTripFromFirebase";

interface TripsState {
  trips: Travel[];
  loading: boolean;
  source: "local" | "firebase" | "mock";
}

const initialState: TripsState = {
  trips: [],
  loading: true,
  source: "local", // по умолчанию
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips(state, action: PayloadAction<Travel[]>) {
      state.trips = action.payload;
      state.loading = false;
    },
    deleteTripLocal(state, action: PayloadAction<string>) {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setTrips, deleteTripLocal, setLoading } = tripsSlice.actions;
export default tripsSlice.reducer;

// ✅ Thunk
export const deleteTrip = (id: string): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const trip = state.trips.trips.find((t) => t.id === id);
  const uid = state.auth.user?.uid;

  if (!trip) return;

  if (trip.meta.isMock) return; // нельзя удалять мок


  if (uid) {
    console.log("Удаляем поездку из Firebase");

    // пользователь залогинен → удаляем из Firebase
    await deleteTripFromFirebase(uid, id);
    dispatch(deleteTripLocal(id));
  } else {
    // иначе → удаляем локально
    const updated = state.trips.trips.filter((t) => t.id !== id);
    localStorage.setItem("trips", JSON.stringify(updated));
    dispatch(deleteTripLocal(id));
  }
};