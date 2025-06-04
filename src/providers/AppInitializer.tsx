"use client";

import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/store/hooks";
import { mapFirebaseUserToUser } from "@/lib/firebase/mapFirebaseUser";
import { login } from "@/store/slices/authSlice";
import { setLoading, setMockTrips, setUserTrips, setLoaded } from "@/store/slices/tripsSlice";
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

      const mockTrips = await getMock();
      dispatch(setMockTrips(mockTrips));

      if (firebaseUser) {
        const user = mapFirebaseUserToUser(firebaseUser);
        dispatch(login(user));

        const firebaseTrips = await getFirebase(user);
        dispatch(setUserTrips(firebaseTrips));
      } else {
        const localTrips = getLocal();
        dispatch(setUserTrips(localTrips));
      }

      dispatch(setLoading(false));
      dispatch(setLoaded(true));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};


export default AppInitializer;
