// utils/form/getMissingFields.ts
import { formState } from "@/types/travel";

export const getMissingFields = (form: formState): string[] => {
  const missing: string[] = [];

  if (!form.location.city) missing.push("City");
  if (!form.dates.start || !form.dates.end) missing.push("Dates");
  if (!form.rating) missing.push("Rating");
  if (!form.budget) missing.push("Budget");
  if (!form.media.imageUrl && !form.media.previewUrl && !form.media.imageFile) {
    missing.push("Image");
  }

  return missing;
};