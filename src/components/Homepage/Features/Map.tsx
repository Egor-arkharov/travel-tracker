"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import mapImg from "@/assets/homepage/map.jpg";
import styles from "./Features.module.scss";
import { decor, slide, viewport } from "./anim";

const Map = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.bgDecor}
        data-type="map"
        {...decor("tl")}
        viewport={viewport}
      />
      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          {...slide("left")}
          viewport={viewport}
        >
          <h3>See your journeys on&nbsp;the map</h3>
          <p>Instantly view every trip, country, and memory&nbsp;&mdash; your travels visualized as&nbsp;a&nbsp;story.</p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          {...slide("right")}
          viewport={viewport}
        >
          <Image
            src={mapImg}
            alt="Map"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};
export default Map;
