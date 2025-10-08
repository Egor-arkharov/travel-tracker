import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Trips",
  description:
    "Browse all your journeys in one place — filter, sort and switch between grid or list views. Discover how Travel Tracker organizes your adventures.",
  openGraph: {
    title: "Explore Trips — Travel Tracker",
    description:
      "View all trips created in Travel Tracker. Filter, sort and explore your journeys with an adaptive grid and smooth animations.",
    images: ["/og/meta.jpg"],
  },
};

export default function ExampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
