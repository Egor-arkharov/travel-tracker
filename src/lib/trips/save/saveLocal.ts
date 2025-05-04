import { TravelFormState } from "@/types/travel";
import { Travel } from "@/types/travel";

export const saveLocal = (form: TravelFormState) => {
  const existing = JSON.parse(localStorage.getItem("trips") || "[]");

  const formClone = structuredClone(form);
  formClone.media.imageFile = null;

  const newTrip: Travel = {
    ...formClone,
    id: Date.now().toString(),
    meta: { ...formClone.meta, isMock: false },
  };

  localStorage.setItem("trips", JSON.stringify([...existing, newTrip]));
  localStorage.removeItem("localForm");

  return newTrip;
};

