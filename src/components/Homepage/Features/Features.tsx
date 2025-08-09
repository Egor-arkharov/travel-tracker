"use client";

import styles from "./Features.module.scss";
import Header from "@/components/UI/Header/Header";
import Map from "./Map";
import Stats from "./Stats";
import Form from "./Form";

const Features = () => {
  return (
    <section className={styles.features}>
      <Header title="Powerful Features" icon="plane" />
      <div className={styles.blocks}>
        <Map />
        <Stats />
        <Form />
      </div>
    </section>
  );
};

export default Features;
