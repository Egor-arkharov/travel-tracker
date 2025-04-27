"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import { FieldRef } from "@/types/formField";
import styles from "../Form.module.scss";

const DateField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const { startDate, endDate } = useAppSelector((state) => state.travelForm);

  const [range, setRange] = useState<[Date | null, Date | null]>([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!range[0] || !range[1]) {
        setError("Выберите даты поездки");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setError(null);
      setRange([null, null]);
    }
  }));
  

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRange([start, end]);

    dispatch(updateField({ key: "startDate", value: start?.toISOString().split("T")[0] ?? "" }));
    dispatch(updateField({ key: "endDate", value: end?.toISOString().split("T")[0] ?? "" }));

    setError(null);
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>Trip Dates</label>

      <div className={styles.fieldBody}>
        <div className={styles.inputWrapper}>
          <DatePicker
            className={styles.input}
            selected={range[0]}
            onChange={handleChange}
            startDate={range[0]}
            endDate={range[1]}
            selectsRange
            placeholderText="Select trip dates"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </fieldset>
  );
});

DateField.displayName = "DateField";

export default DateField;
