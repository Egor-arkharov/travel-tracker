"use client";

import Link from "next/link";
import styles from "./EmptyNotice.module.scss";

interface EmptyNoticeProps {
  title: string;
  message: string;
}

const EmptyNotice = ({ title, message }: EmptyNoticeProps) => (
  <div className={styles.empty}>
    <p>{title}</p>
    <p>{message}</p>

    <Link href="/create" className={styles.emptyButton}>
      Add Trip
    </Link>
  </div>
);

export default EmptyNotice;
