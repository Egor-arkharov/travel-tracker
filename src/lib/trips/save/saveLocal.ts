import { formState, Travel } from "@/types/travel";

export const saveLocal = (form: formState, isEditMode: boolean): Travel => {
  const formClone = structuredClone(form);
  formClone.media.imageFile = null;

  const allTrips: Travel[] = JSON.parse(localStorage.getItem("trips") || "[]");

  let newTrip: Travel;

  if (isEditMode && form.id) {
    newTrip = {
      ...formClone,
      id: form.id,
      meta: { ...formClone.meta, isMock: false },
    };

    const updated = allTrips.map((t) => (t.id === form.id ? newTrip : t));
    localStorage.setItem("trips", JSON.stringify(updated));
  } else {
    newTrip = {
      ...formClone,
      id: Date.now().toString(),
      meta: { ...formClone.meta, isMock: false },
    };

    localStorage.setItem("trips", JSON.stringify([...allTrips, newTrip]));
  }

  localStorage.removeItem("localForm");
  return newTrip;
};
