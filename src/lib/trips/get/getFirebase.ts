import { getDatabase, ref, get } from "firebase/database";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";
import { FirestoreTravel, Travel } from "@/types/travel";
import { User } from "@/types/user";

export const getFirebase = async (user: User | null): Promise<Travel[]> => {
  if (!user) return [];

  const db = getDatabase();
  const storage = getStorage();
  const snapshot = await get(ref(db, `users/${user.uid}/travels`));
  const data = snapshot.val();

  if (!data) return [];

  const trips = await Promise.all(
    Object.entries(data as Record<string, FirestoreTravel>).map(
      async ([id, d]) => {
        let imageUrl = d.media.imageUrl || "";
        if (!imageUrl && d.media.imagePath) {
          try {
            const imageRef = storageRef(storage, d.media.imagePath);
            imageUrl = await getDownloadURL(imageRef);
          } catch {
            imageUrl = "";
          }
        }
  
        return {
          ...d,
          id,
          media: {
            ...d.media,
            imageUrl,
          },
        };
      }
    )
  );
  

  return trips;
};
