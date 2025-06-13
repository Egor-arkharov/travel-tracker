import styles from "./style.module.scss";
import {
  CountryIcon,
  BudgetIcon,
  TimeIcon,
  RatingIcon,
  ArrowBackIcon,
  ArrowNextIcon,
  CheapIcon,
  ExpensiveIcon,
  LongIcon,
  ShortIcon,
  HeartHalfIcon,
  HeartIcon,
} from "@/components/icons";
import { pluralizeDays } from "@/lib/utils/pluralize";
import { TripStatsResult } from "@/lib/trips/stats/getTripStats";

export function buildStatsData(stats: TripStatsResult) {
  const {
    totalTrips,
    totalBudget,
    totalDays,
    avgRating,
    newestTrip,
    oldestTrip,
    cheapestTrip,
    mostExpensiveTrip,
    shortestTrip,
    longestTrip,
    highestRatedTrip,
    lowestRatedTrip,
  } = stats;

  return [
    {
      icon: CountryIcon,
      color: styles.iconGreen,
      label: "Total trips",
      value: totalTrips,
    },
    {
      icon: BudgetIcon,
      color: styles.iconGreen,
      label: "Total budget",
      value: `$${totalBudget}`,
    },
    {
      icon: TimeIcon,
      color: styles.iconGreen,
      label: "Total travel time",
      value: `${totalDays} days`,
    },
    {
      icon: RatingIcon,
      color: styles.iconGreen,
      label: "Average rating",
      value: avgRating.toFixed(1),
    },
    {
      icon: ArrowBackIcon,
      color: styles.iconPurple,
      label: "Oldest trip",
      value: `${oldestTrip.location.city}, ${oldestTrip.location.country}`,
    },
    {
      icon: ArrowNextIcon,
      color: styles.iconPurple,
      label: "Newest trip",
      value: `${newestTrip.location.city}, ${newestTrip.location.country}`,
    },
    {
      icon: CheapIcon,
      color: styles.iconRed,
      label: "Cheapest",
      value: `${cheapestTrip.location.city} — $${cheapestTrip.budget}`,
    },
    {
      icon: ExpensiveIcon,
      color: styles.iconRed,
      label: "Most expensive",
      value: `${mostExpensiveTrip.location.city} — $${mostExpensiveTrip.budget}`,
    },
    {
      icon: LongIcon,
      color: styles.iconYellow,
      label: "Longest",
      value: `${longestTrip.location.city} — ${pluralizeDays(longestTrip.length)}`,
    },
    {
      icon: ShortIcon,
      color: styles.iconYellow,
      label: "Shortest",
      value: `${shortestTrip.location.city} — ${pluralizeDays(shortestTrip.length)}`,
    },
    {
      icon: HeartHalfIcon,
      color: styles.iconBlue,
      label: "Lowest rated",
      value: `${lowestRatedTrip.location.city} — ${lowestRatedTrip.rating}`,
    },
    {
      icon: HeartIcon,
      color: styles.iconBlue,
      label: "Highest rated",
      value: `${highestRatedTrip.location.city} — ${highestRatedTrip.rating}`,
    },
  ];
}
