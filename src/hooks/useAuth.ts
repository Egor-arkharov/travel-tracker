import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginWithPopup, logoutFromFirebase } from "@/lib/firebase/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  // console.log(user)

  const login = () => loginWithPopup(dispatch);
  const logout = () => logoutFromFirebase(dispatch);

  return { user, login, logout, isLoggedIn: !!user };
};
