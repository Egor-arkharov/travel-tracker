"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Features.module.scss";
import { decor, slide, viewport } from "./anim";

const Stats = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.bgDecor}
        data-type="stats"
        {...decor("tr")}
        viewport={viewport}
      >
      </motion.div>

      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          {...slide("right")}
          viewport={viewport}
        >
          <h3>Track your travel stats</h3>
          <p>
            Total trips, budgets, days on the road, countries visited and more — your data is automatically calculated and beautifully presented.
          </p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          {...slide("left")}
          viewport={viewport}
        >
          <Image
            src="/images/homepage/stats.jpg"
            alt="stats"
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

export default Stats;
