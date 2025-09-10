"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { RatingIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/formSlice";
import { FieldRef } from "@/types/formField";
import styles from "@/components/Form/Form.module.scss";

const RatingField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const storeRating = useAppSelector((state) => state.form.rating);

  const [localRating, setLocalRating] = useState(storeRating);
  const [hovered, setHovered] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!localRating || localRating < 1) {
        setError("Give a rating");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setError(null);
      setLocalRating(0);
    }
  }));

  const handleClick = (value: number) => {
    const newRating = (localRating === value) ? 0 : value;
    setLocalRating(newRating);
    dispatch(updateField({ path: "rating", value: newRating }));
    setError(null);
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>Rating</label>

      <div className={`${styles.fieldBody} ${styles.rating}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hovered !== null ? star <= hovered : star <= localRating;
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

      {error && <p className={styles.errorMessage}>{error}</p>}
    </fieldset>
  );
});

RatingField.displayName = "RatingField";

export default RatingField;
