import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Statistics",
  description:
    "See your personal travel statistics — total trips, visited countries, average ratings and budgets. Visualize your adventures with Travel Tracker.",
  openGraph: {
    title: "Travel Statistics — Travel Tracker",
    description:
      "Analyze your travel history: total trips, destinations, ratings and budgets — all beautifully visualized with Travel Tracker.",
    images: ["/og/meta.jpg"],
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
