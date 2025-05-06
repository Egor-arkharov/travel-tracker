"use client";

import { useAppSelector } from "@/store/hooks";
import { useTripsData } from "@/hooks/useTripsData";
import { useMemo, useState } from "react";
import { filterTravels } from "@/utils/filterTravels";
import { sortTravels } from "@/utils/sortTravels";
import TravelsGrid from "./TravelsGrid";
import Toolbar from "@/components/Toolbar/Toolbar";
import EmptyNotice from "@/components/UI/EmptyNotice/EmptyNotice";
import Header from "@/components/UI/Header/Header";
import Link from "next/link";
import styles from "./Travels.module.scss";

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

  console.log(trips, source);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => filterTravels(trips, search), [trips, search]);
  const sorted = useMemo(() => sortTravels(filtered, sort), [filtered, sort]);
  const visibleTravels = mode === "compact" ? sorted.slice(0, 4) : sorted;

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

        <TravelsGrid travels={visibleTravels} view={view} />
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
