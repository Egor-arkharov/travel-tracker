"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import { FieldRef } from "@/types/formField";
import styles from "../Form.module.scss";
import { CalendarIcon } from "@/components/icons";

const DateField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const { start, end } = useAppSelector((state) => state.travelForm.dates);

  const [range, setRange] = useState<[Date | null, Date | null]>([
    start ? new Date(start) : null,
    end ? new Date(end) : null,
  ]);
  const [error, setError] = useState<string | null>(null);

  const datePickerRef = useRef<DatePicker | null>(null);

  const clearDates = () => {
    setRange([null, null]);
    dispatch(updateField({ path: "dates.start", value: "" }));
    dispatch(updateField({ path: "dates.end", value: "" }));
    setError(null);
  };

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    setRange([startDate, endDate]);

    dispatch(updateField({ path: "dates.start", value: startDate?.toISOString().split("T")[0] ?? "" }));
    dispatch(updateField({ path: "dates.end", value: endDate?.toISOString().split("T")[0] ?? "" }));

    setError(null);
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!range[0] || !range[1]) {
        setError("Select the trip dates");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      clearDates();
    }
  }));

  const hasDates = !!range[0] || !!range[1];

  const handleClearClick = () => {
    clearDates();
    datePickerRef.current?.setFocus();
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>Trip Dates</label>
      <div className={styles.fieldBody}>
        <div className={`${styles.inputWrapper} ${error ? styles.inputError : ""}`}>
          <CalendarIcon className={styles.inputIcon} width={20} height={20} />
          <DatePicker
            className={styles.input}
            selected={range[0]}
            onChange={handleChange}
            startDate={range[0]}
            endDate={range[1]}
            selectsRange
            maxDate={new Date()}
            placeholderText="Select trip dates"
            ref={datePickerRef}
          />
          {hasDates && (
            <button
              type="button"
              className={styles.customClear}
              onClick={handleClearClick}
            >
              ×
            </button>
          )}
        </div>

        {error && <p role="alert" className={styles.errorMessage}>{error}</p>}
      </div>
    </fieldset>
  );
});

DateField.displayName = "DateField";

export default DateField;
