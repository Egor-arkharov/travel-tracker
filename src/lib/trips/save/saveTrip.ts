import { TravelFormState } from "@/types/travel";
import { User } from "@/types/user";
import { saveFirebase } from "./saveFirebase";
import { saveLocal } from "./saveLocal";

export const saveTrip = async (
  form: TravelFormState,
  user: User | null
) => {
  if (user) {
    return await saveFirebase(form, user);
  } else {
    return saveLocal(form);
  }
};
