//hooks/usePreviewModal

import { useState, useCallback } from "react";
import { Travel } from "@/types/travel";

export const usePreviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<Travel | null>(null);

  const openModal = useCallback((trip: Travel) => {
    setActiveTrip(trip);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    activeTrip,
    openModal,
    closeModal,
  };
};
