// Travels/TravelCard/TravelCardInfo.tsx
"use client";

import {
  CountryIcon,
  CalendarIcon,
  BudgetIcon,
  RatingIcon,
  DescriptionIcon,
} from "@/components/icons";

import styles from "./TravelCard.module.scss";
import { Travel } from "@/types/travel";
import { forwardRef } from "react";

interface TravelInfoProps {
  travel: Travel;
  mode?: "card" | "modal";
  onDelete?: () => void;
}

const TravelInfo = forwardRef<HTMLDivElement, TravelInfoProps>(
  ({ travel, mode = "card", onDelete }, ref) => {
    const isModal = mode === "modal";

    return (
      <div className={styles.info} ref={ref}>
        <h3>{travel.location.country}</h3>
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
            <div className={styles.actions}>
              <button
                className={styles.actionsEdit}
                disabled={travel.meta.isMock}
              >
                Edit
              </button>
              <button
                className={styles.actionsRemove}
                disabled={travel.meta.isMock}
                onClick={() => {
                if (!travel.meta.isMock && onDelete) onDelete();
              }}
              >
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);

TravelInfo.displayName = "TravelInfo";

export default TravelInfo;
