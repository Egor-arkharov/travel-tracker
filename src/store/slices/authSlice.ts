import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

      if (typeof window !== "undefined") {
        localStorage.removeItem("trips");
        localStorage.removeItem("localForm");
      }
    },
    logout(state) {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("trips");
        localStorage.removeItem("localForm");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
