"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./DemoNotice.module.scss";

const DemoNotice = () => {
  const { isLoggedIn, login } = useAuth();

  if (isLoggedIn) return null;

  return (
    <div className={styles.demoNotice}>
      You are currently in <b>Demo mode</b>.  
      Your data is saved only in your browser and may be lost.  
      <br />
      Please{" "}
      <button onClick={login} className={styles.loginButton}>
        <b>log in</b>
      </button>{" "}
      to save your trips permanently!
    </div>
  );
};

export default DemoNotice;
