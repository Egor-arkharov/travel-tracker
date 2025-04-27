// components/Header.tsx
"use client"

import { useEffect, useState } from "react";
// import AuthButton from "@/components/Auth/Auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";
import UserMenu from "@/components/User/UserMenu/UserMenu";

const Header = () => {
  const pathname = usePathname();
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
  
    if (!hero) {
      setFixed(true); // фикс на внутренних страницах
      return;
    }
  
    const observer = new IntersectionObserver(
      ([entry]) => setFixed(!entry.isIntersecting),
      { threshold: 0.1 }
    );
  
    observer.observe(hero);
  
    // начальное состояние (на случай, если hero уже вне вьюпорта)
    setFixed(!(hero.getBoundingClientRect().top >= 0));
  
    return () => observer.disconnect();
  }, [pathname]);
  

  return (
    <motion.header
    className={`${styles.header} ${fixed ? styles.fixed : ""}`}
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className={styles.inner}>
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
              href="/example"
              className={`${styles.link} ${pathname === "/example" ? styles.active : ""
                }`}
            >
              Example
            </Link>
          </li>
          <li className={styles.item}>
            <Link
              href="/create"
              className={`${styles.link} ${pathname === "/create" ? styles.active : ""
                }`}
            >
              Create
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
        
        <UserMenu />

        {/* <AuthButton /> */}
      </nav>
    </div>

  </motion.header>

  );
};

export default Header;
