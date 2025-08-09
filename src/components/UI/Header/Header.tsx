"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./Header.module.scss";
import { 
  PlaneIcon, 
  TrainIcon, 
  ShipIcon, 
  CarIcon,
  HelicopterIcon,
  RocketIcon } from "@/components/icons";

const ICONS_MAP = {
  plane: PlaneIcon,
  train: TrainIcon,
  ship: ShipIcon,
  car: CarIcon,
  helicopter: HelicopterIcon,
  rocket: RocketIcon,
};

interface HeaderProps {
  title: string;
  icon: keyof typeof ICONS_MAP;
}

const Header = ({ title, icon }: HeaderProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  const IconComponent = ICONS_MAP[icon];

  return (
    <h2
      ref={ref}
      className={`${styles.header} ${isInView ? styles.anim : ""}`}
    >
      <span className={styles.headerBorder}></span>
      <span className={styles.headerUnderDecorTopLeft}></span>
      <span className={styles.headerUnderDecorTopRight}></span>
      <span className={styles.headerUnderDecorLeft}></span>
      <span className={styles.headerUnderDecorBottom}></span>
      <span className={styles.headerIcon}>
        {IconComponent && <IconComponent width={50} height={50} />}
      </span>
      <span className={styles.headerText}>{title}</span>
    </h2>
  );
};

export default Header;
