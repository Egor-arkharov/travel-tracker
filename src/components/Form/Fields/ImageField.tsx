"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/formSlice";
import { FieldRef } from "@/types/formField";
import styles from "@/components/Form/Form.module.scss";

const ImageField = forwardRef<FieldRef, { disabled?: boolean }>(({ disabled = false }, ref) => {
  const dispatch = useAppDispatch();
  const storeImageUrl = useAppSelector((state) => state.form.media.imageUrl);
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

      <div className={`${styles.fieldBody} ${styles.image}`}>
        <input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleFileChange}
          ref={fileInputRef}
          className={styles.imageInput}
          disabled={disabled}
        />

        {!disabled && previewUrl && (
          <div className={styles.imagePreview}>
            <Image
              src={previewUrl}
              alt="Your image preview"
              layout="fill"
              className={styles.image}
            />
          </div>
        )}

        {<p className={styles.imageMessage}>{previewUrl ? "Change image" : "Choose an image to upload"}</p>}

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </fieldset>
  );
});

ImageField.displayName = "ImageField";

export default ImageField;
