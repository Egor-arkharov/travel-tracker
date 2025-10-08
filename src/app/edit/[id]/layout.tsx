import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Trip",
  description:
    "Update your travel details — city, dates, rating, budget and photos. Make changes to your saved trips in Travel Tracker.",
  openGraph: {
    title: "Edit Trip — Travel Tracker",
    description:
      "Easily edit your journeys: adjust destinations, update travel dates, change ratings or budgets — all in one place.",
    images: ["/og/meta.jpg"],
  },
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
