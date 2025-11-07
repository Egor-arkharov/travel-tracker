import { filterTravels } from "@/utils/filterTravels";
import type { Travel } from "@/types/travel";

const trips: Travel[] = [
  {
    id: "1",
    location: { city: "Athens", country: "Greece" },
    dates: { start: "", end: "" },
    budget: 1000,
    rating: 5,
    media: { imagePath: "" },
    meta: { isMock: false },
  },
  {
    id: "2",
    location: { city: "Tokyo", country: "Japan" },
    dates: { start: "", end: "" },
    budget: 2000,
    rating: 4,
    media: { imagePath: "" },
    meta: { isMock: false },
  },
];

describe("filterTravels", () => {
  test("returns all when query is shorter than 2 characters", () => {
    const result = filterTravels(trips, "a");
    expect(result).toHaveLength(2);
  });

  test("filters by city name", () => {
    const result = filterTravels(trips, "ath");
    expect(result).toHaveLength(1);
    expect(result[0].location.city).toBe("Athens");
  });

  test("filters by country name", () => {
    const result = filterTravels(trips, "japan");
    expect(result).toHaveLength(1);
    expect(result[0].location.country).toBe("Japan");
  });

  test("returns empty array when no match found", () => {
    const result = filterTravels(trips, "berlin");
    expect(result).toHaveLength(0);
  });
});
