import { getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "@/app/firebase";
import { FirestoreTravel, Travel } from "@/types/travel";

export const getMock = async (): Promise<Travel[]> => {
  const querySnapshot = await getDocs(collection(db, "travels"));
  const storage = getStorage();

  const trips = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const d = doc.data() as FirestoreTravel;
      if (!d.meta?.isMock) return null;

      let imageUrl = "";
      try {
        const imageRef = ref(storage, d.media.imagePath);
        imageUrl = await getDownloadURL(imageRef);
      } catch {
        imageUrl = "";
      }

      return {
        ...d,
        id: doc.id,
        media: {
          ...d.media,
          imageUrl,
        },
      };
    })
  );

  return trips.filter(Boolean) as Travel[];
};
