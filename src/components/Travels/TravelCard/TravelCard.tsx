"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Travel } from "@/types/travel";
import styles from "./TravelCard.module.scss";

const TravelCard = ({ travel }: { travel: Travel }) => {
  let imageSrc: string | undefined;

  if (travel.meta.isMock) {
    imageSrc = travel.media.imagePath; // из public
  } else if (travel.media.imageUrl) {
    imageSrc = travel.media.imageUrl; // firebase или демо
  }

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        {imageSrc && (
          <div className={styles.imageWrapper}>
            <motion.div
              className={styles.imageDecorWrapper}
              initial={{ scale: 1.2, y: -20 }}
              whileInView={{ scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={imageSrc}
                alt={travel.location.city}
                width={400}
                height={300}
                className={styles.image}
              />
            </motion.div>
          </div>
        )}
        <div className={styles.info}>
          <h3>{travel.location.country}</h3>
          <p>City: {travel.location.city}</p>
          <p>Date: {travel.dates.start} – {travel.dates.end}</p>
          <p>Budget: ${travel.budget}</p>
          <p>Rating: {travel.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
