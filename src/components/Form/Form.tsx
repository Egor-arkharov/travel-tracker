"use client";

import { useEffect } from "react";
import { APILoader } from "@googlemaps/extended-component-library/react";
import styles from "./Form.module.scss";

import Header from "@/components/UI/Header/Header";
import CityField from "./Fields/CityField";
import DateField from "./Fields/DateField";
import RatingField from "./Fields/RatingField";
import BudgetField from "./Fields/BudgetField";
import DescriptionField from "./Fields/DescriptionField";
import ImageField from "./Fields/ImageField";
import Preview from "./Preview/Preview";
import FormActions from "./FormActions";

import { useTravelFormLogic } from "@/hooks/useTravelFormLogic";
import { usePreviewModal } from "@/hooks/usePreviewModal";

import { Travel } from "@/types/travel";

interface FormProps {
  isEditMode?: boolean;
  initialTrip?: Travel;
}

const Form = ({ isEditMode = false }: FormProps) => {
  const {
    isModalOpen: showSuccessModal,
    activeTrip: savedTrip,
    openModal: showPreviewForTrip,
    closeModal: handleCloseModal,
  } = usePreviewModal();

  const {
    isSubmitting,
    submitError,
    registerRef,
    handleSubmit,
    handleReset,
    isReadyToSubmit,
    isFormDirty,
    missingFields
  } = useTravelFormLogic({
    isEditMode,
    onSuccess: showPreviewForTrip,
  });

  useEffect(() => {
    if (!isEditMode) {
      handleReset();
    }
  }, [isEditMode, handleReset]);

  useEffect(() => {
    if (showSuccessModal) {
      handleReset();
    }
  }, [showSuccessModal, handleReset]);

  return (
    <>
      <Header title={isEditMode ? "Edit trip" : "Create trip"} icon="car" />
      <APILoader className={styles.api} apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} language="en" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <CityField ref={registerRef} disabled={isSubmitting} />
        <DateField ref={registerRef} disabled={isSubmitting} />
        <RatingField ref={registerRef} disabled={isSubmitting} />
        <BudgetField ref={registerRef} disabled={isSubmitting} />
        <DescriptionField disabled={isSubmitting} />
        <ImageField ref={registerRef} disabled={isSubmitting} />

        <FormActions
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          isReadyToSubmit={isReadyToSubmit}
          isFormDirty={isFormDirty}
          submitError={submitError} 
          onReset={handleReset}
          missingFields={missingFields} 
        />
      </form>

      {savedTrip && (
        <Preview 
          open={showSuccessModal} 
          onClose={handleCloseModal} 
          trip={savedTrip} 
          isEditMode={isEditMode}
        />
      )}
    </>
  );
};

export default Form;
