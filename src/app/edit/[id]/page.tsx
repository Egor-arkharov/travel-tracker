"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { resetForm, setAllFields } from "@/store/slices/formSlice";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Form = dynamic(() => import("@/components/Form/Form"), { ssr: false });

const EditPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const router = useRouter();

  const loaded = useAppSelector((state) => state.trips.loaded);
  const userTrips = useAppSelector((state) => state.trips.user);
  const trip = userTrips.find((t) => String(t.id) === String(id));

  useEffect(() => {
    if (trip) {
      dispatch(resetForm());
      dispatch(setAllFields(trip));
    }
  }, [trip, dispatch]);

  if (!loaded) {
    return <p>Loading trip...</p>;
  }

  if (!trip) {
    router.push("/");
    return null;
  }

  return <Form isEditMode initialTrip={trip} />;
};

export default EditPage;
