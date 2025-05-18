// Travels/TravelModal/TravelModal.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./TravelModal.module.scss";
import { Travel } from "@/types/travel";
import TravelImage from "../TravelCard/TravelCardImage";
import TravelInfo from "../TravelCard/TravelCardInfo";
import { overlayVariants, modalContainerVariants, contentVariants } from "./animations";

interface TravelModalProps {
  travel: Travel;
  onClose: () => void;
  imageLayoutId: string;
}

const TravelModal = ({
  travel,
  onClose,
  imageLayoutId,
}: TravelModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
        onClick={onClose}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      />

      <motion.div
        className={styles.modal}
        variants={modalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.modalInner} data-mode="modal">
          <TravelImage
            travel={travel}
            layoutId={imageLayoutId}
          />
          <motion.div
            className={styles.modalInfo}
            variants={contentVariants}
          >
            <TravelInfo
              travel={travel}
              mode="modal"
            />
          </motion.div>
        </div>
        <motion.button
          className={styles.close}
          onClick={onClose}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          ✕
        </motion.button>
      </motion.div>
    </>
  );
};

export default TravelModal;