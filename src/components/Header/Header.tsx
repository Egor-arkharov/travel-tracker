// components/Header.tsx
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <p className={styles.title}>
        Travel Tracker
      </p>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link
              href="/"
              className={`${styles.link} ${pathname === "/" ? styles.active : ""
                }`}
            >
              Main
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href="/trips"
              className={`${styles.link} ${pathname === "/trips" ? styles.active : ""
                }`}
            >
              All trips
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href="/debug"
              className={`${styles.link} ${pathname === "/debug" ? styles.active : ""
                }`}
            >
              Debug
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
