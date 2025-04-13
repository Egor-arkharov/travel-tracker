"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./Form.module.scss";

const DescriptionField = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector((state) => state.travelForm.description || "");

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="description">Description</label>
      <textarea
        id="description"
        rows={4}
        value={description}
        onChange={(e) =>
          dispatch(updateField({ key: "description", value: e.target.value }))
        }
        placeholder="Describe your trip…"
        style={{
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
				className={styles.input}
      />
    </div>
  );
};

export default DescriptionField;
