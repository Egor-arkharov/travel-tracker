// Travels/Wrapper/TravelsPage.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTrip } from "@/store/slices/tripsSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterTravels } from "@/utils/filterTravels";
import { sortTravels } from "@/utils/sortTravels";
import TravelsGrid from "./TravelsGrid";
import Toolbar from "@/components/Toolbar/Toolbar";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import Link from "next/link";
import styles from "./Travels.module.scss";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import TravelModal from "../TravelModal/TravelModal";
import { Travel } from "@/types/travel";
import TravelsMap from "../TravelMap/TravelsMap.client";
import { useRouter, useSearchParams } from "next/navigation";

const TravelsPage = ({
  mode = "full",
  source,
}: {
  mode?: "full" | "compact";
  source?: "firebase" | "local" | "mock";
}) => {
  const dispatch = useAppDispatch();

  // 🔄 Стейт из Redux
  const userTrips = useAppSelector((state) => state.trips.user);
  const mockTrips = useAppSelector((state) => state.trips.mock);
  const loading = useAppSelector((state) => state.trips.loading);

  const trips: Travel[] = source === "mock" ? mockTrips : userTrips;

  // 🧠 Управляемое состояние и сортировка
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState("grid");
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => filterTravels(trips, search), [trips, search]);
  const sorted = useMemo(() => sortTravels(filtered, sort), [filtered, sort]);
  const visibleTravels: Travel[] = mode === "compact" ? sorted.slice(0, 4) : sorted;

  // 🔍 Работа с модалкой
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const selectedTravel = useMemo(
    () => visibleTravels.find((t) => t.id === selectedId) || null,
    [selectedId, visibleTravels]
  );

  const handleCloseModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleDelete = useCallback(() => {
    if (!selectedTravel || selectedTravel.meta.isMock) return;

    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteTrip(selectedTravel.id!));
      setIsDeleting(false);
      handleCloseModal();
    }, 600);
  }, [selectedTravel, dispatch, handleCloseModal]);

  // 🪵 Логгирование
  useEffect(() => {
    console.log("Trips data:", trips);
  }, [trips]);

  // 🖼️ Рендер
  return (
    <section>
      <Header title="My Travels" icon="train" />

      {loading ? (
        <p>Loading...</p>
      ) : trips.length === 0 ? (
        <EmptyNotice
          title="No trips yet. Start creating your adventures!"
          buttonHref="/create"
        />
      ) : (
        <>
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

          {mode === "full" && visibleTravels.length > 0 && (
            <TravelsMap travels={visibleTravels} />
          )}

          <LayoutGroup>
            <TravelsGrid
              travels={visibleTravels}
              view={view}
              onSelect={(id) => {
                router.push(`?id=${id}`, { scroll: false });
              }}
              selectedId={selectedId}
            />

            <AnimatePresence>
              {selectedId && selectedTravel && (
                <TravelModal
                  key={selectedId}
                  travel={selectedTravel}
                  onClose={handleCloseModal}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                  imageLayoutId={`image-${selectedId}`}
                />
              )}
            </AnimatePresence>
          </LayoutGroup>
        </>
      )}

      {mode === "compact" && trips.length > 0 && (
        <Link href="/example" className={styles.link}>
          See all travels →
        </Link>
      )}
    </section>
  );
};

export default TravelsPage;
