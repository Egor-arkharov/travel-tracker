import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Trips",
  description:
    "View, filter and manage all your saved trips. Edit details, delete old journeys or explore them on the map — all in one place.",
  openGraph: {
    title: "My Trips — Travel Tracker",
    description:
      "Browse all your journeys in Travel Tracker. Sort, filter and manage your travel memories with an adaptive grid and smooth animations.",
    images: ["/og/meta.jpg"],
  },
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
