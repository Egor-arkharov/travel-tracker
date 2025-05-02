"use client";

import { useRef, useState } from "react";
import { APILoader } from "@googlemaps/extended-component-library/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm } from "@/store/slices/travelFormSlice";
import { TravelFormState } from "@/store/slices/travelFormSlice";
import styles from "./Form.module.scss";

import Header from "@/components/UI/Header/Header";
import CityField from "./Fields/CityField";
import DateField from "./Fields/DateField";
import RatingField from "./Fields/RatingField";
import BudgetField from "./Fields/BudgetField";
import DescriptionField from "./Fields/DescriptionField";
import ImageField from "./Fields/ImageField";
import Preview from "./Preview/Preview";
import { FieldRef } from "@/types/formField";

const Form = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.travelForm);

  const fieldRefs = useRef<FieldRef[]>([]);
  fieldRefs.current = [];

  const registerRef = (ref: FieldRef | null) => {
    if (ref) {
      fieldRefs.current.push(ref);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedTrip, setSavedTrip] = useState<TravelFormState | null>(null);

  const isReadyToSubmit =
    form.location.city &&
    form.location.country &&
    form.dates.start &&
    form.dates.end &&
    form.budget > 0 &&
    form.rating > 0 &&
    form.media.imageUrl;

  const isFormDirty =
    form.location.city ||
    form.location.country ||
    form.dates.start ||
    form.dates.end ||
    form.budget > 0 ||
    form.rating > 0 ||
    form.description ||
    form.media.imageUrl;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validations = fieldRefs.current.map((ref) => ref.validate());
    const isFormValid = validations.every(Boolean);

    if (!isFormValid) {
      setFormErrors(["Please fill in all required fields."]);
      return;
    }

    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const existing = JSON.parse(localStorage.getItem("trips") || "[]");
      
      // клонируем и удаляем imageFile
      const formClone = structuredClone(form);
      formClone.media.imageFile = null;

      const newTrip = {
        ...formClone,
        id: Date.now(),
        meta: { ...formClone.meta, isMock: false },
      };

      localStorage.setItem("trips", JSON.stringify([...existing, newTrip]));
      localStorage.removeItem("localForm");

      dispatch(resetForm());
      fieldRefs.current.forEach((ref) => ref.reset?.());

      setSavedTrip(newTrip);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to save trip:", error);
      setFormErrors(["Something went wrong. Try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    fieldRefs.current.forEach((ref) => ref.reset?.());
    localStorage.removeItem("localForm");
    dispatch(resetForm());
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <Header title="Create trip" icon="car" />

      <APILoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} language="en" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <CityField ref={registerRef} />
        <DateField ref={registerRef} />
        <RatingField ref={registerRef} />
        <BudgetField ref={registerRef} />
        <DescriptionField />
        <ImageField ref={registerRef} />

        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isReadyToSubmit}
          >
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={isSubmitting || !isFormDirty}
          >
            Reset
          </button>

          {formErrors.length > 0 && (
            <p className={styles.errorMessage}>{formErrors[0]}</p>
          )}
        </div>
      </form>

      {savedTrip && (
        <Preview open={showSuccessModal} onClose={handleCloseModal} trip={savedTrip} />
      )}
    </>
  );
};

export default Form;
