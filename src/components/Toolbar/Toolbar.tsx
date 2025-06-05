import styles from "./Toolbar.module.scss";
import DropdownPopover from "./Dropdown/Popover/Popover";
import { sortOptions } from "./Options/sortOptions";
import { viewOptions } from "./Options/viewOptions";
import {
  SortIcon,
  GridIcon,
  MapIcon
} from "@/components/icons";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  view: string;
  onViewChange: (value: string) => void;
  showMap: boolean;
  onToggleMap: () => void;
}

const Toolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  showMap,
  onToggleMap
}: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search by city or country"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <DropdownPopover
        label="Sort"
        icon={SortIcon}
        iconSize={22}
        options={sortOptions}
        value={sort}
        onChange={onSortChange}
        withDirection={true}
        triggerClass={`${styles.trigger} ${styles.triggerSort}`}
      />

      <DropdownPopover
        label="View"
        icon={GridIcon}
        iconSize={18}
        options={viewOptions}
        value={view}
        onChange={onViewChange}
        withDirection={false}
        triggerClass={`${styles.trigger} ${styles.triggerView}`}
      />

      <button
        className={`${styles.trigger} ${styles.triggerMap} ${showMap ? styles.active : ""}`}
        onClick={onToggleMap}
        title={showMap ? "Hide map" : "Show map"}
      >
        <MapIcon width={20} height={20} />
        <span>Map</span>
      </button>

    </div>
  );
};

export default Toolbar;
