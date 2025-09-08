import {
  CountryIcon,
  CalendarIcon,
  BudgetIcon,
  RatingIcon,
} from "@/components/icons";

export const sortOptions = [
  { key: "date", label: "Date", Icon: CalendarIcon, colorClass: "purple" },
  { key: "budget", label: "Budget", Icon: BudgetIcon, colorClass: "green" },
  { key: "rating", label: "Rating", Icon: RatingIcon, colorClass: "orange" },
  { key: "country", label: "Country", Icon: CountryIcon, colorClass: "blue" },
];
