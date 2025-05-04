"use client";

import { useEffect, useState } from "react";
import { getTrips } from "@/lib/trips/get/getTrips";
import { Travel } from "@/types/travel";
import { User } from "@/types/user";

export const useTripsData = (
  source: "local" | "firebase" | "mock",
  user: User | null
) => {
  const [trips, setTrips] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await getTrips(source, user);
      setTrips(result);
      setLoading(false);
    };
    load();
  }, [source, user]);

  return { trips, loading };
};
