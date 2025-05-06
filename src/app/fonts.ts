// app/fonts.ts
import { Nunito, Readex_Pro } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});