import styles from "./Toolbar.module.scss";
import DropdownPopover from "./Dropdown/Popover/Popover";
import { sortOptions } from "./Options/sortOptions";
import { viewOptions } from "./Options/viewOptions";
import SortIcon from "@/components/icons/sort.svg";
import GridIcon from "@/components/icons/grid.svg";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  view: string;
  onViewChange: (value: string) => void;
}

const Toolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
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
        options={sortOptions}
        value={sort}
        onChange={onSortChange}
        withDirection={true}
      />

      <DropdownPopover
        label="View"
        icon={GridIcon}
        options={viewOptions}
        value={view}
        onChange={onViewChange}
        withDirection={false}
      />
    </div>
  );
};

export default Toolbar;
