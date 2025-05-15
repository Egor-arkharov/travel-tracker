// TravelsGrid.tsx
import TravelCard from "../TravelCard/TravelCard";
import styles from "./Travels.module.scss";
import { Travel } from "@/types/travel";

type TravelWithGridClass = Travel & {
  gridItemClassName?: string;
};

// Определяем props для TravelsGrid
interface TravelsGridProps {
  travelsWithClasses: TravelWithGridClass[];
  view: string;
}

const TravelsGrid = ({ travelsWithClasses, view }: TravelsGridProps) => {
  if (!travelsWithClasses || travelsWithClasses.length === 0) {
    return null;
  }

  return (
    <ul className={`${styles[view]}`}>
      {travelsWithClasses.map((travel) => (
        <li
          key={travel.id}
          className={travel.gridItemClassName || styles.cardItem}
        >
          <TravelCard travel={travel} view={view} /> {/* TravelCard ожидает обычный объект Travel */}
        </li>
      ))}
    </ul>
  );
};

export default TravelsGrid;