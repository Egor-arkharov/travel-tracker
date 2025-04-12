import { Travel } from "@/types/travel";

function parseDMY(dateStr: string): number {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export function sortTravels(travels: Travel[], sort: string): Travel[] {
  const [key, direction] = sort.split(":") as [string, "asc" | "desc"];

  return [...travels].sort((a, b) => {
    if (key === "date") {
      // Сортируем по startDate
      const aDate = parseDMY(a.startDate);
      const bDate = parseDMY(b.startDate);
      return direction === "asc" ? aDate - bDate : bDate - aDate;
    }

    const aVal = a[key as keyof Travel];
    const bVal = b[key as keyof Travel];

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
