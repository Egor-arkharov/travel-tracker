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
  cardLayoutId: string;
  imageLayoutId: string;
  isSelected: boolean;
}

const TravelInfoMotion = motion.create(TravelInfo);

const TravelCard = ({
  travel,
  view,
  onClick,
  cardLayoutId,
  imageLayoutId,
  isSelected,
}: TravelCardProps) => {
  return (
    <motion.article
      layoutId={cardLayoutId}
      className={`${styles.card} ${styles[view]}`}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <div className={styles.inner}>
        <TravelImage
          travel={travel}
          layoutId={imageLayoutId}
          priority={isSelected}
        />
        <TravelInfoMotion
          travel={travel}
          mode="card"
          initial={false}
          animate={isSelected ? "hidden" : "visible"}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
            hidden:  { opacity: 0, y: -8, transition: { duration: 0.12 } },
          }}
        />
      </div>
    </motion.article>
  );
};

export default TravelCard;
