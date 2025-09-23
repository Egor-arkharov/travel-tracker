//hooks/useTravelFormLogic

import { useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetForm } from "@/store/slices/formSlice";
import { saveTrip } from "@/lib/trips/save/saveTrip";
import { Travel } from "@/types/travel";
import { FieldRef } from "@/types/formField";
import { isFormReadyToSubmit } from "@/utils/form/isFormReady";
import { isFormDirty as checkFormDirty } from "@/utils/form/isFormDirty";

interface UseTravelFormLogicProps {
  isEditMode: boolean;
  onSuccess?: (savedTrip: Travel) => void;
}

export const useTravelFormLogic = ({ isEditMode, onSuccess }: UseTravelFormLogicProps) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.form);
  const user = useAppSelector((state) => state.auth.user);

  const fieldRefs = useRef<FieldRef[]>([]);
  const registerRef = useCallback((ref: FieldRef | null) => {
    if (ref && !fieldRefs.current.includes(ref)) {
      fieldRefs.current.push(ref);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormReadyToSubmit(formState)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const saved = await saveTrip(formState, user, isEditMode);
      fieldRefs.current.forEach((ref) => ref.reset?.());
      onSuccess?.(saved);
    } catch (error) {
      console.error("Failed to save trip:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    dispatch(resetForm());
    localStorage.removeItem("localForm");
    fieldRefs.current.forEach((ref) => ref.reset?.());
    setSubmitError(null);
  }, [dispatch]);

  return {
    isSubmitting,
    submitError,
    registerRef,
    handleSubmit,
    handleReset,
    isReadyToSubmit: isFormReadyToSubmit(formState),
    isFormDirty: checkFormDirty(formState),
  };
};
