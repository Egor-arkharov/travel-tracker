// Мягче кривая
export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]; // можно ещё мягче: [0.2, 0.8, 0.2, 1]

// Тайминги — медленнее
export const timings = {
  decorDur: 1.0,     // было 0.7
  contentDur: 1.3,   // было 1.2
  contentDelay: 0.2 // было 0.5
};

// Вьюпорт можно сделать «позже», чтобы виднее было
export const viewport = { once: true, amount: 0.3 };

// Декор: сверху-слева/справа въезжает медленнее
export function decor(from: "tl" | "tr") {
  const initial =
    from === "tl"
      ? { x: -120, y: -120, opacity: 0 } // чуть больше дистанция
      : { x: 120, y: -120, opacity: 0 };

  return {
    initial,
    whileInView: { x: 0, y: 0, opacity: 0.2 },
    transition: { duration: timings.decorDur, ease }
  };
}

// Контент (текст/картинка): дольше и мягче
export function slide(dir: "left" | "right", delay = timings.contentDelay) {
  const initial = dir === "left" ? { x: -72, opacity: 0 } : { x: 72, opacity: 0 }; // было 60
  return {
    initial,
    whileInView: { x: 0, opacity: 1 },
    transition: { delay, duration: timings.contentDur, ease }
  };
}
