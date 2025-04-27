"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./UserMenu.module.scss";
import { UserIcon } from "@/components/icons";

const UserMenu = () => {
  const isDemoMode = true;
  const user = "John Doe";
  const login = () => console.log("Login clicked");
  const logout = () => console.log("Logout clicked");

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleClick}>
        <div className={styles.avatar}>
					<UserIcon width={22} height={22} />
        </div>
        <span className={styles.name}>
          {isDemoMode ? "Demo" : user}
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <Link href="/profile" className={styles.menuItem}>My Profile</Link>
          <Link href="/trips" className={styles.menuItem}>My Trips</Link>
          <Link href="/create" className={styles.menuItem}>Add Trip</Link>
          {isDemoMode ? (
            <button onClick={login} className={styles.menuItem}>Login</button>
          ) : (
            <button onClick={logout} className={styles.menuItem}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
