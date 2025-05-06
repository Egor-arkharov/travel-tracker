import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/app/firebase";
import { login, logout } from "@/store/slices/authSlice";
import { mapFirebaseUserToUser } from "./mapFirebaseUser";
import type { AppDispatch } from "@/store";

export const loginWithPopup = async (dispatch: AppDispatch) => {
  const result = await signInWithPopup(auth, provider);
  const mappedUser = mapFirebaseUserToUser(result.user);
  dispatch(login(mappedUser));
  return mappedUser;
};

export const logoutFromFirebase = async (dispatch: AppDispatch) => {
  await signOut(auth);
  dispatch(logout());
};
