"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/store/hooks";
import { mapFirebaseUserToUser } from "@/lib/firebase/mapFirebaseUser";
import { login, logout } from "@/store/slices/authSlice";
import { auth } from "@/app/firebase";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(login(mapFirebaseUserToUser(firebaseUser)));
      } else {
        // dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
