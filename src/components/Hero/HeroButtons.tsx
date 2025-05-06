import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Hero.module.scss";

const HeroButtons = () => {
  const pathname = usePathname();
  const { isLoggedIn, login } = useAuth();

  const isCreatePage = pathname === "/create";

  return (
    <div className={styles.buttons}>
      {!isCreatePage && (
        <Link href="/create" className={styles.primaryButton}>Create a trip</Link>
      )}

      {isCreatePage && (
        <Link href="/profile" className={styles.primaryButton}>My Profile</Link>
      )}

      {!isLoggedIn ? (
        <button className={styles.secondaryButton} onClick={login}>Log in</button>
      ) : (
        !isCreatePage && (
          <Link href="/profile" className={styles.secondaryButton}>My Profile</Link>
        )
      )}
    </div>
  );
};

export default HeroButtons;
