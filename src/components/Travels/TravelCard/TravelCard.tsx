// TravelCard.tsx
"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { Travel } from "@/types/travel";
import styles from "./TravelCard.module.scss";

import CountryIcon from "@/components/icons/country.svg";
import CalendarIcon from "@/components/icons/calendar.svg";
import BudgetIcon from "@/components/icons/budget.svg";
import RatingIcon from "@/components/icons/rating.svg";
import { useRef } from "react";

const TravelCard = ({ travel, view }: { travel: Travel, view: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  let imageSrc: string | undefined;

  if (travel.meta.isMock) {
    imageSrc = travel.media.imagePath;
  } else if (travel.media.imageUrl) {
    imageSrc = travel.media.imageUrl;
  }

  return (
    <div className={`${styles[view]} ${styles.card}`}>
      <div className={styles.inner}>
        {imageSrc && (
          <div
            ref={ref}
            className={`${styles.imageWrapper}`}
          >
            <Image
              src={imageSrc}
              alt={travel.location.city}
              width={400}
              height={300}
              className={`${styles.image} ${isInView ? styles.anim : ""}`}
            />
          </div>
        )}
        <div className={styles.info}>
          <h3>{travel.location.country}</h3>

          <p>
            <span>
              <CountryIcon className={styles.icon} width={14} height={14} />
            </span>
            <span>
              {travel.location.city}
            </span>
          </p>

          <p>
            <span>
              <CalendarIcon className={styles.icon} width={14} height={14} />
            </span>
            <span>
              <span className={styles.infoDate}>{travel.dates.start}</span> – <span className={styles.infoDate}>{travel.dates.end}</span>
            </span>
          </p>

          <p>
            <span>
              <BudgetIcon className={styles.icon} width={14} height={14} />
            </span>
            <span>
              {travel.budget}
            </span>
          </p>

          <p>
            <span>
              <RatingIcon className={styles.icon} width={14} height={14} />
            </span>
            <span>
              {travel.rating}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
