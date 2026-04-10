"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./PrivacyBanner.module.scss";

const PrivacyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("travel-tracker-privacy-banner");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("travel-tracker-privacy-banner", "true");
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.wrapper}
            initial={{ x: 100, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className={styles.inner}>
              <button
                className={styles.closeBtn}
                onClick={handleDismiss}
                aria-label="Dismiss banner"
              >
                <IoCloseOutline />
              </button>
              <p className={styles.text}>
                We collect basic analytics to see how this site is used.
                Details in our{" "}
                <Link href="/privacy-policy" className={styles.link} onClick={handleDismiss}>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyBanner;
