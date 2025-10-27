"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import statsImg from "@/assets/homepage/stats.jpg";
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
          <p>Trips, budgets, days and countries&nbsp;&mdash; everything is&nbsp;calculated for you and displayed with clarity.</p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          {...slide("left")}
          viewport={viewport}
        >
          <Image
            src={statsImg}
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
