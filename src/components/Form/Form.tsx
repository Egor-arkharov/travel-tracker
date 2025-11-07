"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import styles from "./Form.module.scss";
import CityField from "./Fields/CityField";
import DateField from "./Fields/DateField";
import RatingField from "./Fields/RatingField";
import BudgetField from "./Fields/BudgetField";
import DescriptionField from "./Fields/DescriptionField";
import ImageField from "./Fields/ImageField";
import Preview from "./Preview/Preview";
import FormActions from "./FormActions";

import Header from "@/components/UI/Header/Header";
import { useAppSelector } from "@/store/hooks";
import { useTravelFormLogic } from "@/hooks/useFormLogic";
import { usePreviewModal } from "@/hooks/usePreviewModal";
import { Travel } from "@/types/travel";

interface FormProps {
  isEditMode?: boolean;
  initialTrip?: Travel;
}

const APILoader = dynamic(
  () =>
    import("@googlemaps/extended-component-library/react").then(
      (m) => m.APILoader
    ),
  { ssr: false }
);

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
    missingFields,
  } = useTravelFormLogic({
    isEditMode,
    onSuccess: showPreviewForTrip,
  });

  const pathname = usePathname();
  const formState = useAppSelector((state) => state.form);

  useEffect(() => {
    if (pathname === "/create" && formState.id) {
      handleReset();
    }
  }, [pathname, formState.id, handleReset]);

  useEffect(() => {
    if (showSuccessModal) {
      handleReset();
    }
  }, [showSuccessModal, handleReset]);

  return (
    <>
      <Header
        title={isEditMode ? "Edit trip" : "Create trip"}
        icon="car"
        modeTooltip="auth"
      />
      <APILoader
        className={styles.api}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
        language="en"
      />

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
