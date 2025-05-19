// lib/trips/delete/deleteFirebase.ts
import { getDatabase, ref, remove } from "firebase/database";

export const deleteTripFromFirebase = async (uid: string, tripId: string) => {
  const db = getDatabase();
  const tripRef = ref(db, `users/${uid}/travels/${tripId}`);
	console.log("Удаляем поездку из Firebase", tripRef.toString());
  await remove(tripRef);
};
