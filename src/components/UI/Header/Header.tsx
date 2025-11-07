"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

import styles from "./Header.module.scss";

const ModeTooltip = dynamic(
  () => import("@/components/UI/ModeTooltip/ModeTooltip"),
  { ssr: false }
);

import {
  PlaneIcon,
  TrainIcon,
  ShipIcon,
  CarIcon,
  HelicopterIcon,
  BikeIcon,
  RocketIcon,
  RopeWayIcon,
  YachtIcon,
} from "@/components/icons";

export type IconKey =
  | "plane"
  | "train"
  | "ship"
  | "car"
  | "helicopter"
  | "bike"
  | "rocket"
  | "ropeway"
  | "yacht";

const ICONS_MAP: Record<IconKey, React.ElementType> = {
  plane: PlaneIcon,
  train: TrainIcon,
  ship: ShipIcon,
  car: CarIcon,
  helicopter: HelicopterIcon,
  bike: BikeIcon,
  rocket: RocketIcon,
  ropeway: RopeWayIcon,
  yacht: YachtIcon,
};

interface HeaderProps {
  title: string;
  icon: keyof typeof ICONS_MAP;
  modeTooltip?: "demo" | "auth";
}

const Header = ({ title, icon, modeTooltip }: HeaderProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  const IconComponent = ICONS_MAP[icon];

  return (
    <h2 ref={ref} className={`${styles.header} ${isInView ? styles.anim : ""}`}>
      <span className={styles.headerBorder}></span>
      <span className={styles.headerUnderDecorTopLeft}></span>
      <span className={styles.headerUnderDecorTopRight}></span>
      <span className={styles.headerUnderDecorLeft}></span>
      <span className={styles.headerUnderDecorBottom}></span>
      <span className={styles.headerIcon}>
        {IconComponent && <IconComponent width={50} height={50} />}
      </span>
      <span className={styles.headerText}>
        {title}
        {/* Рендерим тултип только когда реально нужен */}
        {modeTooltip && (
          <span className={styles.noticeIcon}>
            <ModeTooltip mode={modeTooltip} />
          </span>
        )}
      </span>
    </h2>
  );
};

export default Header;
