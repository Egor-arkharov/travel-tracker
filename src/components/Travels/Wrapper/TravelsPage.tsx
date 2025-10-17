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
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import TravelModal from "../TravelModal/TravelModal";
import { Travel } from "@/types/travel";
import TravelsMap from "../TravelMap/TravelsMap.client";
import { useRouter, useSearchParams } from "next/navigation";

const DELETE_DURATION_MS = 1000;

const TravelsPage = ({
  mode = "full",
  source,
}: {
  mode?: "full" | "compact";
  source?: "firebase" | "local" | "mock";
}) => {
  const dispatch = useAppDispatch();

  // 🔄 Redux
  const userTrips = useAppSelector((state) => state.trips.user);
  const mockTrips = useAppSelector((state) => state.trips.mock);
  const loading = useAppSelector((state) => state.trips.loading);
  const trips: Travel[] = source === "mock" ? mockTrips : userTrips;

  // 🔍 modal via ?id=
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  // 🧠 UI state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState("grid");
  const [showMap, setShowMap] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const hiddenId = pendingDeleteId;

  const [modalTravel, setModalTravel] = useState<Travel | null>(null);

  const filtered = useMemo(() => filterTravels(trips, search), [trips, search]);
  const sorted = useMemo(() => sortTravels(filtered, sort), [filtered, sort]);
  const visibleTravels: Travel[] = mode === "compact" ? sorted.slice(0, 4) : sorted;



  // Когда открываем модалку по id — один раз фиксируем данные.
  useEffect(() => {
    if (!selectedId) {
      setModalTravel(null);
      return;
    }
    // Если уже есть снапшот той же карточки — оставляем.
    if (modalTravel?.id === selectedId) return;
    const found = visibleTravels.find(t => t.id === selectedId);
    if (found) setModalTravel(found);
    // если в списке уже нет (например, мы удалили) — оставляем старый снапшот
  }, [selectedId, visibleTravels, modalTravel]);

  const handleCloseModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);


  const handleDelete = useCallback(() => {
    if (!modalTravel || modalTravel.meta.isMock) return;
    setIsDeleting(true);
    setPendingDeleteId(modalTravel.id!);

    dispatch(deleteTrip(modalTravel.id!));
    setTimeout(() => {
      handleCloseModal();
    }, DELETE_DURATION_MS);
  }, [modalTravel, dispatch, handleCloseModal]);


  // useEffect(() => {
  //   console.log("Trips data:", trips);
  // }, [trips]);

  return (
    <section>
      <Header
        title="My Travels"
        icon="train"
        modeTooltip={source === "mock" ? "demo" : "auth"}
      />

      {loading ? (
        <p>Loading...</p>
      ) : trips.length === 0 ? (
        <EmptyNotice title="No trips yet." message="Start creating your adventures!" />
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
              showMap={showMap}
              onToggleMap={() => setShowMap((v) => !v)}
            />
          )}

          {mode === "full" && visibleTravels.length > 0 && (
            <motion.div
              initial={false}
              animate={
                showMap
                  ? { height: "auto", opacity: 1, scale: 1, x: 0, y: 0 }
                  : { height: 0, opacity: 0, scale: 0.2, x: 50, y: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden", originX: 1, originY: 0 }}
              className={styles.mapWrap}
            >
              <TravelsMap travels={visibleTravels} />
            </motion.div>
          )}

          <LayoutGroup>
            <TravelsGrid
              travels={visibleTravels}
              view={view}
              onSelect={(id) => router.push(`?id=${id}`, { scroll: false })}
              selectedId={selectedId}
              hiddenId={hiddenId}
            />

            <AnimatePresence
              mode="popLayout"
              onExitComplete={() => {
                // просто чистим состояния после закрытия модалки
                setPendingDeleteId(null);
                setIsDeleting(false);
              }}
            >
              {selectedId && modalTravel && (
                <TravelModal
                  key={selectedId}
                  travel={modalTravel}
                  onClose={handleCloseModal}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                  cardLayoutId={`card-${selectedId}`}
                  imageLayoutId={`image-${selectedId}`}
                  deleteDurationMs={DELETE_DURATION_MS}
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
