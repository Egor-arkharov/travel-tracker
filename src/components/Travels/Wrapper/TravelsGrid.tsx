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
import { motion, AnimatePresence } from "framer-motion";

interface TravelsGridProps {
  travels: Travel[];
  view: string;
  onSelect: (id: string) => void;
  selectedId: string | null;
  hiddenId: string | null;
}

const TravelsGrid = ({
  travels,
  view,
  onSelect,
  selectedId,
  hiddenId,
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

  const items = hiddenId
    ? travelsWithGridClasses.filter(t => t.id !== hiddenId)
    : travelsWithGridClasses;

  return (
    <motion.ul
      className={`${styles[view]} ${styles.travelsGridContainer}`}
      layout
      transition={{ type: "spring", stiffness: 450, damping: 45 }}
    >
      {items.map((travel) => (
        <motion.li
          key={travel.id}
          className={travel.gridItemClassName || styles.cardItem}
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <TravelCard
            travel={travel}
            view={view}
            onClick={() => travel.id && onSelect(travel.id)}
            cardLayoutId={`card-${travel.id}`}
            imageLayoutId={`image-${travel.id}`}
            isSelected={selectedId === travel.id}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default TravelsGrid;
