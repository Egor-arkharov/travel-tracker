// Travels/TravelModal/animation.ts

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.6, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
  deleting: {
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut"},
  },
};

export const modalContainerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  deleting: {
    x: [0, -5, 5, -3, 3, -250],
    opacity: [1, 1, 1, 1, 1, 0],
    scale: [1, 1, 1, 1, 1, 0.95],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 30,
    scale: 0.97,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0, y: 30, transition: { duration: 0.2, ease: "easeIn", delay: 0.05 },
  },
  deleting: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};
