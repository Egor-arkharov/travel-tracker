"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/formSlice";
import styles from "@/components/Form/Form.module.scss";

const DescriptionField = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector((state) => state.form.description || "");

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="description">Description</label>

      <div className={styles.fieldBody}>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) =>
            dispatch(updateField({ path: "description", value: e.target.value }))
          }
          placeholder="Describe your trip…"
          className={`${styles.textarea}`}
        />
      </div>
    </fieldset>
  );
};

export default DescriptionField;
