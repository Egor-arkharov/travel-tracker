import { Travel } from "@/types/travel";

export const getLocal = (): Travel[] => {
  const saved = localStorage.getItem("trips");
  if (!saved) return [];
  try {
    return JSON.parse(saved) as Travel[];
  } catch {
    console.warn("Ошибка чтения trips из localStorage");
    return [];
  }
};
