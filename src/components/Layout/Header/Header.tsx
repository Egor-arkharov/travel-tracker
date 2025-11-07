// components/Header.tsx

/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import styles from "./Header.module.scss";
import { HeaderLinks } from "./HeaderLinks";

import { BurgerIcon, LogInIcon, LogOutIcon } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";


const Header = () => {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();

  const [fixed, setFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // фиксированная шапка
  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFixed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFixed(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);

    setFixed(!(hero.getBoundingClientRect().top >= 0));

    return () => observer.disconnect();
  }, [pathname]);

  // touch detection
  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const detect = () => setIsTouch(media.matches);

    detect();
    window.addEventListener("resize", detect);
    media.addEventListener("change", detect);

    return () => {
      window.removeEventListener("resize", detect);
      media.removeEventListener("change", detect);
    };
  }, []);

  // клик вне меню
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

  return (
    <motion.header
      className={`${styles.header} ${fixed ? styles.fixed : ""} layout-section`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${styles.inner} layout-inner`}>
        <Link href="/" className={styles.title}>
          Travel Tracker
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {HeaderLinks.filter(link => link.inHeader).map(({ href, label }) => (
              <li key={href} className={styles.item}>
                <Link
                  href={href}
                  className={`${styles.link} ${pathname === href ? styles.active : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            ref={wrapperRef}
            className={`${styles.menuWrapper} 
              ${fixed ? styles.isFixed : ""} 
              ${isOpen ? styles.isOpen : ""} 
              ${user ? styles.isLogged : ""}`}
            {...(!isTouch && {
              onMouseEnter: () => setIsOpen(true),
              onMouseLeave: () => setIsOpen(false),
            })}
          >
            <button
              className={styles.menuButton}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isOpen}
            >
              {user?.photoURL && (
                <div className={styles.menuAvatar}>
                  <img
                    src={user.photoURL}
                    alt="Your Avatar"
                    className={styles.avatarImage}
                  />
                </div>
              )}
              <span className={styles.menuName}>{user?.displayName || "Demo"}</span>
              <span className={styles.menuBurger}>
                <BurgerIcon width={22} height={22} />
              </span>
            </button>

            <div className={styles.menu} role="menu">
              {HeaderLinks.filter(link => link.inMenu !== false).map(({ href, label, icon: Icon, inMenu }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.menuItem} ${inMenu === "mobile" ? styles.menuItemMob : ""
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.menuItemText}>{label}</span>
                  {Icon && (
                    <span className={styles.menuItemIcon}>
                      <Icon width={22} height={22} />
                    </span>
                  )}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className={styles.menuItem}
                >
                  <span className={styles.menuItemText}>Log out</span>
                  <span
                    className={`${styles.menuItemIcon} ${styles.menuItemIconReverse}`}
                  >
                    <LogOutIcon width={22} height={22} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => login()}
                  className={styles.menuItem}
                >
                  <span className={styles.menuItemText}>Log in</span>
                  <span
                    className={`${styles.menuItemIcon} ${styles.menuItemIconReverse}`}
                  >
                    <LogInIcon width={22} height={22} />
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
