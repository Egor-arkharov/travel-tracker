// components/About.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import styles from "./About.module.scss";

import Header from "@/components/UI/Header/Header";
import aboutImg from "@/assets/homepage/about.jpg";

const MImage = motion(Image);

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
            Travel Tracker isn&rsquo;t just a&nbsp;place to&nbsp;store your trips&nbsp;&mdash; it&rsquo;s your personal travel hub. Add destinations with a&nbsp;live map, set dates, ratings and budgets, upload photos, and keep every journey organized in&nbsp;one clean, interactive timeline.
          </motion.p>

          <motion.p variants={fromLeft}>
            Whether you travel often or&nbsp;once a&nbsp;year, you can browse your past adventures, compare memories, and even see your journeys come alive through visuals and data. The more you add, the richer your story becomes.
          </motion.p>

          <motion.p variants={fromLeft}>
            It&rsquo;s a&nbsp;calm, focused space built for people who love to&nbsp;remember where they&rsquo;ve been &mdash;&nbsp;and to&nbsp;dream about where they&rsquo;ll go&nbsp;next. Every click feels intentional, every trip looks like it&nbsp;belongs to&nbsp;you.
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
            src={aboutImg}
            alt="Map illustration"
            fill
            className={styles.image}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
