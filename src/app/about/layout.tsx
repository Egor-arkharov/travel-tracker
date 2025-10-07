// src/app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About This Project",
  description:
    "Learn about the story, challenges and technologies behind Travel Tracker — a personal project by Egor Arkharov.",
  openGraph: {
    title: "About This Project — Travel Tracker",
    description:
      "Discover the story, challenges and tech stack behind the Travel Tracker portfolio project.",
    images: ["/og/meta.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
