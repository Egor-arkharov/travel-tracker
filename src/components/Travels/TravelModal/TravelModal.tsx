// Travels/TravelModal/TravelModal.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./TravelModal.module.scss";
import { Travel } from "@/types/travel";
import TravelImage from "../TravelCard/TravelCardImage";
import TravelInfo from "../TravelCard/TravelCardInfo";

interface TravelModalProps {
  travel: Travel;
  onClose: () => void;
  onDelete: () => void;
  imageLayoutId: string;
  cardLayoutId: string;
  isDeleting: boolean;
  deleteDurationMs?: number;
}

const TravelModal = ({
  travel,
  onClose,
  onDelete,
  isDeleting,
  imageLayoutId,
  cardLayoutId,
  deleteDurationMs
}: TravelModalProps) => {
  const deleteDurS = (deleteDurationMs ?? 600) / 1000;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.documentElement.style.overflowY = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.documentElement.style.overflowY = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isDeleting ? 0.7 : 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={isDeleting ? undefined : onClose}
      />
      <motion.article
        layoutId={cardLayoutId}
        className={styles.modal}
        transition={{ type: "spring", stiffness: 450, damping: 42 }}
      >
        <motion.div
          className={`${styles.modalInner} ${isDeleting ? styles.deleting : ""}`}
          initial={false}
          animate={
            isDeleting
              ? {
                  x: ["0%", "-6%", "6%", "-3%", "3%", "-120%"],
                  scale: [1, 1, 1, 1, 1, 0.97],
                }
              : { x: "0%", scale: 1 }
          }
          transition={
            isDeleting
              ? { duration: deleteDurS, ease: [0.36, 0, 0.66, -0.56] }
              : { type: "spring", stiffness: 400, damping: 35 }
          }
          style={{ willChange: "transform, opacity" }}
        >
          <TravelImage travel={travel} layoutId={imageLayoutId} priority />
          <motion.div
            className={styles.modalInfo}
            transition={{ duration: 0.18 }}
          >
            <TravelInfo travel={travel} mode="modal" onDelete={onDelete} />
          </motion.div>
        </motion.div>

        <motion.button
          className={styles.close}
          onClick={isDeleting ? undefined : onClose}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isDeleting ? 0 : 1, scale: isDeleting ? 0.9 : 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.12 }}
          aria-label="Close"
        >
          ✕
        </motion.button>
      </motion.article>
    </>
  );
};

export default TravelModal;
