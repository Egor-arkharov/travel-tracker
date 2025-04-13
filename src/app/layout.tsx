import type { Metadata } from "next";
import Providers from "@/components/Providers/Providers";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
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
      {/* <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&loading=async&modules=places`}
          async
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head> */}
      <body>
        <Providers>
          <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
