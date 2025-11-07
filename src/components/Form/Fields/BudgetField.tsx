"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/formSlice";
import { FieldRef } from "@/types/formField";
import styles from "@/components/Form/Form.module.scss";

const MIN = 0;
const MAX = 10000;
const STEP = 100;

const BudgetField = forwardRef<FieldRef, { disabled?: boolean }>(({ disabled = false }, ref) => {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.form.budget);

  const [local, setLocal] = useState(budget);
  const [error, setError] = useState<string | null>(null);

  const budgetRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (local <= 0) {
        setError("Specify the trip budget");
        return false;
      }
      if (local > MAX) {
        setError(`Budget can't exceed ${MAX}$`);
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setError(null);
      setLocal(0);
      dispatch(updateField({ path: "budget", value: 0 }));
    },
  }));

  const handleInput = (value: number) => {
    if (Number.isNaN(value)) return;
    setLocal(value);
    dispatch(updateField({ path: "budget", value }));
    setError(null);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/^0+/, "");
    const value = Number(cleaned);

    if (cleaned === "") {
      setLocal(0);
      return;
    }

    if (value < 1) {
      setLocal(1);
      setError(`Minimum value is 1$`);
      dispatch(updateField({ path: "budget", value: 1 }));
      return;
    }

    if (value > MAX) {
      setLocal(MAX);
      setError(`Maximum value is ${MAX}$`);
      dispatch(updateField({ path: "budget", value: MAX }));
      return;
    }

    setError(null);
    handleInput(value);
  };

  useEffect(() => {
    const range = budgetRef.current;
    const bubble = bubbleRef.current;
    if (!range || !bubble) return;

    const percent = ((local - MIN) / (MAX - MIN)) * 100;
    const offset = 16 - (percent / 100) * 32;
    bubble.style.left = `calc(${percent}% + ${offset}px)`;
  }, [local]);

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="budget">Budget</label>

      <div className={`${styles.fieldBody} ${styles.budget}`}>
        <div className={styles.budgetRow}>
          <span>{MIN}$</span>

          <div className={styles.budgetLine}>
            <input
              id="budget"
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={local}
              onChange={(e) => handleInput(+e.target.value)}
              ref={budgetRef}
              disabled={disabled}
            />
            <div ref={bubbleRef} className={styles.budgetBubble}>
              {local}$
            </div>
          </div>

          <span>{MAX}$</span>
        </div>

        <input
          type="number"
          min={1}
          max={MAX}
          step={1}
          value={local || ""}
          onChange={handleNumberChange}
          className={styles.budgetNumberInput}
          disabled={disabled}
        />
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </fieldset>
  );
});

BudgetField.displayName = "BudgetField";

export default BudgetField;
