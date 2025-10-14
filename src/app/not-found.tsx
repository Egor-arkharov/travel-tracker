"use client";
import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1>404&nbsp;&mdash; Page not found</h1>
      <p>Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist or&nbsp;was moved.</p>
      <Link href="/" className={styles.link}>
        Go back home
      </Link>
    </section>
  );
}
