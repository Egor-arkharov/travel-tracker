import { Travel } from "@/types/travel";

export const filterTravels = (travels: Travel[], query: string): Travel[] => {
  if (query.length < 2) return travels;
  const q = query.toLowerCase();
  return travels.filter(
    (t) => t.city.toLowerCase().includes(q) || t.country.toLowerCase().includes(q)
  );
};
