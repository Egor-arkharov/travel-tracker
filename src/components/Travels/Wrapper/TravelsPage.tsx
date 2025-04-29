"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Travel } from "@/types/travel";
import TravelsGrid from "./TravelsGrid";
import Toolbar from "@/components/Toolbar/Toolbar";
import { filterTravels } from "@/utils/filterTravels";
import { sortTravels } from "@/utils/sortTravels";
import Link from "next/link";
import styles from "./Travels.module.scss";
import Header from "@/components/UI/Header/Header";

const TravelsPage = ({
  mode = "full",
  source = "firebase", // добавляем дефолт
}: {
  mode?: "full" | "compact";
  source?: "firebase" | "local";
}) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const fetchData = async () => {
      if (source === "firebase") {
        const querySnapshot = await getDocs(collection(db, "travels"));
        const storage = getStorage();

        const data: Travel[] = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const d = doc.data() as Travel;
            d.id = doc.id;

            if (d.isMock) return d;

            try {
              const imageRef = ref(storage, d.imagePath);
              const url = await getDownloadURL(imageRef);
              return { ...d, imageUrl: url };
            } catch {
              return { ...d, imageUrl: "" };
            }
          })
        );

        setTravels(data);
      } else {
        const saved = localStorage.getItem("trips");
        if (saved) {
          try {
            const localData = JSON.parse(saved) as Travel[];
            setTravels(localData);
          } catch (error) {
            console.error("Ошибка чтения trips:", error);
          }
        }
      }
    };

    fetchData();
  }, [source]);


  const filtered = useMemo(() => filterTravels(travels, search), [travels, search]);
  const sorted = useMemo(() => sortTravels(filtered, sort), [filtered, sort]);

  const visibleTravels = mode === "compact" ? sorted.slice(0, 4) : sorted;

  return (
    <section>
      <Header title="My Travels" icon="train" />

      {mode === "full" && (
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
        />
      )}

      <TravelsGrid travels={visibleTravels} view={view} />

      {mode === "compact" && (
        <Link
          href="/example"
          className={styles.link}
        >
          See all travels →
        </Link>
      )}
    </section>
  );
};
export default TravelsPage;
