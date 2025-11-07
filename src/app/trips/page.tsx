"use client";

import { Suspense } from "react";

import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import { useAppSelector } from "@/store/hooks";

const Trips = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Hero
        title="Your Adventures"
        subtitle="Browse through all your past trips, memories, and stories"
        image={5}
        backgroundPosition="70% 100%"
      />

      <Suspense fallback={<div>Loading travels...</div>}>
        <TravelsPage mode="full" source={user ? "firebase" : "local"} />
      </Suspense>
    </>
  );
};

export default Trips;
