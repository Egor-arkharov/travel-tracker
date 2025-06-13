import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
			<footer className={styles.footer}>
				<div className={styles.inner}>
        <div className={styles.left}>© {year} Travel Tracker</div>
        <div className={styles.right}>
          <Link href="/about">About</Link>
          <Link href="/author">Author</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
