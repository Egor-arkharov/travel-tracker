"use client";

import { useEffect } from "react";
import { APILoader } from "@googlemaps/extended-component-library/react";
import { useAppDispatch } from "@/store/hooks";
import { resetForm } from "@/store/slices/formSlice";
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
  const dispatch = useAppDispatch();

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
  } = useTravelFormLogic({
    isEditMode,
    onSuccess: showPreviewForTrip,
  });

  useEffect(() => {
    if (!isEditMode && !localStorage.getItem("localForm")) {
      dispatch(resetForm());
    }
  }, [isEditMode, dispatch]);

  // Очистка формы после успешного создания
  useEffect(() => {
    if (showSuccessModal) {
      dispatch(resetForm());
      localStorage.removeItem("localForm");
    }
  }, [showSuccessModal, dispatch]);

  // useLayoutEffect(() => {
  //   clearFieldRefs();
  // });

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

        <FormActions
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          isReadyToSubmit={isReadyToSubmit}
          isFormDirty={isFormDirty}
          submitError={submitError} 
          onReset={handleReset}
        />
      </form>

      {savedTrip && (
        <Preview open={showSuccessModal} onClose={handleCloseModal} trip={savedTrip} />
      )}
    </>
  );
};

export default Form;
