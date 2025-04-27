"use client";

import { useRef, useState } from "react";
import { APILoader } from "@googlemaps/extended-component-library/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm } from "@/store/slices/travelFormSlice";
import styles from "./Form.module.scss";

import Header from "@/components/UI/Header/Header";
import CityField from "./Fields/CityField";
import DateField from "./Fields/DateField";
import RatingField from "./Fields/RatingField";
import BudgetField from "./Fields/BudgetField";
import DescriptionField from "./Fields/DescriptionField";
import ImageField from "./Fields/ImageField";
import Preview from "./Preview/Preview";

const Form = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.travelForm);

  const cityRef = useRef<any>(null);
  const dateRef = useRef<any>(null);
  const ratingRef = useRef<any>(null);
  const budgetRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = [
      cityRef.current?.validate(),
      dateRef.current?.validate(),
      ratingRef.current?.validate(),
      budgetRef.current?.validate(),
      imageRef.current?.validate()
    ];

    const isFormValid = validations.every(Boolean);

    if (!isFormValid) {
      return;
    }

    console.log("Форма валидна! Отправляем...");

    setShowSuccessModal(true);
  };

  const handleReset = () => {
    cityRef.current?.reset?.();
    dateRef.current?.reset?.();
    ratingRef.current?.reset?.();
    budgetRef.current?.reset?.();
    imageRef.current?.reset?.();

    dispatch(resetForm());
    setShowSuccessModal(false);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Header title="Create trip" icon="car" />

      <APILoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} language="en" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <CityField ref={cityRef} />
        <DateField ref={dateRef} />
        <RatingField ref={ratingRef} />
        <BudgetField ref={budgetRef} />
        <DescriptionField />
        <ImageField ref={imageRef} />

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          <button type="button" onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        </div>
      </form>

      <Preview open={showSuccessModal} onClose={handleCloseModal} trip={form} />
    </>
  );
};

export default Form;
