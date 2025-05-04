import { getDatabase, ref, push, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Travel, FirestoreTravel, TravelFormState } from "@/types/travel";
import { User } from "@/types/user";

export const saveFirebase = async (
  form: TravelFormState,
  user: User
): Promise<Travel> => {
  const db = getDatabase();
  const storage = getStorage();

  // 1. Загружаем картинку в Storage
  let imageUrl = "";
  if (form.media.imageFile) {
    const path = `users/${user.uid}/images/${Date.now()}_${form.media.imageFile.name}`;
    const imgRef = storageRef(storage, path);
    await uploadBytes(imgRef, form.media.imageFile);
    imageUrl = await getDownloadURL(imgRef);
  }

  // 2. Убираем imageFile из media
  const { imageFile, previewUrl, ...cleanMedia } = form.media;

  // 3. Формируем объект поездки
  const newTrip: FirestoreTravel = {
    ...form,
    uid: user.uid,
    createdAt: Date.now(),
    meta: { isMock: false },
    media: {
      ...cleanMedia,
      imageUrl,
    },
  };

  // 4. Сохраняем в Realtime Database
  const userTripsRef = ref(db, `users/${user.uid}/travels`);
  const newRef = push(userTripsRef);
  await set(newRef, { ...newTrip, id: newRef.key });

  return { ...newTrip, id: newRef.key! };
};
