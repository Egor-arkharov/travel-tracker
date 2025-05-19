// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import travelFormReducer from "./slices/travelFormSlice";
import tripsReducer from "./slices/tripsSlice";

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
    auth: authReducer,
    trips: tripsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["travelForm.media.imageFile"],
        ignoredActionPaths: ["payload.value"],
      },
    }),
});

store.subscribe(() => {
  const state = store.getState().travelForm;

  const { imageFile: _, ...mediaWithoutFile } = state.media;
  const serializableData = {
    ...state,
    media: mediaWithoutFile,
  };

  localStorage.setItem("localForm", JSON.stringify(serializableData));
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void;

