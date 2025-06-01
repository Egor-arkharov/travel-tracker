"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import Form from "@/components/Form/Form";
import { resetForm, setAllFields } from "@/store/slices/travelFormSlice";


const EditPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const router = useRouter();

  const loaded = useAppSelector((state) => state.trips.loaded);
  const userTrips = useAppSelector((state) => state.trips.user);

  const trip = userTrips.find((t) => String(t.id) === String(id));

  if (!loaded) {
    return <p>Loading trip...</p>;
  }

  if (!trip) {
    router.push("/");
    return null;
  }

  dispatch(resetForm());
  dispatch(setAllFields(trip));

  return <Form isEditMode initialTrip={trip} />;
};

export default EditPage;
