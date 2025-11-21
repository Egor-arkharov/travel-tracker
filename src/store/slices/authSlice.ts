// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppThunk } from "../index";

import { User } from "@/types/user";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const clearLocalData = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("trips");
    localStorage.removeItem("localForm");
  } catch (err) {
    console.warn("Failed to clear localStorage on auth change", err);
  }
};

// ---------- THUNKS ----------

export const loginThunk =
  (user: User): AppThunk =>
  (dispatch) => {
    dispatch(login(user));
    clearLocalData();
  };

export const logoutThunk = (): AppThunk => (dispatch) => {
  dispatch(logout());
  clearLocalData();
};

export default authSlice.reducer;
