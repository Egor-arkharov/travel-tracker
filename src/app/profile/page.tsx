"use client";

import Hero from "@/components/Hero/Hero";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import EmptyMotice from "@/components/UI/EmptyNotice/EmptyNotice";
import { MapIcon } from "@/components/icons";
import { useAppSelector } from "@/store/hooks";
import { getTripStats } from "@/lib/trips/stats/getTripStats";
import styles from "./style.module.scss";
import Header from "@/components/UI/Header/Header";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const trips = useAppSelector((state) => state.trips.user);
  const isDemo = !user;
  const isEmpty = trips.length < 2;

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
  } = getTripStats(trips);

  const pluralizeDays = (n: number) => `${n} day${n === 1 ? "" : "s"}`;

  return (
    <>
      <Hero
        title={`Welcome ${user?.displayName || "Traveler"}`}
        subtitle="View your stats, trips, and continue exploring the world."
        image="/images/hero/hero-4.jpg"
        backgroundPosition="center 30%"
      />

      <main className={styles.profile}>
        {isDemo && <DemoNotice />}

        {isEmpty ? (
          <EmptyMotice
            title="Not enough trips to show statistics"
            buttonHref="/create"
          />
        ) : (
          <section className={styles.stats}>
            <Header title="Your Travel Stats" icon="helicopter" />
            <ul className={styles.statsList}>
              <li>
                <MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} />
                <span>Total trips: <strong>{totalTrips}</strong>
                </span>
              </li>
              <li>
                <MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} />
                <span>Total budget: <strong>${totalBudget}</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Total travel time: <strong>{totalDays} days</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Average rating: <strong>{avgRating.toFixed(1)}</strong></span></li>

              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Newest trip: <strong>{newestTrip.location.city}, {newestTrip.location.country}</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Oldest trip: <strong>{oldestTrip.location.city}, {oldestTrip.location.country}</strong></span></li>

              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Cheapest: <strong>{cheapestTrip.location.city} — ${cheapestTrip.budget}</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Most expensive: <strong>{mostExpensiveTrip.location.city} — ${mostExpensiveTrip.budget}</strong></span></li>

              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Longest: <strong>{longestTrip.location.city} — {pluralizeDays(longestTrip.length)}</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Shortest: <strong>{shortestTrip.location.city} — {pluralizeDays(shortestTrip.length)}</strong></span></li>

              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Highest rated: <strong>{highestRatedTrip.location.city} — {highestRatedTrip.rating}</strong></span></li>
              <li><MapIcon className={`${styles.icon} ${styles.iconGreen}`} width={32} height={32} /><span>Lowest rated: <strong>{lowestRatedTrip.location.city} — {lowestRatedTrip.rating}</strong></span></li>
            </ul>
          </section>
        )}
      </main>
    </>
  );
};

export default ProfilePage;
