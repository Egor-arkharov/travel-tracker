"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import { FieldRef } from "@/types/formField"; // Просто тип validate
import styles from "@/components/Form/Form.module.scss";

const ImageField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const storeImageUrl = useAppSelector((state) => state.travelForm.media.imageUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(storeImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;

      dispatch(updateField({ path: "media.imageUrl", value: base64data }));
      dispatch(updateField({ path: "media.imagePath", value: file.name }));
      dispatch(updateField({ path: "media.imageFile", value: file }));

      setPreviewUrl(base64data);
      setError(null);
    };

    reader.readAsDataURL(file);
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!previewUrl) {
        setError("Upload an image");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setError(null);
    }
  }));

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label} htmlFor="image">Upload Image</label>

      <div className={styles.fieldBody}>
        <input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={styles.imageInput}
        />

        {previewUrl && (
          <div className={styles.imagePreview}>
            <img src={previewUrl} alt="Your image preview" />
          </div>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </fieldset>
  );
});

ImageField.displayName = "ImageField";

export default ImageField;
