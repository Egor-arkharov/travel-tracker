"use client";

import Link from "next/link";
import styles from "./EmptyNotice.module.scss";

interface EmptyNoticeProps {
  title: string;
  message?: string;
  buttonHref: string;
}

const EmptyNotice = ({ title, message, buttonHref }: EmptyNoticeProps) => (
  <div className={styles.empty}>
    <p>{title}</p>
    {message && <p className={styles.message}>{message}</p>}
    <Link href={buttonHref} className={styles.button}>
      Add Trip
    </Link>
  </div>
);

export default EmptyNotice;
