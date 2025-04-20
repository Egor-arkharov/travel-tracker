"use client";

import Hero from "@/components/Hero/Hero";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Form/_Form"), { ssr: false });

export default function Create() {
  return (
    <>
      <Hero
        title="Create trip"
        subtitle="Create your trip"
        image="/images/hero-bg-2.jpg"
        variant="example"
        buttonText="Add a new trip"
        buttonHref="/create"
      />
      <Form />
    </>
  );
}
