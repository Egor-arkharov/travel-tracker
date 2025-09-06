"use client";

import styles from "./Explore.module.scss";
import Header from "@/components/UI/Header/Header";
import { LoupeIcon, DataIcon, CloudIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useEffect, useState } from "react";

const modes = [
  {
    title: "Browse without signup",
    text: "Explore demo trips and see how it works. No account needed.",
    badge: "No signup",
    icon: LoupeIcon,
  },
  {
    title: "Add trips locally",
    text: "Create trips and keep data on your device. Fast and private.",
    badge: "Local only",
    icon: DataIcon,
  },
  {
    title: "Log in for sync",
    text: "Save to the cloud, access from any device, unlock all features.",
    badge: "Cloud sync",
    icon: CloudIcon,
  },
];

const UsageModes = () => {
  const width = useWindowWidth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && width <= 900;

  const variants = {
    hidden: isMobile
      ? { opacity: 0, x: 10 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.section}>
      <Header title="Your way" icon="rocket" />

      <div className={styles.modes}>
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <motion.article
              key={m.title}
              className={styles.modeCard}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={styles.icon} aria-hidden>
                <Icon className={styles.iconSvg} />
              </div>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.text}>{m.text}</p>
              <p className={styles.badge}>{m.badge}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default UsageModes;
