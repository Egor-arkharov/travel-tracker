// components/Hero/Hero.tsx
"use client";

import Image from "next/image";
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
  const blurVersion = image.replace(/(\.\w+)$/, "-min$1");

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.background}>
        <Image
          src={image}
          alt="Hero background"
          fill
          priority
          placeholder="blur"
          blurDataURL={blurVersion}
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
