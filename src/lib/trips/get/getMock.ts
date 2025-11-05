import { FirestoreTravel, Travel } from "@/types/travel";

export const getMock = async (): Promise<Travel[]> => {
  const { getFirestoreAsync } = await import("@/app/firebase");
  const db = await getFirestoreAsync();
  const { getDocs, collection } = await import("firebase/firestore");

  const snap = await getDocs(collection(db, "travels"));

  const trips = snap.docs.map((doc) => {
    const d = doc.data() as FirestoreTravel;
    if (!d.meta?.isMock) return null;

    return {
      ...d,
      id: doc.id,
      media: { ...d.media, imageUrl: d.media.imageUrl },
    };
  });

  return trips.filter(Boolean) as Travel[];
};
