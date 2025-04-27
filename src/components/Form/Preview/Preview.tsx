"use client";

import { TravelFormState } from "@/store/slices/travelFormSlice"; // Импортируешь правильный тип!
import styles from "./Preview.module.scss";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  trip: TravelFormState;
}

const Preview = ({ open, onClose, trip }: PreviewModalProps) => {
  if (!open) return null;

  return (
    <dialog open className={styles.successModal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2>Trip Created!</h2>

        <div className={styles.tripPreview}>
          <p><b>City:</b> {trip.city}</p>
          <p><b>Country:</b> {trip.country}</p>
          <p><b>Dates:</b> {trip.startDate} — {trip.endDate}</p>
          <p><b>Rating:</b> {trip.rating} ⭐</p>

          {trip.imageUrl && (
            <img src={trip.imageUrl} alt="Trip preview" width="100%" style={{ borderRadius: "8px", marginTop: "10px" }} />
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
