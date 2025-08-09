"use client";

// components/Homepage/Explore/UsageModes.tsx
import styles from "./Explore.module.scss";
import Header from "@/components/UI/Header/Header";
import { LoupeIcon, DataIcon, CloudIcon } from "@/components/icons";

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
  return (
    <section className={styles.section}>
      <Header title="Your way" icon="rocket" />

      <div className={styles.modesGrid}>
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <article className={styles.modeCard} key={m.title}>
              <div className={styles.icon} aria-hidden>
                <Icon className={styles.iconSvg} />
              </div>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.text}>{m.text}</p>
              <span className={styles.badge}>{m.badge}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default UsageModes;