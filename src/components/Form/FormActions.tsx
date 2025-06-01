import styles from "./Form.module.scss";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  isReadyToSubmit: boolean;
  isFormDirty: boolean;
  submitError: string | null;
  onReset: () => void;
}

const FormActions = ({
  isSubmitting,
  isEditMode,
  isReadyToSubmit,
  isFormDirty,
  submitError,
  onReset,
}: FormActionsProps) => {
  return (
    <div className={styles.buttons}>
      <button
        type="submit"
        className="button button--triary"
        disabled={isSubmitting || !isReadyToSubmit}
      >
        {isSubmitting ? "Saving…" : isEditMode ? "Save" : "Submit"}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="button button--danger"
        disabled={isSubmitting || !isFormDirty}
      >
        Reset
      </button>

      {submitError && <p className={styles.errorMessage}>{submitError}</p>}
    </div>
  );
};

export default FormActions;
