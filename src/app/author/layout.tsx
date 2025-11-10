import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Author",
  description:
    "Learn more about Egor Arkharov — frontend developer with 4+ years of experience building interactive, scalable and accessible web interfaces using React, Next.js, and Vue.",
  openGraph: {
    title: "About the Author — Travel Tracker",
    description:
      "Egor Arkharov is a frontend developer specializing in React, Next.js and Vue. Discover his background, previous projects and contact information.",
    images: ["/og/meta.jpg"],
  },
};

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return children;
}