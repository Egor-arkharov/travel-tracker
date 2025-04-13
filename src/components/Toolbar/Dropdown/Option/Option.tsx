import styles from "./Option.module.scss";

interface OptionButtonProps {
  label: string;
  Icon: React.ElementType;
  active?: boolean;
  direction?: "asc" | "desc";
  onClick: () => void;
  colorClass?: string;
}

const OptionButton = ({
  label,
  Icon,
  active = false,
  direction,
  onClick,
  colorClass,
}: OptionButtonProps) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""} ${colorClass ? styles[colorClass] : ""}`}
      onClick={onClick}
    >
      <Icon className={styles.icon} width={22} height={22} />
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {direction && (
          <span className={`${styles.arrow} ${direction === "asc" ? styles.up : styles.down}`} />
        )}
      </div>
    </button>
  );
};

export default OptionButton;
