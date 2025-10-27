"use client";

import Hero from "@/components/Hero/Hero";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import { useAppSelector } from "@/store/hooks";
import { getTripStats } from "@/lib/trips/stats/getTripStats";
import { buildStatsData } from "./statsData";
import styles from "./style.module.scss";
import { motion } from "framer-motion";

const StatsPage = () => {
  const trips = useAppSelector((state) => state.trips.user);
  const mockTrips = useAppSelector((state) => state.trips.mock);

  const isEmpty = trips.length < 2;

  const renderStats = (title: string, dataSource: typeof trips) => {
    const stats = getTripStats(dataSource);
    const statsData = buildStatsData(stats);

    return (
      <section className={styles.stats}>
        <Header title={title} icon="helicopter" modeTooltip="auth" />
        <motion.ul
          className={styles.statsList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {statsData.map(({ icon: Icon, color, label, value }, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <Icon
                className={`${styles.icon} ${color}`}
                width={32}
                height={32}
              />
              <span>
                {label}: <strong>{value}</strong>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </section>
    );
  };

  return (
    <>
      <Hero
        title="Welcome Traveler"
        subtitle="View your stats, trips, and continue exploring the world."
        image={4}
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
