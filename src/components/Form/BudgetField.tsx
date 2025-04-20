"use client";

import { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./_Form.module.scss";

const MIN = 0;
const MAX = 10000;
const STEP = 100;

const BudgetField = () => {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.travelForm.budget);
  const [local, setLocal] = useState(budget);
  const budgetRef = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleInput = (value: number) => {
    setLocal(value);
    dispatch(updateField({ key: "budget", value }));
  };

  // 🪄 Смещаем bubble по значению
  useEffect(() => {
    const budget = budgetRef.current;
    const bubble = bubbleRef.current;
    if (!budget || !bubble) return;

    const percent = ((local - MIN) / (MAX - MIN)) * 100;
    const offset = 16 - (percent / 100) * 32; // смещение, чтобы центрировать
    bubble.style.left = `calc(${percent}% + ${offset}px)`;
  }, [local]);

  return (
    <fieldset  className={styles.fieldset}>
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
            />
            <div ref={bubbleRef} className={styles.budgetBubble}>
              {local}$
            </div>
          </div>

          <span>{MAX}$</span>
        </div>

        <input
          type="number"
          min={MIN}
          max={MAX}
          step={STEP}
          value={local}
          onChange={(e) => handleInput(+e.target.value)}
          className={styles.budgetNumberInput}
        />
      </div>
    </fieldset>
  );
};

export default BudgetField;
