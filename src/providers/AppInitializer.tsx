"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/store/hooks";
import { mapFirebaseUserToUser } from "@/lib/firebase/mapFirebaseUser";
import { login } from "@/store/slices/authSlice";
import {
  setLoading,
  setMockTrips,
  setUserTrips,
  setLoaded,
} from "@/store/slices/tripsSlice";
import { getFirebase } from "@/lib/trips/get/getFirebase";
import { getLocal } from "@/lib/trips/get/getLocal";
import { getMock } from "@/lib/trips/get/getMock";
import { auth } from "@/app/firebase";

interface Props {
  children: ReactNode;
}

const AppInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      dispatch(setLoading(true));

      try {
        const user = firebaseUser
          ? mapFirebaseUserToUser(firebaseUser)
          : null;

        if (user) {
          dispatch(login(user));
        }

        const [mockTrips, userTrips] = await Promise.all([
          getMock(),
          user ? getFirebase(user) : Promise.resolve(getLocal()),
        ]);

        dispatch(setMockTrips(mockTrips));
        dispatch(setUserTrips(userTrips));
      } catch (err) {
        console.error("Ошибка при инициализации приложения: ", err);
      } finally {
        dispatch(setLoading(false));
        dispatch(setLoaded(true));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
