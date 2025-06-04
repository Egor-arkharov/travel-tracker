// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import tripsReducer from "./slices/tripsSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
    trips: tripsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["form.media.imageFile"],
        ignoredActionPaths: ["payload.value"],
      },
    }),
});

store.subscribe(() => {
  const state = store.getState().form;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { imageFile: __, ...mediaWithoutFile } = state.media;
  
  const serializableData = {
    ...state,
    media: mediaWithoutFile,
  };

  localStorage.setItem("localForm", JSON.stringify(serializableData));
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void;

