"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./_Form.module.scss";

const DateRangeField = () => {
  const dispatch = useAppDispatch();
  const { startDate, endDate } = useAppSelector((state) => state.travelForm);
  const [range, setRange] = useState<[Date | null, Date | null]>([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setRange([start, end]);

    dispatch(updateField({ key: "startDate", value: start?.toISOString().split("T")[0] ?? "" }));
    dispatch(updateField({ key: "endDate", value: end?.toISOString().split("T")[0] ?? "" }));
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>Date</label>
      
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
      </div>

    </fieldset>
  );
};

export default DateRangeField;
