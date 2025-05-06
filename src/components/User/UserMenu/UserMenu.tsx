import { useState } from "react";
import Link from "next/link";
import styles from "./UserMenu.module.scss";
import { UserIcon } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useAuth();

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => setIsOpen(p => !p)}>
        <div className={styles.avatar}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" className={styles.avatarImage} />
          ) : (
            <UserIcon width={22} height={22} />
          )}
        </div>
        <span className={styles.name}>{user?.displayName || "Demo"}</span>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <Link href="/profile" className={styles.menuItem}>My Profile</Link>
          <Link href="/trips" className={styles.menuItem}>My Trips</Link>
          <Link href="/create" className={styles.menuItem}>Add Trip</Link>
          {user ? (
            <button onClick={logout} className={styles.menuItem}>Logout</button>
          ) : (
            <button onClick={login} className={styles.menuItem}>Login</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
