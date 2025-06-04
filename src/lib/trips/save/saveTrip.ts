import { formState } from "@/types/travel";
import { User } from "@/types/user";
import { saveFirebase } from "./saveFirebase";
import { saveLocal } from "./saveLocal";

export const saveTrip = async (
  form: formState,
  user: User | null,
  isEditMode: boolean
) => {
  if (user) {
    return await saveFirebase(form, user, isEditMode);
  } else {
    return saveLocal(form, isEditMode);
  }
};
