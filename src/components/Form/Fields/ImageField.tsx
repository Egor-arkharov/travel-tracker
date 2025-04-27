"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import { FieldRef } from "@/types/formField"; // Тип рефа
import styles from "@/components/Form/Form.module.scss";

const ImageField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const imageUrl = useAppSelector((state) => state.travelForm.imageUrl);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    dispatch(updateField({ key: "imageFile", value: file }));
    dispatch(updateField({ key: "imagePath", value: file.name }));
    dispatch(updateField({ key: "imageUrl", value: "" }));

    setError(null); // сбрасываем ошибку, если выбрали файл
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!previewUrl && !imageUrl) {
        setError("Добавьте картинку");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setError(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // сбросить файл в input type="file"
      }
    }
  }));
  

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // очищаем превью при размонтировании
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
