// TravelCardActions.tsx

import Link from "next/link";
import styles from "./TravelCard.module.scss";
import { Travel } from "@/types/travel";

interface Props {
  travel: Travel;
  onDelete?: () => void;
}

const TravelCardActions = ({ travel, onDelete }: Props) => {
  return (
    <div className={styles.actions}>
      <Link
        href={`/edit/${travel.id}`}
        className="button button--triary"
        aria-disabled={travel.meta.isMock}
      >
        Edit
      </Link>
      <button
        className="button button--danger"
        disabled={travel.meta.isMock}
        onClick={() => {
          if (!travel.meta.isMock && onDelete) onDelete();
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default TravelCardActions;
