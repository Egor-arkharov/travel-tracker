// Travels/TravelCard/TravelCardImage.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./TravelCard.module.scss";
import { Travel } from "@/types/travel";

const TravelImage = ({
  travel,
  layoutId,
  priority = false,
}: {
  travel: Travel;
  layoutId: string;
  priority?: boolean;
}) => {
  const imageSrc = travel.meta.isMock
    ? travel.media.imagePath
    : travel.media.imageUrl;

  if (!imageSrc) return null;

  return (
    <motion.div layoutId={layoutId} className={styles.imageWrapper}>
      <Image
        src={imageSrc}
        alt={travel.location.city}
        fill
        className={styles.image}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
      />
    </motion.div>
  );
};

export default TravelImage;
