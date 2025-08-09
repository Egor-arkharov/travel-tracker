// components/About.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/UI/Header/Header";
import styles from "./About.module.scss";
import { useState } from "react";

const About = () => {
  const prefersReduced = useReducedMotion();
  const [bgActive, setBgActive] = useState(false);

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.15, staggerChildren: 0.18 },
    },
  };

  const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const fromLeft = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -64 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.3, ease: easeOutSoft } },
  };

  const fromRight = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : 64 },
    visible: { opacity: 1, x: 0, transition: { duration: 2, ease: easeOutSoft } },
  };

  const MImage = motion(Image);

  return (
    <section className={styles.about}>
      <Header title="Your beautiful journeys" icon="plane" />
      <div className={`${styles.inner} ${bgActive ? styles["scale-bg"] : ""}`}>
        <motion.div
          className={styles.text}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          onViewportEnter={() => setBgActive(true)}
        >
          <motion.p variants={fromLeft}>
            Whether you&rsquo;re planning your next big adventure or&nbsp;reflecting on&nbsp;journeys past, Travel Tracker helps you organize, visualize and relive your experiences like never before. Add trips, mark destinations, rate your travels, set budgets and attach memories&nbsp;&mdash; all in&nbsp;one place.
          </motion.p>
          <motion.p variants={fromLeft}>
            You can create a&nbsp;private journal just for yourself or&nbsp;share your favorite places with the world. Every trip is&nbsp;more than just a&nbsp;location on&nbsp;a&nbsp;map&nbsp;&mdash; it&rsquo;s a&nbsp;story, a&nbsp;memory, a&nbsp;feeling.
          </motion.p>
          <motion.p variants={fromLeft}>
            With a&nbsp;simple and elegant interface, Travel Tracker makes it&nbsp;easy to&nbsp;turn your scattered travel notes, photos, and plans into something meaningful. Whether it&rsquo;s your weekend city break or&nbsp;a&nbsp;months-long expedition, your journey deserves to&nbsp;be&nbsp;remembered&nbsp;&mdash; beautifully.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.visual}
          variants={fromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <MImage
            src="/images/img.jpg"
            alt="Map illustration"
            width={400}
            height={500}
            className={styles.image}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
