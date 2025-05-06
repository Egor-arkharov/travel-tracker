// components/Hero/Hero.tsx
"use client";

import styles from "./Hero.module.scss";
import HeroButtons from "./HeroButtons";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  backgroundPosition?: string;
}

const Hero = ({
  title,
  subtitle,
  image,
  backgroundPosition = "center",
}: HeroProps) => {
  return (
    <section className={styles.hero} id="hero">
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition,
        }}
      />
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <HeroButtons />
      </div>
    </section>
  );
};

export default Hero;
