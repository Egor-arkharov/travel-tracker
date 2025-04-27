"use client";

import Hero from "@/components/Hero/Hero";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Form/Form"), { ssr: false });

export default function Create() {
  return (
    <>
      <Hero
        title="Create trip"
        subtitle="Create your trip"
				image="/images/hero/hero-3.jpg"
        buttonText="Add a new trip"
        buttonHref="/create"
        backgroundPosition="center 100%" 
      />
      <DemoNotice />
      <Form />
    </>
  );
}
