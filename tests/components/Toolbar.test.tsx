import { render, screen, fireEvent } from "@testing-library/react";

import Toolbar from "@/components/Toolbar/Toolbar";

jest.mock("@/components/icons", () => ({
  SortIcon: () => <svg data-testid="sort-icon" />,
  GridIcon: () => <svg data-testid="grid-icon" />,
  MapIcon: () => <svg data-testid="map-icon" />,
}));

jest.mock("@/components/Toolbar/Dropdown/Popover/Popover", () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <div data-testid={`${label}-dropdown`} />,
}));

describe("Toolbar component", () => {
  const defaultProps = {
    search: "",
    onSearchChange: jest.fn(),
    sort: "date",
    onSortChange: jest.fn(),
    view: "grid",
    onViewChange: jest.fn(),
    showMap: true,
    onToggleMap: jest.fn(),
  };

  test("renders without crashing (smoke test)", () => {
    render(<Toolbar {...defaultProps} />);
    expect(screen.getByPlaceholderText(/search by city/i)).toBeInTheDocument();
    expect(screen.getByTestId("Sort-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("View-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("map-icon")).toBeInTheDocument();
  });

  test("calls onSearchChange when typing", () => {
    render(<Toolbar {...defaultProps} />);
    const input = screen.getByPlaceholderText(/search by city/i);
    fireEvent.change(input, { target: { value: "Athens" } });
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("Athens");
  });

  test("calls onToggleMap when Map button clicked", () => {
    render(<Toolbar {...defaultProps} />);
    const mapButton = screen.getByRole("button", { name: /map/i });
    fireEvent.click(mapButton);
    expect(defaultProps.onToggleMap).toHaveBeenCalled();
  });
});
