import Link from "next/link";

import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
			<footer className={`${styles.footer} layout-section`}>
				<div className={`${styles.inner} layout-inner`}>
        <div className={styles.copyright}>© {year} Travel Tracker</div>
        <div className={styles.linkWrapper}>
          <Link className={styles.link} href="/about">About</Link>
          <Link className={styles.link} href="/author">Author</Link>
          <Link className={styles.link} href="/privacy-policy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
