// Travels/Wrapper/TravelsPage.tsx
"use client";

import { useAppSelector } from "@/store/hooks";
import { useTripsData } from "@/hooks/useTripsData";
import { useCallback, useMemo, useState } from "react";
import { filterTravels } from "@/utils/filterTravels";
import { sortTravels } from "@/utils/sortTravels";
import TravelsGrid from "./TravelsGrid";
import Toolbar from "@/components/Toolbar/Toolbar";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import Link from "next/link";
import styles from "./Travels.module.scss";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import {
  applyGridClassesToTravels,
  resolveGridPattern
} from "@/lib/layout/tripsGridPattern";
import TravelModal from "../TravelModal/TravelModal";
import { Travel } from "@/types/travel";
import TravelsMap from "../TravelMap/TravelsMap";
import { useRouter, useSearchParams } from "next/navigation";


interface TravelWithGridClass extends Travel {
  gridItemClassName?: string;
}

const TravelsPage = ({
  mode = "full",
  source: propSource,
}: {
  mode?: "full" | "compact";
  source?: "firebase" | "local" | "mock";
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const source = propSource ?? (user ? "firebase" : "local");

  const { trips, loading } = useTripsData(source, user);
  const windowWidth = useWindowWidth();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState("grid"); // 'grid' или 'list'

  const filtered = useMemo(() => filterTravels(trips, search), [trips, search]);
  const sorted = useMemo(() => sortTravels(filtered, sort), [filtered, sort]);
  const visibleTravels: Travel[] = mode === "compact" ? sorted.slice(0, 4) : sorted;

  const travelsWithGridClasses: TravelWithGridClass[] = useMemo(() => {
    if (view !== "grid" || visibleTravels.length === 0 || windowWidth <= 500) {
      return visibleTravels.map((travel) => ({
        ...travel,
        gridItemClassName: styles.cardItem,
      }));
    }
    const { blockSizes, suffix } = resolveGridPattern(
      visibleTravels.length,
      windowWidth
    );
    return applyGridClassesToTravels(
      visibleTravels,
      blockSizes,
      suffix,
      styles
    );
  }, [visibleTravels, view, windowWidth]);

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
              travelsWithClasses={travelsWithGridClasses}
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