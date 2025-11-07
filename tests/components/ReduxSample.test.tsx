import React from "react";
import { screen, fireEvent } from "@testing-library/react";

import { render } from "../utils/render"; // наш хелпер

import type { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOrUpdateUserTrip, removeUserTrip } from "@/store/slices/tripsSlice";

const TestProbe = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((s) => s.trips.user.length);
  return (
    <div>
      <div data-testid="count">{count}</div>
      <button
        onClick={() =>
          dispatch(
            addOrUpdateUserTrip({
              id: "t1",
              location: { city: "Rome", country: "Italy" },
              dates: { start: "", end: "" },
              budget: 100,
              rating: 4,
              media: { imagePath: "" },
              meta: { isMock: false },
            })
          )
        }
      >
        Add
      </button>
      <button onClick={() => dispatch(removeUserTrip("t1"))}>Remove</button>
    </div>
  );
};

describe("Redux integration via Provider", () => {
  test("adds and removes a user trip through Redux store", () => {
    const preloaded: Partial<RootState> = {
      trips: { mock: [], user: [], loading: false, loaded: true },
    };

    const { store } = render(<TestProbe />, { preloadedState: preloaded });

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    fireEvent.click(screen.getByText(/remove/i));
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    expect(store.getState().trips.user).toHaveLength(0);
  });
});
