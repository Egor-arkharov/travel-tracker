// Travels/TravelCard/TravelCard.tsx
"use client";

import { Travel } from "@/types/travel";
import styles from "./TravelCard.module.scss";
import TravelImage from "./TravelCardImage";
import TravelInfo from "./TravelCardInfo";
import { motion } from "framer-motion";

interface TravelCardProps {
  travel: Travel;
  view: string;
  onClick: () => void;
  imageLayoutId: string;
  isSelected: boolean;
}

const TravelInfoMotion = motion.create(TravelInfo);



const TravelCard = ({
  travel,
  view,
  onClick,
  imageLayoutId,
  isSelected,
}: TravelCardProps) => {
  return (
    <div
      className={`${styles.card} ${styles[view]}`}
      onClick={onClick}
    >
      <div className={styles.inner}>
        <TravelImage
          travel={travel}
          layoutId={imageLayoutId}
        />

        <TravelInfoMotion
          travel={travel}
          mode="card"
          initial="visible"
          animate={isSelected ? "hidden" : "visible"}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
            hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
          }}
        />
      </div>
    </div>
  );
};

export default TravelCard;