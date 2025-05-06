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
        title="Your Adventures"
        subtitle="Browse through all your past trips, memories, and stories"
        image="/images/hero/hero-5.jpg"
        backgroundPosition="center 100%"
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
