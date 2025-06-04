import { getDatabase, ref, push, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Travel, FirestoreTravel, formState } from "@/types/travel";
import { User } from "@/types/user";

export const saveFirebase = async (
  form: formState,
  user: User,
  isEditMode: boolean
): Promise<Travel> => {
  const db = getDatabase();
  const storage = getStorage();

  let imageUrl = form.media.imageUrl;

  if (form.media.imageFile) {
    const path = `users/${user.uid}/images/${Date.now()}_${form.media.imageFile.name}`;
    const imgRef = storageRef(storage, path);
    await uploadBytes(imgRef, form.media.imageFile);
    imageUrl = await getDownloadURL(imgRef);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { imageFile, previewUrl, ...cleanMedia } = form.media;

  const tripData: FirestoreTravel = {
    ...form,
    uid: user.uid,
    createdAt: form.createdAt || Date.now(),
    meta: { isMock: false },
    media: {
      ...cleanMedia,
      imageUrl,
    },
  };

  const tripId = isEditMode && form.id ? form.id : push(ref(db)).key!;
  const tripRef = ref(db, `users/${user.uid}/travels/${tripId}`);
  await set(tripRef, { ...tripData, id: tripId });

  return { ...tripData, id: tripId };
};
