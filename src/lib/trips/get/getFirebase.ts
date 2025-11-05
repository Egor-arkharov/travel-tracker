import { FirestoreTravel, Travel } from "@/types/travel";
import { User } from "@/types/user";

export const getFirebase = async (user: User | null): Promise<Travel[]> => {
  if (!user) return [];

  const dbMod = await import("firebase/database");
  const storageMod = await import("firebase/storage");

  const db = dbMod.getDatabase();
  const storage = storageMod.getStorage();

  const snapshot = await dbMod.get(dbMod.ref(db, `users/${user.uid}/travels`));
  const data = snapshot.val();

  if (!data) return [];

  const trips = await Promise.all(
    Object.entries(data as Record<string, FirestoreTravel>).map(
      async ([id, d]) => {
        let imageUrl = d.media.imageUrl || "";
        if (!imageUrl && d.media.imagePath) {
          try {
            const imageRef = storageMod.ref(storage, d.media.imagePath);
            imageUrl = await storageMod.getDownloadURL(imageRef);
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
