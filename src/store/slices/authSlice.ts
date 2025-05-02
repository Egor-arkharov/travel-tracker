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

      console.log("ji??")

      if (typeof window !== "undefined") {
        console.log("ji 2??")
        localStorage.removeItem("trips");
        localStorage.removeItem("localForm");
      }
    },
    logout(state) {
      state.user = null;
      console.log("ji 3??")
      if (typeof window !== "undefined") {
        console.log("ji 4??")
        localStorage.removeItem("trips");
        localStorage.removeItem("localForm");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
