import { Travel } from "@/types/travel";

function getDays(start: string, end: string) {
  return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
}

export interface TripStatsResult {
  totalTrips: number;
  totalBudget: number;
  totalDays: number;
  avgRating: number;
  newestTrip: Travel;
  oldestTrip: Travel;
  cheapestTrip: Travel;
  mostExpensiveTrip: Travel;
  shortestTrip: Travel & { length: number };
  longestTrip: Travel & { length: number };
  highestRatedTrip: Travel;
  lowestRatedTrip: Travel;
}

export function getTripStats(trips: Travel[]): TripStatsResult {
  const totalTrips = trips.length;
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);
  const totalDays = trips.reduce((sum, t) => sum + getDays(t.dates.start, t.dates.end), 0);
  const avgRating = trips.reduce((sum, t) => sum + t.rating, 0) / (trips.length || 1);

  const sortedByStart = [...trips].sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime());
  const sortedByEnd = [...trips].sort((a, b) => new Date(b.dates.end).getTime() - new Date(a.dates.end).getTime());
  const sortedByBudget = [...trips].sort((a, b) => a.budget - b.budget);
  const sortedByRating = [...trips].sort((a, b) => a.rating - b.rating);

  const tripsWithLength = trips.map((t) => ({
    ...t,
    length: getDays(t.dates.start, t.dates.end),
  }));

  const shortestTrip = tripsWithLength.reduce((min, t) => (t.length < min.length ? t : min), tripsWithLength[0]);
  const longestTrip = tripsWithLength.reduce((max, t) => (t.length > max.length ? t : max), tripsWithLength[0]);

  return {
    totalTrips,
    totalBudget,
    totalDays,
    avgRating,
    newestTrip: sortedByEnd[0],
    oldestTrip: sortedByStart[0],
    cheapestTrip: sortedByBudget[0],
    mostExpensiveTrip: sortedByBudget[sortedByBudget.length - 1],
    shortestTrip,
    longestTrip,
    highestRatedTrip: sortedByRating[sortedByRating.length - 1],
    lowestRatedTrip: sortedByRating[0],
  };
}
