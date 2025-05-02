"use client";

import Link from "next/link";
import styles from "./EmptyNotice.module.scss";

const EmptyMotice = ({ title, buttonHref }: { title: string; buttonHref: string }) => (
  <div className={styles.empty}>
    <p>{title}</p>
    <Link href={buttonHref} className={styles.button}>
      Add Trip
    </Link>
  </div>
);

export default EmptyMotice;
