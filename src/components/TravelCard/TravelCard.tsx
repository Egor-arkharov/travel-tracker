// components/TravelCard.tsx
import Image from "next/image";
import { Travel } from "@/types/travel";
import styles from "./TravelCard.module.scss";

const TravelCard = ({ travel }: { travel: Travel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        {travel.imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={travel.imageUrl}
              alt={`${travel.city} photo`}
              width={400}
              height={300}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.info}>
          <h2>{travel.country}</h2>
          <p>City: {travel.city}</p>
          <p>Date: {travel.startDate} – {travel.endDate}</p>
          <p>Budget: ${travel.budget}</p>
          <p>Rating: {travel.rating}</p>
        </div>
      </div>

    </div>
  );
};

export default TravelCard;
