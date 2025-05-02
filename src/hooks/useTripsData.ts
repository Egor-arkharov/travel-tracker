"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "@/app/firebase";
import { Travel, FirestoreTravel } from "@/types/travel";
import { User } from "@/types/user";

export const useTripsData = (
  source: "local" | "firebase" | "mock",
  user: User | null
) => {
  const [trips, setTrips] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (source === "firebase" || source === "mock") {
        try {
          const querySnapshot = await getDocs(collection(db, "travels"));
          const storage = getStorage();

          const data = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const d = doc.data() as FirestoreTravel;
              const id = doc.id;

              if (!d) return null;

              // фильтрация по типу источника
              if (source === "firebase") {
                if (!user || d.uid !== user.uid) return null;
              } else if (source === "mock") {
                if (!d.meta?.isMock) return null;
              }

              let imageUrl = "";
              try {
                const imageRef = ref(storage, d.media.imagePath);
                imageUrl = await getDownloadURL(imageRef);
              } catch {
                imageUrl = "";
              }

              const travel: Travel = {
                ...d,
                id,
                media: {
                  ...d.media,
                  imageUrl,
                },
              };

              return travel;
            })
          );

          setTrips(data.filter((t): t is Travel => Boolean(t)));
        } catch (e) {
          console.error("Ошибка загрузки данных из Firebase:", e);
          setTrips([]);
        }
      } else {
        const saved = localStorage.getItem("trips");
        if (saved) {
          try {
            const localData = JSON.parse(saved) as Travel[];
            setTrips(localData);
          } catch (e) {
            console.error("Ошибка чтения trips из localStorage:", e);
            setTrips([]);
          }
        } else {
          setTrips([]);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [source, user]);

  return { trips, loading };
};
