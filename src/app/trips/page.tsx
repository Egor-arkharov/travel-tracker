"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import Link from "next/link";
import styles from "./style.module.scss";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";

const Trips = () => {
  // Заглушки на будущее:
  const isDemoMode = true; 
  const user = null; 
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    if (isDemoMode) {
      const savedTrips = JSON.parse(localStorage.getItem("travel_demo_trips") || "[]");
      setTrips(savedTrips);
    } else {
      // потом будем грузить трипы с Firebase
      setTrips([]);
    }
  }, [isDemoMode]);

  return (
    <>
      <Hero
        title="Track & Relive Your Journeys"
        subtitle="Capture your travels, map your routes, and keep your memories in one place."
        image="/images/hero/hero-6.jpg"
        buttonHref="/create"
        backgroundPosition="center 30%"
      />

      <section className={styles.tripsSection}>
        <div className="container">

        <DemoNotice />

          {trips.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No trips yet. Start creating your adventures!</p>
              <Link href="/create" className={styles.addButton}>
                Add Trip
              </Link>
            </div>
          ) : (
            <div className={styles.tripsGrid}>
              {/* Здесь потом будет вывод трипов */}
              {trips.map((trip, index) => (
                <div key={index} className={styles.tripCard}>
                  {trip.title || "Trip title"}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Trips;
