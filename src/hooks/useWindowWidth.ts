import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId: number | null = null;

    const handleResize = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(() => {
          setWidth(window.innerWidth);
          frameId = null;
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return width;
};
