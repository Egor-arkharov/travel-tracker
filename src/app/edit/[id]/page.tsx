"use client";

import { useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import Form from "@/components/Form/Form";

const EditPage = () => {

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

  return <Form isEditMode initialTrip={trip} />;
};

export default EditPage;
