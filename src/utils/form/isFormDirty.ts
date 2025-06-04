import { formState } from "@/types/travel";

export const isFormDirty = (form: formState): boolean => {
  return (
    !!form.location.city ||
    !!form.location.country ||
    !!form.dates.start ||
    !!form.dates.end ||
    form.budget > 0 ||
    form.rating > 0 ||
    !!form.description ||
    !!form.media.imageUrl
  );
};
