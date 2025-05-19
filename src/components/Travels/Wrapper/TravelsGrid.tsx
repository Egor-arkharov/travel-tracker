// Travels/Wrapper/TravelsGrid.tsx
import TravelCard from "../TravelCard/TravelCard";
import styles from "./Travels.module.scss";
import { Travel } from "@/types/travel";
import {
  applyGridClassesToTravels,
  resolveGridPattern
} from "@/lib/layout/tripsGridPattern";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useMemo } from "react";

interface TravelsGridProps {
  travels: Travel[];
  view: string;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const TravelsGrid = ({
  travels,
  view,
  onSelect,
  selectedId,
}: TravelsGridProps) => {
  const windowWidth = useWindowWidth();

  const travelsWithGridClasses = useMemo(() => {
    if (view !== "grid" || travels.length === 0 || windowWidth <= 500) {
      return travels.map((travel) => ({
        ...travel,
        gridItemClassName: styles.cardItem,
      }));
    }

    const { blockSizes, suffix } = resolveGridPattern(
      travels.length,
      windowWidth
    );

    return applyGridClassesToTravels(
      travels,
      blockSizes,
      suffix,
      styles
    );
  }, [travels, view, windowWidth]);

  if (!travels || travels.length === 0) {
    return <p>No travels to display matching your criteria.</p>;
  }

  return (
    <ul className={`${styles[view]} ${styles.travelsGridContainer}`}>
      {travelsWithGridClasses.map((travel) => (
        <li
          key={travel.id}
          className={travel.gridItemClassName || styles.cardItem}
        >
          <TravelCard
            travel={travel}
            view={view}
            onClick={() => {
              if (travel.id) onSelect(travel.id);
            }}
            imageLayoutId={`image-${travel.id}`}
            isSelected={selectedId === travel.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default TravelsGrid;