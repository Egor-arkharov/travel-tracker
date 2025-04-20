"use client";

import { useState } from "react";
import RatingIcon from "@/components/icons/rating.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./_Form.module.scss";

const RatingField = () => {
  const dispatch = useAppDispatch();
  const rating = useAppSelector((state) => state.travelForm.rating);

  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (rating === value) {
      dispatch(updateField({ key: "rating", value: 0 }));
    } else {
      dispatch(updateField({ key: "rating", value }));
    }
  };

  return (
    <fieldset  className={styles.fieldset}>
      <label className={styles.label}>Rating</label>

      <div className={`${styles.fieldBody} ${styles.rating}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hovered !== null
            ? star <= hovered
            : star <= rating;
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            >
              <RatingIcon
                name="star"
                width={32}
                height={32}
                className={isFilled ? "icon--filled" : "icon--outlined"}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RatingField;
