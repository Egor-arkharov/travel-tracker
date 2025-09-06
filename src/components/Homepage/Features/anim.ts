export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const timings = {
  decorDur: 1.0,
  contentDur: 1.3,
  contentDelay: 0.2,
};

export const viewport = { once: true, amount: 0.3 };

export function decor(from: "tl" | "tr") {
  const initial =
    from === "tl"
      ? { x: -120, y: -120, opacity: 0 }
      : { x: 120, y: -120, opacity: 0 };

  return {
    initial,
    whileInView: { x: 0, y: 0, opacity: 0.2 },
    transition: { duration: timings.decorDur, ease },
  };
}

export function slide(dir: "left" | "right", delay = timings.contentDelay) {
  const initial =
    dir === "left" ? { x: -72, opacity: 0 } : { x: 72, opacity: 0 };
  return {
    initial,
    whileInView: { x: 0, opacity: 1 },
    transition: { delay, duration: timings.contentDur, ease },
  };
}
