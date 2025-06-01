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
        <Link href="/create" className="button button--primary button--large">Create a trip</Link>
      )}

      {isCreatePage && (
        <Link href="/profile" className="button button--primary button--large">My Profile</Link>
      )}

      {!isLoggedIn ? (
        <button className="button button--secondary button--large" onClick={login}>Log in</button>
      ) : (
        !isCreatePage && (
          <Link href="/profile" className="button button--secondary button--large">My Profile</Link>
        )
      )}
    </div>
  );
};

export default HeroButtons;
