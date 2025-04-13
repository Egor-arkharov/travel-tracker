"use client";

import { useRef, useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./Form.module.scss";

const ImagePathField = () => {
  const dispatch = useAppDispatch();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    dispatch(updateField({ key: "imageFile", value: file }));
    dispatch(updateField({ key: "imagePath", value: file.name }));
    dispatch(updateField({ key: "imageUrl", value: "" }));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // очищаем
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="image">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleFileChange}
        ref={fileInputRef}
				className={styles.input}
      />

      {previewUrl && (
        <div style={{ marginTop: "8px" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ borderRadius: "6px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePathField;
