"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Preview.module.scss";

import { Travel } from "@/types/travel";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  trip: Travel;
  isEditMode?: boolean;
}

const Preview = ({ open, onClose, trip, isEditMode }: PreviewModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
      html.classList.add("no-scroll");
      body.classList.add("no-scroll");
    } else {
      setIsVisible(false);
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
    }

    return () => {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
    };
  }, [open]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      open
      className={`${styles.modal} ${isVisible ? styles.visible : ""}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2>{isEditMode ? "Trip Edited!" : "Trip Created!"}</h2>

        <div className={styles.tripPreview}>
          <p><b>City:</b> {trip.location.city}</p>
          <p><b>Country:</b> {trip.location.country}</p>
          <p><b>Dates:</b> {trip.dates.start} — {trip.dates.end}</p>
          <p><b>Budget:</b> {trip.budget}</p>
          <p><b>Rating:</b> {trip.rating} ⭐</p>

          {trip.media.imageUrl && (
            <div className={styles.previewImage}>
              <Image
                src={trip.media.imageUrl}
                alt="Trip preview"
                layout="fill"
              />
            </div>
          )}
        </div>

        <Link href="/trips" className={`button button--primary ${styles.link}`}>
          My&nbsp;Trips
        </Link>
      </div>
    </dialog>
  );
};

export default Preview;
