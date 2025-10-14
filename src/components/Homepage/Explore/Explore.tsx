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
    text: "Explore demo trips and see how it&nbsp;works. No&nbsp;account needed.",
    badge: "No&nbsp;signup",
    icon: LoupeIcon,
  },
  {
    title: "Add trips locally",
    text: "Create trips and keep data on&nbsp;your device. Fast and private.",
    badge: "Local only",
    icon: DataIcon,
  },
  {
    title: "Log in&nbsp;for sync",
    text: "Save to&nbsp;the cloud, access from any device, unlock all features.",
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

  return (
    <section className={styles.section}>
      <Header title="Your way" icon="rocket" />

      <div className={styles.cardList}>
        {modes.map((m, index) => {
          const Icon = m.icon;
          return (
            <motion.article
              key={m.title}
              className={styles.card}
              initial={isMobile ? { opacity: 0, x: 10 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.25,
              }}
            >
              <div className={styles.icon} aria-hidden>
                <Icon className={styles.iconSvg} />
              </div>
              <h3
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: m.title }}
              />
              <p
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: m.text }}
              />
              <p
                className={styles.badge}
                dangerouslySetInnerHTML={{ __html: m.badge }}
              />

            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default UsageModes;
