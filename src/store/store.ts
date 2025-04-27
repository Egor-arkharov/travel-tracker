// store/store.ts
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import travelFormReducer from "./slices/travelFormSlice";

export const store = configureStore({
  reducer: {
    travelForm: travelFormReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["travelForm.imageFile"],
        ignoredActionPaths: ["payload.value"],
      },
    }),
});

store.subscribe(() => {
  const state = store.getState().travelForm;
  const { imageFile, ...serializableData } = state;

  localStorage.setItem("travelForm", JSON.stringify(serializableData));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
