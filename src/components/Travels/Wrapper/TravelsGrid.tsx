import TravelCard from "../TravelCard/TravelCard";
import styles from "./Travels.module.scss";
import { Travel } from "@/types/travel";

const TravelsGrid = ({ travels, view }: { travels: Travel[]; view: string }) => {

  const grouped: Travel[][] = [];
  for (let i = 0; i < travels.length; i += 4) {
    grouped.push(travels.slice(i, i + 4));
  }

  return (
    <>
      {grouped.map((group, index) => (
        <ul key={index} className={`${styles[view]}`}>
          {group.map((travel) => (
            <li key={travel.id} className={`${styles.card}`}>
              <TravelCard travel={travel} />
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};

export default TravelsGrid;
