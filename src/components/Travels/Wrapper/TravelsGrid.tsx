// Travels/Wrapper/TravelsGrid.tsx
import TravelCard from "../TravelCard/TravelCard";
import styles from "./Travels.module.scss";
import { Travel } from "@/types/travel";

interface TravelWithGridClass extends Travel {
  gridItemClassName?: string;
}

interface TravelsGridProps {
  travelsWithClasses: TravelWithGridClass[];
  view: string;
  onSelect: (id: string) => void;
  selectedId: string | null; // 👈 добавь
}

const TravelsGrid = ({
  travelsWithClasses,
  view,
  onSelect,
  selectedId,
}: TravelsGridProps) => {
  if (!travelsWithClasses || travelsWithClasses.length === 0) {
    return <p>No travels to display matching your criteria.</p>;
  }

  return (
    <ul className={`${styles[view]} ${styles.travelsGridContainer}`}>
      {travelsWithClasses.map((travel) => (
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