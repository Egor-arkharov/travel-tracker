import tripsReducer, {
  addOrUpdateUserTrip,
  removeUserTrip,
  setUserTrips,
  setMockTrips,
  resetTrips,
} from "@/store/slices/tripsSlice";
import type { Travel } from "@/types/travel";

const baseTrip: Travel = {
  id: "1",
  location: { city: "Athens", country: "Greece" },
  dates: { start: "", end: "" },
  budget: 1000,
  rating: 5,
  media: { imagePath: "" },
  meta: { isMock: false },
};

describe("tripsSlice reducer", () => {
  test("addOrUpdateUserTrip — кладёт поездку в user", () => {
    const s1 = tripsReducer(undefined, addOrUpdateUserTrip(baseTrip));
    expect(s1.user).toHaveLength(1);
    expect(s1.user[0].id).toBe("1");

    const updated: Travel = { ...baseTrip, budget: 1500 };
    const s2 = tripsReducer(s1, addOrUpdateUserTrip(updated));
    expect(s2.user).toHaveLength(1);
    expect(s2.user[0].budget).toBe(1500);
  });

  test("removeUserTrip — удаляет из user", () => {
    const s1 = tripsReducer(undefined, addOrUpdateUserTrip(baseTrip));
    const s2 = tripsReducer(s1, removeUserTrip("1"));
    expect(s2.user).toHaveLength(0);
  });

  test("setUserTrips / setMockTrips — выставляют массивы", () => {
    const payload: Travel[] = [baseTrip];
    const s1 = tripsReducer(undefined, setUserTrips(payload));
    expect(s1.user).toEqual(payload);

    const mockTrip: Travel = { ...baseTrip, id: "m1", meta: { isMock: true } };
    const s2 = tripsReducer(undefined, setMockTrips([mockTrip]));
    expect(s2.mock).toHaveLength(1);
    expect(s2.mock[0].id).toBe("m1");
  });

  test("resetTrips — возвращает к initialState", () => {
    const s1 = tripsReducer(undefined, addOrUpdateUserTrip(baseTrip));
    const s2 = tripsReducer(s1, resetTrips());
    expect(s2.user).toHaveLength(0);
    expect(s2.mock).toHaveLength(0);
    expect(s2.loading).toBe(true);
    expect(s2.loaded).toBe(false);
  });
});
