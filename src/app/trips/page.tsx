"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import Link from "next/link";
// import TravelsGrid from "@/components/Travels/Wrapper/TravelsGrid";
import { Travel } from "@/types/travel";
import styles from "./style.module.scss";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import Header from "@/components/UI/Header/Header";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";

const Trips = () => {
  const [trips, setTrips] = useState<Travel[]>([]);

  useEffect(() => {
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      try {
        const parsedTrips = JSON.parse(storedTrips);
        setTrips(parsedTrips);
      } catch (error) {
        console.error("Ошибка чтения trips из localStorage:", error);
      }
    }
  }, []);

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
            <TravelsPage mode="full" source="local" />
          )}
        </div>
      </section>
    </>
  );
};

export default Trips;
