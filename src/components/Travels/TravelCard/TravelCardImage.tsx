// Travels/TravelCard/TravelCardImage.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./TravelCard.module.scss";
import { Travel } from "@/types/travel";

const TravelImage = ({
  travel,
  layoutId,
}: {
  travel: Travel;
  layoutId: string;
}) => {
  const imageSrc = travel.meta.isMock
    ? travel.media.imagePath
    : travel.media.imageUrl;

  if (!imageSrc) return null;

  return (
    <motion.div
      layoutId={layoutId}
      className={styles.imageWrapper}
    >
      <Image
        src={imageSrc}
        alt={travel.location.city}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.image}
      />
    </motion.div>
  );
};

export default TravelImage;