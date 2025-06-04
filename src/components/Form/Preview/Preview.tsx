"use client";

import Image from "next/image";
import styles from "./Preview.module.scss";
import { Travel } from "@/types/travel";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  trip: Travel;
}

const Preview = ({ open, onClose, trip }: PreviewModalProps) => {
  if (!open) return null;

  return (
    <dialog open className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2>Trip Created!</h2>

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

        <a href="/trips" className={styles.goToTripsButton}>
          Go to My Trips
        </a>
      </div>
    </dialog>
  );
};

export default Preview;
