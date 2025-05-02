"use client";

import Hero from "@/components/Hero/Hero";
import styles from "./style.module.scss";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import { useAppSelector } from "@/store/hooks";

const Trips = () => {
  const user = useAppSelector((state) => state.auth.user);

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

          <TravelsPage mode="full" source={user ? "firebase" : "local"} />
        </div>
      </section>
    </>
  );
};

export default Trips;
