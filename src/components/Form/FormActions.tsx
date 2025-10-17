"use client";

import Tippy from "@tippyjs/react";
import styles from "./Form.module.scss";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  isReadyToSubmit: boolean;
  isFormDirty: boolean;
  submitError: string | null;
  onReset: () => void;
  missingFields: string[];
}

const FormActions = ({
  isSubmitting,
  isEditMode,
  isReadyToSubmit,
  isFormDirty,
  submitError,
  onReset,
  missingFields,
}: FormActionsProps) => {
  const missingFieldsMessage =
    !isReadyToSubmit && missingFields.length > 0 ? (
      <div>
        <p>Please fill in the following fields:</p>
        <ul>
          {missingFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    ) : null;

  const resetTooltipMessage = !isFormDirty
    ? "Fill in at least one field to reset"
    : null;

  const wrapWithTippy = (content: React.ReactNode, child: React.ReactNode) =>
    content ? (
      <Tippy
        content={content}
        interactive={true}
        arrow={false}
        placement="top"
        duration={0}
        appendTo={document.body}
        className={styles.tooltip}
      >
        <div>{child}</div>
      </Tippy>
    ) : (
      child
    );

  const SubmitButton = (
    <button
      type="submit"
      className="button button--triary"
      disabled={isSubmitting || !isReadyToSubmit}
    >
      {isSubmitting ? "Saving…" : isEditMode ? "Save" : "Submit"}
    </button>
  );

  const ResetButton = (
    <button
      type="button"
      onClick={onReset}
      className="button button--danger"
      disabled={isSubmitting || !isFormDirty}
    >
      Reset
    </button>
  );

  return (
    <div className={styles.buttons}>
      {wrapWithTippy(missingFieldsMessage, SubmitButton)}
      {wrapWithTippy(resetTooltipMessage, ResetButton)}

      {submitError && <p className={styles.errorMessage}>{submitError}</p>}
    </div>
  );
};

export default FormActions;
