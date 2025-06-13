"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero/Hero";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import { useAppSelector } from "@/store/hooks";
import { getTripStats } from "@/lib/trips/stats/getTripStats";
import { buildStatsData } from "./statsData";
import styles from "./style.module.scss";

const StatsPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user = useAppSelector((state) => state.auth.user);
  const trips = useAppSelector((state) => state.trips.user);
  const mockTrips = useAppSelector((state) => state.trips.mock);

  const isDemo = !user;
  const isEmpty = trips.length < 2;

  if (!isClient) return null;

  const renderStats = (title: string, dataSource: typeof trips) => {
    const stats = getTripStats(dataSource);
    const statsData = buildStatsData(stats);

    return (
      <section className={styles.stats}>
        <Header title={title} icon={"helicopter"} />
        <ul className={styles.statsList}>
          {statsData.map(({ icon: Icon, color, label, value }, index) => (
            <li key={index}>
              <Icon className={`${styles.icon} ${color}`} width={32} height={32} />
              <span>{label}: <strong>{value}</strong></span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <>
      <Hero
        title={`Welcome ${user?.displayName || "Traveler"}`}
        subtitle="View your stats, trips, and continue exploring the world."
        image="/images/hero/hero-4.jpg"
        backgroundPosition="center 30%"
      />

      <section className={styles.stats}>
        {isDemo && <DemoNotice />}

        {isEmpty ? (
          <>
            <EmptyNotice
              title="Not enough trips to show statistics"
              message="Here's how your stats might look based on example trips."
              buttonHref="/create"
            />
            {mockTrips.length >= 2 && renderStats("Example Stats", mockTrips)}
          </>
        ) : (
          renderStats("Your Travel Stats", trips)
        )}
      </section>
    </>
  );
};

export default StatsPage;
