import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import { FirestoreTravel, Travel } from "@/types/travel";

export const getMock = async (): Promise<Travel[]> => {
  const querySnapshot = await getDocs(collection(db, "travels"));

  const trips = querySnapshot.docs.map((doc) => {
    const d = doc.data() as FirestoreTravel;
    if (!d.meta?.isMock) return null;

    return {
      ...d,
      id: doc.id,
      media: {
        ...d.media,
        imageUrl: d.media.imageUrl,
      },
    };
  });

  return trips.filter(Boolean) as Travel[];
};

