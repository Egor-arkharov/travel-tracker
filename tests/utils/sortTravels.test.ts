import { sortTravels } from "@/utils/sortTravels";
import type { Travel } from "@/types/travel";

const base: Omit<Travel, "id"> = {
  location: { city: "", country: "" },
  dates: { start: "", end: "" },
  budget: 0,
  rating: 0,
  media: { imagePath: "" },
  meta: { isMock: false },
};

const trips: Travel[] = [
  {
    ...base,
    id: "1",
    location: { city: "Athens", country: "Greece" },
    dates: { start: "2024-06-01", end: "2024-06-10" },
    budget: 1000,
    rating: 5,
  },
  {
    ...base,
    id: "2",
    location: { city: "Tokyo", country: "Japan" },
    dates: { start: "2023-12-01", end: "2023-12-10" },
    budget: 3000,
    rating: 3,
  },
  {
    ...base,
    id: "3",
    location: { city: "Berlin", country: "Germany" },
    dates: { start: "2025-01-01", end: "2025-01-10" },
    budget: 2000,
    rating: 4,
  },
];

describe("sortTravels", () => {
  test("sorts by date descending (default UI behaviour)", () => {
    const result = sortTravels(trips, "date:desc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["3", "1", "2"]); // 2025 > 2024 > 2023
  });

  test("sorts by date ascending", () => {
    const result = sortTravels(trips, "date:asc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["2", "1", "3"]);
  });

  test("sorts by rating descending", () => {
    const result = sortTravels(trips, "rating:desc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["1", "3", "2"]);
  });

  test("sorts by budget ascending", () => {
    const result = sortTravels(trips, "budget:asc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["1", "3", "2"]);
  });

  test("sorts by city alphabetically (asc)", () => {
    const result = sortTravels(trips, "city:asc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["1", "3", "2"]); // Athens, Berlin, Tokyo
  });

  test("sorts by country alphabetically (desc)", () => {
    const result = sortTravels(trips, "country:desc");
    const ids = result.map(t => t.id);
    expect(ids).toEqual(["2", "1", "3"]); // Japan > Greece > Germany
  });
});
