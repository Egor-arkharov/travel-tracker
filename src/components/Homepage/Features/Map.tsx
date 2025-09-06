"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
          <h3>See your trips on the map</h3>
          <p>Visualize every journey, country, and memory at a glance.</p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          {...slide("right")}
          viewport={viewport}
        >
          <Image
            src="/images/homepage/map.jpg"
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
