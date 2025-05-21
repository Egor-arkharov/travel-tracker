//components/Form/Form.tsx

"use client";


import { useRef, useState, useEffect } from "react";
import { setAllFields } from "@/store/slices/travelFormSlice";
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

import { FieldRef } from "@/types/formField";
import { saveTrip } from "@/lib/trips/save/saveTrip";
import { Travel } from "@/types/travel";

interface FormProps {
  isEditMode?: boolean;
  initialTrip?: Travel;
}

const Form = ({ isEditMode = false, initialTrip }: FormProps) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetForm());
      return;
    }

    if (isEditMode && initialTrip) {
      dispatch(setAllFields(initialTrip));
    }
  }, [isEditMode, initialTrip, dispatch]);

  console.log('form', initialTrip);

  const form = useAppSelector((state) => state.travelForm);
  const user = useAppSelector((state) => state.auth.user);

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
  const [savedTrip, setSavedTrip] = useState<Travel | null>(null);


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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const saved = await saveTrip(form, user, isEditMode);
      
      dispatch(resetForm());
      fieldRefs.current.forEach((ref) => ref.reset?.());
      setSavedTrip(saved);
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
      <Header title={isEditMode ? "Edit trip" : "Create trip"} icon="car" />

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
            {isSubmitting ? "Saving…" : isEditMode ? "Save" : "Submit"}
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
