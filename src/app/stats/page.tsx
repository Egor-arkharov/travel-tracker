"use client";

import Hero from "@/components/Hero/Hero";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import { useAppSelector } from "@/store/hooks";
import { getTripStats } from "@/lib/trips/stats/getTripStats";
import { buildStatsData } from "./statsData";
import styles from "./style.module.scss";

const StatsPage = () => {
  const trips = useAppSelector((state) => state.trips.user);
  const mockTrips = useAppSelector((state) => state.trips.mock);

  const isEmpty = trips.length < 2;

  const renderStats = (title: string, dataSource: typeof trips) => {
    const stats = getTripStats(dataSource);
    const statsData = buildStatsData(stats);

    return (
      <section className={styles.stats}>
        <Header title={title} icon="helicopter" showDemoNotice />
        <ul className={styles.statsList}>
          {statsData.map(({ icon: Icon, color, label, value }, index) => (
            <li key={index}>
              <Icon
                className={`${styles.icon} ${color}`}
                width={32}
                height={32}
              />
              <span>
                {label}: <strong>{value}</strong>
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <>
      <Hero
        title="Welcome Traveler"
        subtitle="View your stats, trips, and continue exploring the world."
        image="/images/hero/hero-4.jpg"
        backgroundPosition="center 30%"
      />

      <section className={styles.stats}>
        {isEmpty ? (
          <>
            <EmptyNotice
              title="Not enough trips to&nbsp;show statistics."
              message="Here&rsquo;s how your stats might look based on&nbsp;example trips."
            />
            {mockTrips.length >= 2 &&
              renderStats("Example Stats", mockTrips)}
          </>
        ) : (
          renderStats("Your Travel Stats", trips)
        )}
      </section>
    </>
  );
};

export default StatsPage;
