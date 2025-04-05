import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer"; 
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
    <html lang="en">
      <body>
        <div className="layout">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
