"use client";
import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>404 — Page not found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist or was moved.</p>
      <Link href="/" className={styles.link}>
        Go back home
      </Link>
    </section>
  );
}
