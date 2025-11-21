import type { Metadata } from "next";
import Script from "next/script";

import { nunito, readexPro } from "./fonts";

import RootProvider from "@/providers/RootProvider";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import Main from "@/components/Layout/Main/Main";
import "./globals.scss";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const metadata: Metadata = {
  title: {
    default: "Travel Tracker — Egor Arkharov",
    template: "%s | Travel Tracker",
  },
  description:
    "Create, explore and track your journeys with Travel Tracker — a personal travel diary built with Next.js and Firebase.",
  metadataBase: new URL("https://ea-travel-tracker.vercel.app"),
  openGraph: {
    title: "Travel Tracker — Egor Arkharov",
    description:
      "Plan, record and explore your travels with a clean, modern interface.",
    url: "https://ea-travel-tracker.vercel.app",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${readexPro.variable}`}>
      <head>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <RootProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
