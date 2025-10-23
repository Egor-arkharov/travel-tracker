import { render } from "@testing-library/react";
import TravelCard from "@/components/Travels/TravelCard/TravelCard";
import type { Travel } from "@/types/travel";

// 🧩 Firebase/Auth mocks
jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ isLoggedIn: true, login: jest.fn(), logout: jest.fn() }),
}));
jest.mock("firebase/auth", () => ({}));
jest.mock("@/app/firebase", () => ({}));

// 🧩 Mock nested subcomponents
jest.mock("@/components/Travels/TravelCard/TravelCardInfo", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-info" />,
}));
jest.mock("@/components/Travels/TravelCard/TravelCardImage", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image" />,
}));


const mockTrip: Travel = {
  id: "test-id",
  location: { city: "Athens", country: "Greece" },
  dates: { start: "2024-07-05", end: "2024-07-10" },
  budget: 1200,
  rating: 4,
  media: { imagePath: "", imageUrl: "/images/mock.jpg" },
  meta: { isMock: false },
  description: "A summer trip to Greece",
};

describe("TravelCard", () => {
  test("matches snapshot", () => {
    const { asFragment } = render(
      <TravelCard
        travel={mockTrip}
        view="grid"
        onClick={() => {}}
        cardLayoutId="card-test-id"
        imageLayoutId="image-test-id"
        isSelected={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
