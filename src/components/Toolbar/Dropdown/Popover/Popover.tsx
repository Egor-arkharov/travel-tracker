"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./Popover.module.scss";
import OptionButton from "../Option/Option";

interface Option {
  key: string;
  label: string;
  Icon: React.ElementType;
  colorClass?: string;
}

interface DropdownPopoverProps {
  label: string;
  icon: React.ElementType;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  withDirection?: boolean;
}

const DropdownPopover = ({
  label,
  icon: TriggerIcon,
  options,
  value,
  onChange,
  withDirection = false,
}: DropdownPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        open &&
        dialogRef.current &&
        !dialogRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleClick = (key: string) => {
    if (key === currentKey && withDirection) {
      const newDir = direction === "asc" ? "desc" : "asc";
      setDirection(newDir);
      onChange(`${key}:${newDir}`);
    } else {
      setDirection("asc");
      onChange(withDirection ? `${key}:asc` : key);
    }
  };

  const currentKey = withDirection && value.includes(":") ? value.split(":")[0] : value;
  const currentDirection = withDirection && value.includes(":") ? value.split(":")[1] : "asc";

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <TriggerIcon width={16} height={16} />
        <span>{label}</span>
      </button>

      <dialog
        ref={dialogRef}
        open={open}
        className={styles.dropdownWrapper}
      >
        <div className={styles.dropdownContent}>
          {options.map(({ key, label, Icon, colorClass }) => (
            <OptionButton
              key={key}
              label={label}
              Icon={Icon}
              active={currentKey === key}
              direction={withDirection && currentKey === key ? (currentDirection as "asc" | "desc") : undefined}
              colorClass={colorClass}
              onClick={() => handleClick(key)}
            />
          ))}
        </div>
      </dialog>
    </div>
  );
};

export default DropdownPopover;
