import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { nunito, readexPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Tracker Egor",
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam iste ratione saepe alias provident ad?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${readexPro.variable}`}>
      <body>
        <RootProvider>
          <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </RootProvider>
      </body>
    </html>
  );
}

