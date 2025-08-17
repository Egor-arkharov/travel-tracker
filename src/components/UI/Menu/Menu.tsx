/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Menu.module.scss";
import {
  UserIcon,
  PlaneIcon,
  PlusIcon,
  LogInIcon,
  LogOutIcon,
  BoardIcon
} from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";

interface MenuProps {
  fixed?: boolean;
}

const Menu = ({ fixed }: MenuProps) => {
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");

    const detect = () => {
      setIsTouch(media.matches);
    };

    detect();

    window.addEventListener("resize", detect);
    media.addEventListener("change", detect);

    return () => {
      window.removeEventListener("resize", detect);
      media.removeEventListener("change", detect);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isTouch &&
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, isTouch]);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${fixed ? styles.fixed : ""} ${
        isOpen ? styles["is-open"] : ""
      }`}
      {...(!isTouch && {
        onMouseEnter: () => setIsOpen(true),
        onMouseLeave: () => setIsOpen(false),
      })}
    >
      <button className={styles.button} onClick={handleClick}>
        {user?.photoURL && (
          <div className={styles.avatar}>
            <img
              src={user.photoURL}
              alt="avatar"
              className={styles.avatarImage}
            />
          </div>
        )}
        <span className={styles.name}>{user?.displayName || "Demo"}</span>
      </button>

      <div className={styles.menu}>
        <Link
          href="/create"
          className={`${styles.menuItem} ${styles.menuItemMob}`}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles.menuItemText}>Add Trip</span>
          <span className={styles.menuItemIcon}>
            <PlusIcon width={22} height={22} />
          </span>
        </Link>
        <Link
          href="/example"
          className={`${styles.menuItem} ${styles.menuItemMob}`}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles.menuItemText}>Example</span>
          <span className={styles.menuItemIcon}>
            <BoardIcon width={22} height={22} />
          </span>
        </Link>
        <Link
          href="/stats"
          className={styles.menuItem}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles.menuItemText}>My Stats</span>
          <span className={styles.menuItemIcon}>
            <UserIcon width={22} height={22} />
          </span>
        </Link>
        <Link
          href="/trips"
          className={styles.menuItem}
          onClick={() => setIsOpen(false)}
        >
          <span className={styles.menuItemText}>My Trips</span>
          <span className={styles.menuItemIcon}>
            <PlaneIcon width={22} height={22} />
          </span>
        </Link>
        {user ? (
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className={styles.menuItem}
          >
            <span className={styles.menuItemText}>Log out</span>
            <span className={`${styles.menuItemIcon} ${styles.menuItemIconReverse}`}>
              <LogOutIcon width={22} height={22} />
            </span>
          </button>
        ) : (
          <button
            onClick={() => {
              login();
              // setIsOpen(false);
            }}
            className={styles.menuItem}
          >
            <span className={styles.menuItemText}>Log in</span>
            <span className={`${styles.menuItemIcon} ${styles.menuItemIconReverse}`}>
              <LogInIcon width={22} height={22} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
