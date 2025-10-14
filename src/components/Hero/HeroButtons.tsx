import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Hero.module.scss";

const HeroButtons = () => {
  const pathname = usePathname();
  const { isLoggedIn, login } = useAuth();

  const isCreatePage = pathname === "/create";
  const isTripsPage = pathname === "/trips";
  const isStatsPage = pathname === "/stats";

  return (
    <div className={styles.buttons}>
      {/* --- PRIMARY BUTTON --- */}
      {isCreatePage ? (
        <Link href="/trips" className="button button--primary button--large">
          My Trips
        </Link>
      ) : (
        <Link href="/create" className="button button--primary button--large">
          Create a trip
        </Link>
      )}

      {/* --- SECONDARY BUTTON --- */}
      {!isLoggedIn ? (
        <button
          className="button button--secondary button--large"
          onClick={login}
        >
          Log in
        </button>
      ) : isTripsPage ? (
        <Link href="/stats" className="button button--secondary button--large">
          My Stats
        </Link>
      ) : isCreatePage ? (
        <Link href="/stats" className="button button--secondary button--large">
          My Stats
        </Link>
      ) : isStatsPage ? (
        <Link href="/trips" className="button button--secondary button--large">
          My Trips
        </Link>
      ) : (
        <Link href="/trips" className="button button--secondary button--large">
          My Trips
        </Link>
      )}
    </div>
  );
};

export default HeroButtons;
