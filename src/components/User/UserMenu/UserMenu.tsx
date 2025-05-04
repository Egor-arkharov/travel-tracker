"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./UserMenu.module.scss";
import { UserIcon } from "@/components/icons";
import { auth, provider } from "@/app/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, logout } from "@/store/slices/authSlice";
import { mapFirebaseUserToUser } from "@/lib/firebase/mapFirebaseUser";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(prev => !prev);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      dispatch(login(mapFirebaseUserToUser(result.user)));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleClick}>
        <div className={styles.avatar}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" className={styles.avatarImage} />
          ) : (
            <UserIcon width={22} height={22} />
          )}
        </div>
        <span className={styles.name}>
          {user?.displayName || "Demo"}
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <Link href="/profile" className={styles.menuItem}>My Profile</Link>
          <Link href="/trips" className={styles.menuItem}>My Trips</Link>
          <Link href="/create" className={styles.menuItem}>Add Trip</Link>
          {user ? (
            <button onClick={handleLogout} className={styles.menuItem}>Logout</button>
          ) : (
            <button onClick={handleLogin} className={styles.menuItem}>Login</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
