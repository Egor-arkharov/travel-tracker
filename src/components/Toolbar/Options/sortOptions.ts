import CalendarIcon from "@/components/icons/calendar.svg";
import CountryIcon from "@/components/icons/country.svg";
import RatingIcon from "@/components/icons/rating.svg";
import BudgetIcon from "@/components/icons/budget.svg";

export const sortOptions = [
  { key: "date", label: "Date", Icon: CalendarIcon, colorClass: "purple" },
  { key: "budget", label: "Budget", Icon: BudgetIcon, colorClass: "green" },
  { key: "rating", label: "Rating", Icon: RatingIcon, colorClass: "orange" },
  { key: "country", label: "Country", Icon: CountryIcon, colorClass: "blue" },
];
