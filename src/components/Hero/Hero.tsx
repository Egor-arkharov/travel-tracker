"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";
import HeroButtons from "./HeroButtons";
import { heroImages, HeroImageKey } from "./HeroImages";

interface HeroProps {
  title: string;
  subtitle: string;
  image: HeroImageKey | string | number;
  backgroundPosition?: string;
}

const Hero = ({
  title,
  subtitle,
  image,
  backgroundPosition = "center",
}: HeroProps) => {
  const key = Number(image) as HeroImageKey;
  const selected = heroImages[key] || heroImages[1];
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className={styles.hero} id="hero">
      <div
        className={`${styles.background} ${isLoaded ? styles.loaded : ""}`}
      >
        <Image
          src={selected.min}
          alt=""
          fill
          priority
          className={`${styles.image} ${styles.lowres}`}
          style={{ objectFit: "cover", objectPosition: backgroundPosition }}
        />

        <Image
          src={selected.image}
          alt="Hero background"
          fill
          priority
          className={`${styles.image} ${styles.highres}`}
          onLoadingComplete={() => setIsLoaded(true)}
          style={{ objectFit: "cover", objectPosition: backgroundPosition }}
        />
      </div>

      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <HeroButtons />
      </div>
    </section>
  );
};

export default Hero;
