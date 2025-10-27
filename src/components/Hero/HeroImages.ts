// components/Hero/HeroImages.ts
import hero1 from "@/assets/hero/hero-1.jpg";
import hero1min from "@/assets/hero/hero-1-min.jpg";

import hero2 from "@/assets/hero/hero-2.jpg";
import hero2min from "@/assets/hero/hero-2-min.jpg";

import hero3 from "@/assets/hero/hero-3.jpg";
import hero3min from "@/assets/hero/hero-3-min.jpg";

import hero4 from "@/assets/hero/hero-4.jpg";
import hero4min from "@/assets/hero/hero-4-min.jpg";

import hero5 from "@/assets/hero/hero-4.jpg";
import hero5min from "@/assets/hero/hero-4-min.jpg";

export const heroImages = {
  1: { image: hero1, blur: hero1min },
  2: { image: hero2, blur: hero2min },
  3: { image: hero3, blur: hero3min },
  4: { image: hero4, blur: hero4min },
  5: { image: hero5, blur: hero5min },
} as const;

export type HeroImageKey = keyof typeof heroImages;
