// Travels/TravelCard/TravelCardInfo.tsx
"use client";

import { forwardRef } from "react";

import styles from "./TravelCard.module.scss";
import TravelCardActions from "./TravelCardActions";

import {
  CountryIcon,
  CalendarIcon,
  BudgetIcon,
  RatingIcon,
  DescriptionIcon,
} from "@/components/icons";
import { Travel } from "@/types/travel";



interface TravelInfoProps {
  travel: Travel;
  mode?: "card" | "modal";
  onDelete?: () => void;
}

const TravelInfo = forwardRef<HTMLDivElement, TravelInfoProps>(
  ({ travel, mode = "card", onDelete }, ref) => {
    const isModal = mode === "modal";

    return (
      <div className={styles.info} ref={ref} data-mode={mode} >
        <h3 className={styles.infoTitle}>{travel.location.country}</h3>
        <p className={styles.infoItem}>
          <CountryIcon className={styles.icon} width={14} height={14} />
          <span>{travel.location.city}</span>
        </p>
        <p className={styles.infoItem}>
          <CalendarIcon className={styles.icon} width={14} height={14} />
          <span>
            <span className={styles.infoDate}>{travel.dates.start}</span> –{" "}
            <span className={styles.infoDate}>{travel.dates.end}</span>
          </span>
        </p>
        <p className={styles.infoItem}>
          <BudgetIcon className={styles.icon} width={14} height={14} />
          <span>{travel.budget}</span>
        </p>
        <p className={styles.infoItem}>
          <RatingIcon className={styles.icon} width={14} height={14} />
          <span>{travel.rating}</span>
        </p>

        {isModal && (
          <>
            {travel.description && (
              <p className={`${styles.infoDescription} ${styles.infoItem}`}>
                <DescriptionIcon className={styles.icon} width={14} height={14} />
                <span>{travel.description}</span>
              </p>
            )}
            <TravelCardActions travel={travel} onDelete={onDelete} />
          </>
        )}
      </div>
    );
  }
);

TravelInfo.displayName = "TravelInfo";

export default TravelInfo;
