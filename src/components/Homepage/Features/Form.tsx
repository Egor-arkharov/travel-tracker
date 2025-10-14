"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Features.module.scss";
import { decor, slide, viewport } from "./anim";

const Form = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.bgDecor}
        data-type="form"
        {...decor("tl")}
        viewport={viewport}
      >
      </motion.div>

      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          {...slide("left")}
          viewport={viewport}
        >
          <h3>Craft your perfect trip</h3>
          <p>Choose a&nbsp;city, set dates, budget and rating, add a&nbsp;description and photo&nbsp;&mdash; all in&nbsp;one clean, thoughtful form.</p>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          {...slide("right")}
          viewport={viewport}
        >
          <Image
            src="/images/homepage/form.jpg"
            alt="Form"
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

export default Form;
