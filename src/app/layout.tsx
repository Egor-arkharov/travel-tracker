import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import Main from "@/components/Layout/Main/Main";
import { nunito, readexPro } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Travel Tracker — Egor Arkharov",
    template: "%s | Travel Tracker",
  },
  description:
    "Create, explore and track your journeys with Travel Tracker — a personal travel diary built with Next.js and Firebase.",
  // metadataBase: new URL("https://travel-tracker.vercel.app")

  openGraph: {
    title: "Travel Tracker — Egor Arkharov",
    description:
      "Plan, record and explore your travels with a clean, modern interface.",
    // url: "https://travel-tracker.vercel.app",
    siteName: "Travel Tracker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/meta.jpg",
        width: 1200,
        height: 630,
        alt: "Travel Tracker preview",
      },
    ],
  },

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
  },

  manifest: "/favicon/site.webmanifest",
};


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${readexPro.variable}`}>
      <body>
        <RootProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
