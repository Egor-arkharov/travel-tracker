"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Features.module.scss";
import { decor, slide, viewport } from "./anim";

const Form = () => {
  return (
    <section className={styles.section}>
      {/* decor: слева (вылет сверху-слева) */}
      <motion.div
        className={styles.bgDecor}
				data-type="form"
        {...decor("tl")}
        viewport={viewport}
      >
      </motion.div>

      <div className={styles.inner}>
        {/* текст: слева */}
        <motion.div
          className={styles.text}
          {...slide("left")}
          viewport={viewport}
        >
          <h2>Craft your perfect trip</h2>
          <p>
            Select a city with autocomplete, pick your travel dates, set a budget,
            give it a rating, write a description and attach a photo — all in one
            elegant form. You’re in control of every detail.
          </p>
        </motion.div>

        {/* картинка: справа */}
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
