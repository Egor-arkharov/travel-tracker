import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Trip",
  description:
    "Add your next journey — choose a city, set dates, rating, budget and upload a photo. Create and track your travels easily with Travel Tracker.",
  openGraph: {
    title: "Create a New Trip — Travel Tracker",
    description:
      "Start a new journey: pick a city, add your travel details and keep all your adventures organized in one place.",
    images: ["/og/meta.jpg"],
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
