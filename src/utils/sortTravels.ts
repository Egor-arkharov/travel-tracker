import { Travel } from "@/types/travel";

function parseISO(dateStr: string): number {
  return new Date(dateStr).getTime();
}

export function sortTravels(travels: Travel[], sort: string): Travel[] {
  const [key, direction] = sort.split(":") as [string, "asc" | "desc"];

  return [...travels].sort((a, b) => {
    if (key === "date") {
      const aDate = parseISO(a.dates.start);
      const bDate = parseISO(b.dates.start);
      return direction === "asc" ? aDate - bDate : bDate - aDate;
    }

    const getValue = (t: Travel): string | number => {
      switch (key) {
        case "city":
          return t.location.city;
        case "country":
          return t.location.country;
        case "budget":
          return t.budget;
        case "rating":
          return t.rating;
        default:
          return "";
      }
    };

    const aVal = getValue(a);
    const bVal = getValue(b);

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
}
