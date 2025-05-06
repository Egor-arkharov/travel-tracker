"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginWithPopup } from "@/lib/firebase/auth";
import styles from "./DemoNotice.module.scss";

interface DemoNoticeProps {
  className?: string;
}

const DemoNotice = ({ className }: DemoNoticeProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isDemoMode = !user;

  if (!isDemoMode) return null;

  const handleLogin = async () => {
    try {
      await loginWithPopup(dispatch);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className={`${styles.demoNotice} ${className || ""}`}>
      You are currently in <b>Demo mode</b>.  
      Your data is saved only in your browser and may be lost.  
      <br />
      Please{" "}
      <button onClick={handleLogin} className={styles.loginButton}>
        <b>log in</b>
      </button>{" "}
      to save your trips permanently!
    </div>
  );
};

export default DemoNotice;
