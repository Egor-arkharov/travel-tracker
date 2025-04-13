// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import travelFormReducer from "./slices/travelFormSlice";

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
