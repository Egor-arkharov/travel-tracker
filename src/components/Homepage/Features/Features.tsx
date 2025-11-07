"use client";

import styles from "./Features.module.scss";
import Map from "./Map";
import Stats from "./Stats";
import Form from "./Form";

import Header from "@/components/UI/Header/Header";

const Features = () => {
  return (
    <section className={styles.features}>
      <Header title="Powerful Features" icon="helicopter" />
      <div className={styles.featuresList}>
        <Map />
        <Stats />
        <Form />
      </div>
    </section>
  );
};

export default Features;
