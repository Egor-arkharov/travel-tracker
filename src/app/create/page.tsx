"use client";

import Hero from "@/components/Hero/Hero";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Form/Form"), { ssr: false });

const CreatePage = () => {
  return (
    <>
      <Hero
        title="Start a&nbsp;New Journey"
        subtitle="Fill in&nbsp;the details and add your next unforgettable trip"
				image={3}
        backgroundPosition="center 55%" 
      />
      <Form />
    </>
  );
}

export default CreatePage;