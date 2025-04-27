"use client";

import { auth } from "@/app/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Auth.module.scss";
import { UserIcon } from "@/components/icons";
import { User } from "firebase/auth";


const provider = new GoogleAuthProvider();

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // console.log(user)

    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
  
      console.log("✅ User logged in:", {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photo: loggedUser.photoURL,
        uid: loggedUser.uid,
      });
  
      setUser(loggedUser); // если нужно явно, но onAuthStateChanged тоже подхватит
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  const handleLogout = async () => {
    await signOut(auth);
  };

  return user ? (
    <button className={styles.avatarButton} onClick={handleLogout}>
      <Image
        src={user.photoURL || "/auth.svg"}
        alt={user.displayName || "User Avatar"}
        width={32}
        height={32}
        className={styles.avatar}
      />
    </button>
  ) : (
    <button className={styles.loginButton} onClick={handleLogin}>
      <UserIcon width={20} height={20} />
      <span>Login</span>
    </button>
  );
};

export default AuthButton;
